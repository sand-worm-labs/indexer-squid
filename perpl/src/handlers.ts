import type {AbiEvent, EventParams} from '@subsquid/evm-abi'
import * as ev from './abi/Exchange/events'
import {
    Account,
    CollateralTransfer,
    Funding,
    Market,
    Order,
    OrderStatus,
    OrderType,
    Position,
    PositionChange,
    PositionChangeKind,
    PositionStatus,
    PositionType,
    Trade,
    TradeRole,
    TransferKind,
} from './model'
import {Meta, State, positionType} from './state'

type Log = {topics: string[]; data: string}
type Handler = (s: State, m: Meta, log: Log) => Promise<void>

const handlers = new Map<string, Handler>()

const events = new Map<string, {event: AbiEvent<any>; name: string}>()
const eventNames = new Map<string, string>(
    Object.entries(ev).flatMap(([name, e]) => ((e as any)?.topic ? [[(e as any).topic as string, name] as [string, string]] : []))
)
// Each log is decoded once; prefetch() and the handler share the result.
const decoded = new WeakMap<object, any>()
const decode = (event: AbiEvent<any>, log: Log) => {
    let e = decoded.get(log)
    if (!e) decoded.set(log, (e = event.decode(log)))
    return e
}

function on<E extends AbiEvent<any>>(event: E, fn: (s: State, m: Meta, e: EventParams<E>) => Promise<void> | void) {
    events.set(event.topic, {event, name: eventNames.get(event.topic) ?? ''})
    handlers.set(event.topic, async (s, m, log) => fn(s, m, decode(event, log) as EventParams<E>))
}

/** Ids of the markets, accounts and positions the logs will touch, so State.prefetch can load them in bulk. */
export function referenced(logs: Log[]) {
    const perps = new Set<string>()
    const accounts = new Set<string>()
    const positions = new Set<string>()
    for (const log of logs) {
        const known = events.get(log.topics[0])
        if (!known) continue
        const e = decode(known.event, log)
        const accountId = e.accountId ?? e.posAccountId
        if (e.perpId !== undefined) perps.add(String(e.perpId))
        if (accountId !== undefined) accounts.add(String(accountId))
        if (e.perpId !== undefined && accountId !== undefined && (known.name.startsWith('Position') || known.name === 'IncreasePositionCollateral')) {
            positions.add(`${e.perpId}-${accountId}`)
        }
    }
    return {perps: [...perps], accounts: [...accounts], positions: [...positions]}
}

export const topics = () => [...handlers.keys()]

export async function handle(s: State, m: Meta, log: Log) {
    await handlers.get(log.topics[0])?.(s, m, log)
}

const ORDER_TYPES = [OrderType.OPEN_LONG, OrderType.OPEN_SHORT, OrderType.CLOSE_LONG, OrderType.CLOSE_SHORT]
const tradeId = (m: Meta) => `${m.block}-${m.logIndex}`

// ---------------------------------------------------------------------------------------------
// Accounts and collateral
// ---------------------------------------------------------------------------------------------

on(ev.AccountCreated, async (s, m, e) => {
    const account = await s.account(e.id, m)
    account.address = e.account.toLowerCase()
    account.createdBlock = m.block
    account.createdAt = m.time
    s.touch(account, m)
})

on(ev.AccountFreeze, async (s, m, e) => {
    const account = await s.account(e.accountId, m)
    account.frozenStatus = e.status
    s.touch(account, m)
})

async function transfer(s: State, m: Meta, kind: TransferKind, accountId: bigint, amountCNS: bigint, balanceCNS: bigint) {
    const account = await s.account(accountId, m)
    account.balanceCNS = balanceCNS
    if (kind === TransferKind.DEPOSIT) account.totalDepositedCNS += amountCNS
    else account.totalWithdrawnCNS += amountCNS
    s.touch(account, m)
    s.insert(
        new CollateralTransfer({
            id: tradeId(m),
            account,
            kind,
            amountCNS,
            balanceCNS,
            block: m.block,
            blockTime: m.time,
            txHash: m.txHash,
        })
    )
}

on(ev.CollateralDeposit, (s, m, e) => transfer(s, m, TransferKind.DEPOSIT, e.accountId, e.amountCNS, e.balanceCNS))
on(ev.CollateralWithdrawal, (s, m, e) => transfer(s, m, TransferKind.WITHDRAWAL, e.accountId, e.amountCNS, e.balanceCNS))

// ---------------------------------------------------------------------------------------------
// Markets
// ---------------------------------------------------------------------------------------------

