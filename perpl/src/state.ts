import {Store} from '@subsquid/typeorm-store'
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
    PositionStatus,
    PositionType,
    Trade,
} from './model'

// Where a log came from.
export interface Meta {
    block: number
    time: Date
    txHash: string
    logIndex: number
}

// The OrderRequest that started the current transaction. OrderPlaced, OrderChanged,
// OrderCancelled and TakerOrderFilled don't carry perpId/accountId themselves.
export interface OrderContext {
    txHash: string
    perpId: bigint
    accountId: bigint
    orderId: bigint
    orderType: OrderType
    pricePNS: bigint
    lotLNS: bigint
    expiryBlock: bigint
    postOnly: boolean
    fillOrKill: boolean
    immediateOrCancel: boolean
    leverageHdths: bigint
}

export const positionType = (n: number) => (n === 0 ? PositionType.LONG : PositionType.SHORT)

/**
 * Entities that outlive a batch. Only valid while every batch is final: a rollback on hot blocks
 * would leave it stale, so the caller must clear() it once the processor reaches the chain head.
 */
export class Cache {
    markets = new Map<string, Market>()
    accounts = new Map<string, Account>()
    positions = new Map<string, Position>()
    // Open order per `${perpId}-${orderId}`; null once known to be closed. Order ids are reused,
    // so the lookup is always "the OPEN order with this id".
    openOrders = new Map<string, Order | null>()

    get size() {
        return this.markets.size + this.accounts.size + this.positions.size + this.openOrders.size
    }

    clear() {
        this.markets.clear()
        this.accounts.clear()
        this.positions.clear()
        this.openOrders.clear()
    }
}

/**
 * Entity cache for one batch. Entities are loaded lazily, mutated by the handlers and written
 * back in one go by flush(). The State is created per batch; the Cache it reads through may be shared.
 */
export class State {
    orderContext?: OrderContext

    private markets: Map<string, Market>
    private accounts: Map<string, Account>
    private positions: Map<string, Position>
    private openOrders: Map<string, Order | null>
    private fundings = new Map<string, Funding>()
    private dirty = new Set<Market | Account | Position | Order | Funding>()
    private inserts: (Trade | PositionChange | CollateralTransfer)[] = []

    constructor(private store: Store, cache: Cache = new Cache()) {
        this.markets = cache.markets
        this.accounts = cache.accounts
        this.positions = cache.positions
        this.openOrders = cache.openOrders
    }

    async market(perpId: bigint, m: Meta): Promise<Market> {
        const id = perpId.toString()
        let market = this.markets.get(id) ?? (await this.store.get(Market, id))
        if (!market) {
            // Seen an event before ContractAdded (indexing started late): keep a placeholder.
            market = new Market({
                id,
                perpId: Number(perpId),
                name: `perp-${id}`,
                symbol: `perp-${id}`,
                status: 0,
                paused: false,
                removed: false,
                basePricePNS: 0n,
                priceDecimals: 0,
                lotDecimals: 0,
                initMarginFracHdths: 0n,
                maintMarginFracHdths: 0n,
                maxOpenInterestLNS: 0n,
                createdBlock: m.block,
                createdAt: m.time,
                updatedBlock: m.block,
                updatedAt: m.time,
            })
            this.dirty.add(market)
        }
        this.markets.set(id, market)
        return market
    }

    async account(accountId: bigint, m: Meta): Promise<Account> {
        const id = accountId.toString()
        let account = this.accounts.get(id) ?? (await this.store.get(Account, id))
        if (!account) {
            account = new Account({
                id,
                accountId,
                balanceCNS: 0n,
                totalDepositedCNS: 0n,
                totalWithdrawnCNS: 0n,
                frozenStatus: 0,
                createdBlock: m.block,
                createdAt: m.time,
                updatedBlock: m.block,
                updatedAt: m.time,
            })
            this.dirty.add(account)
        }
        this.accounts.set(id, account)
        return account
    }

    /** The position row for (market, account); created closed and empty if it doesn't exist yet. */
    async position(perpId: bigint, accountId: bigint, m: Meta): Promise<Position> {
        const id = `${perpId}-${accountId}`
        let position =
            this.positions.get(id) ??
            (await this.store.get(Position, {where: {id}, relations: {market: true, account: true}}))
        if (!position) {
            position = new Position({
                id,
                market: await this.market(perpId, m),
                account: await this.account(accountId, m),
                positionType: PositionType.LONG,
                status: PositionStatus.CLOSED,
                lotLNS: 0n,
                depositCNS: 0n,
                openPricePNS: 0n,
                realizedPnlCNS: 0n,
                fundingCNS: 0n,
                openedBlock: m.block,
                openedAt: m.time,
                updatedBlock: m.block,
                updatedAt: m.time,
            })
        }
        this.positions.set(id, position)
        this.dirty.add(position)
        return position
    }

    async openOrder(perpId: bigint, orderId: bigint): Promise<Order | undefined> {
        const key = `${perpId}-${orderId}`
        if (!this.openOrders.has(key)) {
            const order = await this.store.findOne(Order, {
                where: {market: {id: perpId.toString()}, orderId: Number(orderId), status: OrderStatus.OPEN},
                order: {createdBlock: 'DESC'},
                relations: {market: true, account: true},
            })
            this.openOrders.set(key, order ?? null)
        }
        const order = this.openOrders.get(key)
        if (order) this.dirty.add(order)
        return order ?? undefined
    }

    addOpenOrder(order: Order) {
        this.openOrders.set(`${order.market.id}-${order.orderId}`, order)
        this.dirty.add(order)
    }

    closeOrder(order: Order, status: OrderStatus, m: Meta, reason?: string) {
        order.status = status
        order.endReason = reason
        order.updatedBlock = m.block
        order.updatedAt = m.time
        this.openOrders.set(`${order.market.id}-${order.orderId}`, null)
        this.dirty.add(order)
    }

    async funding(id: string, build: () => Funding): Promise<Funding> {
        let funding = this.fundings.get(id) ?? (await this.store.get(Funding, id))
        funding = funding ?? build()
        this.fundings.set(id, funding)
        this.dirty.add(funding)
        return funding
    }

    touch(entity: Market | Account | Position, m: Meta) {
        entity.updatedBlock = m.block
        entity.updatedAt = m.time
        this.dirty.add(entity)
    }

    async setBalance(accountId: bigint, balanceCNS: bigint, m: Meta) {
        const account = await this.account(accountId, m)
        account.balanceCNS = balanceCNS
        this.touch(account, m)
    }

    insert(entity: Trade | PositionChange | CollateralTransfer) {
        this.inserts.push(entity)
    }

    async flush() {
        // Parents first, so foreign keys resolve.
        for (const cls of [Market, Account, Position, Order, Funding] as const) {
            const rows = [...this.dirty].filter((e) => e instanceof cls)
            if (rows.length) await this.store.upsert(rows as any[])
        }
        for (const cls of [Trade, PositionChange, CollateralTransfer] as const) {
            const rows = this.inserts.filter((e) => e instanceof cls)
            if (rows.length) await this.store.insert(rows as any[])
        }
    }
}