async function addMarket(s: State, m: Meta, e: EventParams<typeof ev.ContractAddedV2> | EventParams<typeof ev.ContractAdded>) {
    const market = await s.market(e.perpId, m)
    market.name = e.name
    market.symbol = e.symbol
    market.status = e.status
    market.paused = false
    market.removed = false
    market.basePricePNS = e.basePricePNS
    market.priceDecimals = Number(e.priceDecimals)
    market.lotDecimals = Number(e.lotDecimals)
    market.initMarginFracHdths = e.initMarginFracHdths
    market.maintMarginFracHdths = e.maintMarginFracHdths
    market.maxOpenInterestLNS = e.maxOpenInterestLNS
    market.createdBlock = m.block
    market.createdAt = m.time
    s.touch(market, m)
    return market
}

on(ev.ContractAdded, async (s, m, e) => {
    const market = await addMarket(s, m, e)
    market.takerFeePer100K = e.takerFeePer100K
    market.makerFeePer100K = e.makerFeePer100K
})

on(ev.ContractAddedV2, async (s, m, e) => {
    const market = await addMarket(s, m, e)
    market.feeScheduleId = e.perpFeeSchedId
})

async function updateMarket(s: State, m: Meta, perpId: bigint, apply: (market: Market) => void) {
    const market = await s.market(perpId, m)
    apply(market)
    s.touch(market, m)
}

on(ev.ContractPaused, (s, m, e) => updateMarket(s, m, e.perpId, (x) => void (x.paused = e.paused)))
on(ev.ContractRemoved, (s, m, e) => updateMarket(s, m, e.perpId, (x) => void (x.removed = true)))
on(ev.MarkUpdated, (s, m, e) => updateMarket(s, m, e.perpId, (x) => void (x.markPricePNS = e.pricePNS)))
on(ev.TakerFeeUpdated, (s, m, e) => updateMarket(s, m, e.perpId, (x) => void (x.takerFeePer100K = e.takerFeePer100K)))
on(ev.MakerFeeUpdated, (s, m, e) => updateMarket(s, m, e.perpId, (x) => void (x.makerFeePer100K = e.makerFeePer100K)))
on(ev.PerpFeeSchedIdSet, (s, m, e) => updateMarket(s, m, e.perpId, (x) => void (x.feeScheduleId = e.feeSchedId)))
on(ev.InitialMarginFractionUpdated, (s, m, e) =>
    updateMarket(s, m, e.perpId, (x) => void (x.initMarginFracHdths = e.initMarginFracHdths))
)
on(ev.MaintenanceMarginFractionUpdated, (s, m, e) =>
    updateMarket(s, m, e.perpId, (x) => void (x.maintMarginFracHdths = e.maintMarginFracHdths))
)
on(ev.MaxOpenInterestUpdated, (s, m, e) =>
    updateMarket(s, m, e.perpId, (x) => void (x.maxOpenInterestLNS = e.maxOpenInterestLNS))
)
on(ev.LinkPriceUpdated, (s, m, e) =>
    updateMarket(s, m, e.perpId, (x) => {
        x.oraclePricePNS = e.oraclePricePNS
        x.oracleTimestamp = e.timestamp
    })
)

on(ev.FundingEventCompleted, async (s, m, e) => {
    const market = await s.market(e.perpId, m)
    market.lastFundingRatePct100K = e.actualRatePct100k
    market.lastFundingBlock = Number(e.fundingEventBlock)
    s.touch(market, m)
    // allowOverwrite lets a later event replace an earlier one for the same funding block.
    const id = `${e.perpId}-${e.fundingEventBlock}`
    const funding = await s.funding(id, () => new Funding({id}))
    funding.market = market
    funding.fundingBlock = Number(e.fundingEventBlock)
    funding.specifiedRatePct100K = e.specifiedRatePct100k
    funding.actualRatePct100K = e.actualRatePct100k
    funding.fundingPricePNS = e.fundingPricePNS
    funding.fundingPaymentPNS = BigInt(e.fundingPaymentPNS)
    funding.fundingSumPNS = BigInt(e.fundingSumPNS)
    funding.block = m.block
    funding.blockTime = m.time
    funding.txHash = m.txHash
})

// ---------------------------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------------------------

function setOrderContext(s: State, m: Meta, e: EventParams<typeof ev.OrderRequestV2> | EventParams<typeof ev.OrderRequest>) {
    s.orderContext = {
        txHash: m.txHash,
        perpId: e.perpId,
        accountId: e.accountId,
        orderId: e.orderId,
        orderType: ORDER_TYPES[e.orderType],
        pricePNS: e.pricePNS,
        lotLNS: e.lotLNS,
        expiryBlock: e.expiryBlock,
        postOnly: e.postOnly,
        fillOrKill: e.fillOrKill,
        immediateOrCancel: e.immediateOrCancel,
        leverageHdths: e.leverageHdths,
    }
}

// The context is only valid inside the transaction that produced it.
const context = (s: State, m: Meta) => (s.orderContext?.txHash === m.txHash ? s.orderContext : undefined)

on(ev.OrderRequest, (s, m, e) => setOrderContext(s, m, e))
on(ev.OrderRequestV2, (s, m, e) => setOrderContext(s, m, e))
on(ev.OrderBatchCompleted, (s) => void (s.orderContext = undefined))

on(ev.OrderPlaced, async (s, m, e) => {
    const c = context(s, m)
    if (!c) return
    const [market, account] = [await s.market(c.perpId, m), await s.account(c.accountId, m)]
    s.addOpenOrder(
        new Order({
            id: tradeId(m),
            orderId: Number(e.orderId),
            market,
            account,
            orderType: c.orderType,
            status: OrderStatus.OPEN,
            pricePNS: c.pricePNS,
            requestedLotLNS: c.lotLNS,
            lotLNS: e.lotLNS,
            filledLotLNS: 0n,
            expiryBlock: c.expiryBlock,
            postOnly: c.postOnly,
            fillOrKill: c.fillOrKill,
            immediateOrCancel: c.immediateOrCancel,
            leverageHdths: c.leverageHdths,
            createdBlock: m.block,
            createdAt: m.time,
            updatedBlock: m.block,
            updatedAt: m.time,
            txHash: m.txHash,
        })
    )
    await s.setBalance(c.accountId, e.balanceCNS, m)
})

on(ev.OrderChanged, async (s, m, e) => {
    const c = context(s, m)
    if (!c) return
    const order = await s.openOrder(c.perpId, e.orderId)
    if (order) {
        order.pricePNS = e.pricePNS
        order.lotLNS = e.lotLNS
        order.expiryBlock = e.expiryBlock
        order.updatedBlock = m.block
        order.updatedAt = m.time
    }
    await s.setBalance(c.accountId, e.balanceCNS, m)
})

on(ev.OrderCancelled, async (s, m, e) => {
    const c = context(s, m)
    if (!c) return
    const order = await s.openOrder(c.perpId, c.orderId)
    if (order) s.closeOrder(order, OrderStatus.CANCELLED, m)
    await s.setBalance(c.accountId, e.balanceCNS, m)
})

async function clearOrder(s: State, m: Meta, perpId: bigint, orderId: bigint, reason: string) {
    const order = await s.openOrder(perpId, orderId)
    if (order) s.closeOrder(order, OrderStatus.CLEARED, m, reason)
}

on(ev.OrderCancelledByAdmin, (s, m, e) => clearOrder(s, m, e.perpId, e.orderId, 'CANCELLED_BY_ADMIN'))
on(ev.OrderCancelledByLiquidator, (s, m, e) => clearOrder(s, m, e.perpId, e.orderId, 'CANCELLED_BY_LIQUIDATOR'))
on(ev.ClearingExpiredOrder, (s, m, e) => clearOrder(s, m, e.perpId, e.orderId, 'EXPIRED'))
on(ev.ClearingFrozenAccountOrder, (s, m, e) => clearOrder(s, m, e.perpId, e.orderId, 'FROZEN_ACCOUNT'))
on(ev.ClearingInvalidCloseOrder, (s, m, e) => clearOrder(s, m, e.perpId, e.orderId, 'INVALID_CLOSE_ORDER'))
on(ev.ClearingSelfMatchingOrder, (s, m, e) => clearOrder(s, m, e.perpId, e.orderId, 'SELF_MATCH'))

// ---------------------------------------------------------------------------------------------
// Fills
// ---------------------------------------------------------------------------------------------

async function makerFill(
    s: State,
    m: Meta,
    e: EventParams<typeof ev.MakerOrderFilledV2> | EventParams<typeof ev.MakerOrderFilled>,
    builder?: {builderId: bigint; builderFeeCNS: bigint}
) {
    const order = await s.openOrder(e.perpId, e.orderId)
    if (order) {
        order.filledLotLNS += e.lotLNS
        order.lotLNS = order.lotLNS > e.lotLNS ? order.lotLNS - e.lotLNS : 0n
        order.updatedBlock = m.block
        order.updatedAt = m.time
        if (order.lotLNS === 0n) s.closeOrder(order, OrderStatus.FILLED, m)
    }
    s.insert(
        new Trade({
            id: tradeId(m),
            market: await s.market(e.perpId, m),
            account: await s.account(e.accountId, m),
            order,
            role: TradeRole.MAKER,
            pricePNS: e.pricePNS,
            lotLNS: e.lotLNS,
            feeCNS: e.feeCNS,
            amountCNS: e.amountCNS,
            balanceCNS: e.balanceCNS,
            builderId: builder?.builderId,
            builderFeeCNS: builder?.builderFeeCNS,
            block: m.block,
            blockTime: m.time,
            txHash: m.txHash,
        })
    )
    await s.setBalance(e.accountId, e.balanceCNS, m)
}

on(ev.MakerOrderFilled, (s, m, e) => makerFill(s, m, e))
on(ev.MakerOrderFilledV2, (s, m, e) => makerFill(s, m, e, e))

async function takerFill(
    s: State,
    m: Meta,
    e: EventParams<typeof ev.TakerOrderFilledV2> | EventParams<typeof ev.TakerOrderFilled>,
    builder?: {builderId: bigint; builderFeeCNS: bigint}
) {
    const c = context(s, m)
    if (!c) return
    s.insert(
        new Trade({
            id: tradeId(m),
            market: await s.market(c.perpId, m),
            account: await s.account(c.accountId, m),
            role: TradeRole.TAKER,
            pricePNS: e.entryPricePNS,
            lotLNS: e.lotLNS,
            feeCNS: e.feeCNS,
            amountCNS: e.amountCNS,
            balanceCNS: e.balanceCNS,
            builderId: builder?.builderId,
            builderFeeCNS: builder?.builderFeeCNS,
            block: m.block,
            blockTime: m.time,
            txHash: m.txHash,
        })
    )
    await s.setBalance(c.accountId, e.balanceCNS, m)
}

on(ev.TakerOrderFilled, (s, m, e) => takerFill(s, m, e))
on(ev.TakerOrderFilledV2, (s, m, e) => takerFill(s, m, e, e))

// ---------------------------------------------------------------------------------------------
// Positions
// ---------------------------------------------------------------------------------------------

interface Next {
    kind: PositionChangeKind
    positionType?: PositionType
    lotLNS: bigint
    depositCNS: bigint
    pricePNS?: bigint
    deltaPnlCNS?: bigint
    fundingCNS?: bigint
    leverageHdths?: bigint
    opened?: boolean // (re)opens the position, resetting its lifetime counters
}

/** Records a PositionChange and moves the position to its new state. */
function applyChange(s: State, m: Meta, pos: Position, next: Next) {
    const change = new PositionChange({
        id: tradeId(m),
        position: pos,
        market: pos.market,
        account: pos.account,
        kind: next.kind,
        positionType: next.positionType ?? pos.positionType,
        pricePNS: next.pricePNS,
        lotBeforeLNS: pos.lotLNS,
        lotAfterLNS: next.lotLNS,
        depositBeforeCNS: pos.depositCNS,
        depositAfterCNS: next.depositCNS,
        deltaPnlCNS: next.deltaPnlCNS,
        fundingCNS: next.fundingCNS,
        block: m.block,
        blockTime: m.time,
        txHash: m.txHash,
    })
    s.insert(change)

    if (next.opened) {
        pos.realizedPnlCNS = 0n
        pos.fundingCNS = 0n
        pos.openedBlock = m.block
        pos.openedAt = m.time
        pos.closedAt = undefined
    }
    if (next.positionType !== undefined) pos.positionType = next.positionType
    if (next.leverageHdths !== undefined) pos.leverageHdths = next.leverageHdths
    if (next.opened || (next.kind === PositionChangeKind.INVERTED && next.pricePNS !== undefined)) {
        pos.openPricePNS = next.pricePNS ?? pos.openPricePNS
    }
    pos.lotLNS = next.lotLNS
    pos.depositCNS = next.depositCNS
    pos.realizedPnlCNS += next.deltaPnlCNS ?? 0n
    pos.fundingCNS += next.fundingCNS ?? 0n
    pos.status = next.lotLNS === 0n ? PositionStatus.CLOSED : PositionStatus.OPEN
    if (pos.status === PositionStatus.CLOSED) pos.closedAt = m.time
    s.touch(pos, m)
}

const opened = async (
    s: State,
    m: Meta,
    e: EventParams<typeof ev.PositionOpenedV2> | EventParams<typeof ev.PositionOpened>
) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.OPENED,
        positionType: positionType(e.positionType),
        lotLNS: e.lotLNS,
        depositCNS: e.depositCNS,
        pricePNS: e.pricePNS,
        leverageHdths: e.leverageHdths,
        opened: true,
    })
}
on(ev.PositionOpened, opened)
on(ev.PositionOpenedV2, opened)

const increased = async (
    s: State,
    m: Meta,
    e: EventParams<typeof ev.PositionIncreasedV2> | EventParams<typeof ev.PositionIncreased>
) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.INCREASED,
        positionType: positionType(e.positionType),
        lotLNS: e.endLotLNS,
        depositCNS: e.endDepositCNS,
        pricePNS: e.pricePNS,
        leverageHdths: e.leverageHdths,
    })
}
on(ev.PositionIncreased, increased)
on(ev.PositionIncreasedV2, increased)

on(ev.PositionDecreased, async (s, m, e) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.DECREASED,
        positionType: positionType(e.positionType),
        lotLNS: e.endLotLNS,
        depositCNS: e.endDepositCNS,
        deltaPnlCNS: e.deltaPnlCNS,
        fundingCNS: e.fundingCNS,
    })
})

on(ev.PositionClosed, async (s, m, e) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.CLOSED,
        positionType: positionType(e.positionType),
        lotLNS: 0n,
        depositCNS: 0n,
        pricePNS: e.pricePNS,
        deltaPnlCNS: e.deltaPnlCNS,
        fundingCNS: e.fundingCNS,
    })
})

on(ev.PositionInverted, async (s, m, e) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.INVERTED,
        positionType: positionType(e.positionType),
        lotLNS: e.endLotLNS,
        depositCNS: e.endDepositCNS,
        pricePNS: e.pricePNS,
        deltaPnlCNS: e.deltaPnlCNS,
        fundingCNS: e.fundingCNS,
        leverageHdths: e.leverageHdths,
    })
})

on(ev.PositionLiquidated, async (s, m, e) => {
    const pos = await s.position(e.perpId, e.posAccountId, m)
    const remaining = e.posLotLNS > e.liqLotLNS ? e.posLotLNS - e.liqLotLNS : 0n
    applyChange(s, m, pos, {
        kind: PositionChangeKind.LIQUIDATED,
        positionType: positionType(e.positionType),
        lotLNS: remaining,
        depositCNS: remaining === 0n ? 0n : e.posDepositCNS,
        pricePNS: e.liqPricePNS,
        deltaPnlCNS: e.deltaPnlCNS,
        fundingCNS: e.fundingCNS,
    })
})

const deleveraged = async (
    s: State,
    m: Meta,
    e: EventParams<typeof ev.PositionDeleveragedV2> | EventParams<typeof ev.PositionDeleveraged>
) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.DELEVERAGED,
        positionType: positionType(e.positionType),
        lotLNS: e.endLotLNS,
        depositCNS: e.endDepositCNS,
        pricePNS: e.deleveragePricePNS,
        deltaPnlCNS: e.deltaPnlCNS,
        fundingCNS: e.fundingCNS,
    })
    await s.setBalance(e.accountId, e.balanceCNS, m)
}
on(ev.PositionDeleveraged, deleveraged)
on(ev.PositionDeleveragedV2, deleveraged)

const unwound = async (
    s: State,
    m: Meta,
    e: {perpId: bigint; accountId: bigint; positionType: number; pricePNS: bigint; balanceCNS?: bigint}
) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.UNWOUND,
        positionType: positionType(e.positionType),
        lotLNS: 0n,
        depositCNS: 0n,
        pricePNS: e.pricePNS,
    })
    if (e.balanceCNS !== undefined) await s.setBalance(e.accountId, e.balanceCNS, m)
}
on(ev.PositionUnwound, unwound)
on(ev.PositionUnwoundV2, unwound)
on(ev.PositionUnwoundWithoutPayment, unwound)
on(ev.PositionUnwoundWithoutPaymentV2, unwound)

on(ev.IncreasePositionCollateral, async (s, m, e) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.COLLATERAL_INCREASED,
        lotLNS: pos.lotLNS,
        depositCNS: e.positionDepositCNS,
    })
    await s.setBalance(e.accountId, e.balanceCNS, m)
})

on(ev.PositionCollateralDecreased, async (s, m, e) => {
    const pos = await s.position(e.perpId, e.accountId, m)
    applyChange(s, m, pos, {
        kind: PositionChangeKind.COLLATERAL_DECREASED,
        positionType: positionType(e.positionType),
        lotLNS: pos.lotLNS,
        depositCNS: e.endDepositCNS,
    })
    await s.setBalance(e.accountId, e.balanceCNS, m)
})
