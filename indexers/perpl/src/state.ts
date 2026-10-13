import {Store} from '@subsquid/typeorm-store'
import {In} from 'typeorm'
import {bulkWrite, finalizedManager} from './bulk'
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

let orphanTableReady = false

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

    /**
     * `bulk`: write the big tables around the store's query builder. Only for finalized blocks (see bulk.ts).
     * `rangeMode`: this processor started mid-chain with no earlier state (db/range.cjs). It then records what it cannot
     * resolve itself, so the merge step can: an account whose balance no event has set yet is -1 ("unknown", not zero),
     * and events for orders it has never seen go to zz_orphan_order_event instead of being dropped.
     * `skipOrders`: do not track orders at all (no order rows, no lookups). Trades, positions and balances are unaffected;
     * trades just carry no order link. For quick partial datasets where the order table is not needed.
     */
    constructor(private store: Store, cache: Cache = new Cache(), private bulk = false, private rangeMode = false, private skipOrders = false) {
        this.markets = cache.markets
        this.accounts = cache.accounts
        this.positions = cache.positions
        this.openOrders = cache.openOrders
    }

    /** Loads, in one query per type, the entities a batch is going to need that aren't cached yet. */
    async prefetch(ids: {perps: string[]; accounts: string[]; positions: string[]; orders: Map<string, Set<number>>}) {
        // Sequential: all of a batch's queries share one connection.
        const markets = await this.store.find(Market, {where: {id: In(ids.perps.filter((id) => !this.markets.has(id)))}})
        const accounts = await this.store.find(Account, {where: {id: In(ids.accounts.filter((id) => !this.accounts.has(id)))}})
        const positions = await this.store.find(Position, {
            where: {id: In(ids.positions.filter((id) => !this.positions.has(id)))},
            relations: {market: true, account: true},
        })
        for (const x of markets) this.markets.set(x.id, x)
        for (const x of accounts) this.accounts.set(x.id, x)
        for (const x of positions) this.positions.set(x.id, x)

        // Open orders: one query per market, served by the partial index on (market_id, order_id) WHERE status = 'OPEN'.
        for (const [perpId, orderIds] of this.skipOrders ? [] : ids.orders) {
            // order_id is an int4 column; larger ids (client-generated ones in OrderRequest) can't be stored, so skip them.
            const wanted = [...orderIds].filter((id) => id <= 2147483647 && !this.openOrders.has(`${perpId}-${id}`))
            if (!wanted.length) continue
            const open = await this.store.find(Order, {
                where: {market: {id: perpId}, orderId: In(wanted), status: OrderStatus.OPEN},
                relations: {market: true, account: true},
            })
            const found = new Map<number, Order>()
            for (const o of open) {
                const prev = found.get(o.orderId)
                if (!prev || o.createdBlock > prev.createdBlock) found.set(o.orderId, o)
            }
            for (const id of wanted) this.openOrders.set(`${perpId}-${id}`, found.get(id) ?? null)
        }
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
                balanceCNS: this.rangeMode ? -1n : 0n,
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
        if (this.skipOrders) return undefined
        if (orderId > 2147483647n) return undefined // can't match the int4 order_id column
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

    // Orders created in this batch (a plain insert); every other dirty order is an update of a row loaded from the DB.
    private freshOrders = new Set<Order>()

    addOpenOrder(order: Order) {
        if (this.skipOrders) return
        this.freshOrders.add(order)
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

    private orphans: {kind: string; perpId: bigint; orderId: bigint; m: Meta; lot?: bigint; price?: bigint; expiry?: bigint; reason?: string}[] = []

    /** An event for an order this processor has no open row for. Only kept in range mode; ids beyond int4 never match. */
    orphan(kind: 'CHANGE' | 'CANCEL' | 'CLEAR' | 'FILL', perpId: bigint, orderId: bigint, m: Meta, data: {lot?: bigint; price?: bigint; expiry?: bigint; reason?: string} = {}) {
        if (!this.rangeMode || this.skipOrders || orderId > 2147483647n) return
        this.orphans.push({kind, perpId, orderId, m, ...data})
    }

    insert(entity: Trade | PositionChange | CollateralTransfer) {
        this.inserts.push(entity)
    }

    /** Rows written and ms spent per table by the last flush(), for the batch log line. */
    flushStats = ''

    async flush() {
        const parts: string[] = []
        const timed = async (name: string, rows: unknown[], write: () => Promise<unknown>) => {
            if (!rows.length) return
            const t = Date.now()
            await write()
            parts.push(`${name} ${rows.length}r/${Date.now() - t}ms`)
        }
        // Finalized blocks only, and only if the store really has no change tracker; otherwise undefined -> normal path.
        const finalized = finalizedManager(this.store)
        const em = this.bulk ? finalized : undefined
        // Parents first, so foreign keys resolve.
        for (const cls of [Market, Account, Position, Order, Funding] as const) {
            const rows = [...this.dirty].filter((e) => e instanceof cls)
            const label = cls.name.toLowerCase() + (cls === Order ? ` (${rows.filter((r) => this.freshOrders.has(r as Order)).length} new)` : '')
            // Only Order goes the bulk way: the other four are a few hundred rows and keep the store's exact semantics.
            await timed(label, rows, () => (em && cls === Order ? bulkWrite(em, Order, rows as Order[], 'upsert') : this.store.upsert(rows as any[])))
        }
        for (const cls of [Trade, PositionChange, CollateralTransfer] as const) {
            const rows = this.inserts.filter((e) => e instanceof cls)
            await timed(cls.name.toLowerCase(), rows, () => (em ? bulkWrite(em, cls as any, rows, 'insert') : this.store.insert(rows as any[])))
        }
        if (this.orphans.length) {
            // Range mode only ever runs on finalized blocks; if this is somehow a hot block, there is nowhere safe to put them.
            const o = this.orphans
            await timed(finalized ? 'orphans' : 'orphans DROPPED', o, async () => {
                if (!finalized) return
                if (!orphanTableReady) {
                    await finalized.query(
                        `create table if not exists zz_orphan_order_event (block int4 not null, log_index int4 not null, block_time timestamptz not null, ` +
                            `kind text not null, perp_id text not null, order_id int4 not null, lot numeric, price numeric, expiry numeric, reason text, ` +
                            `primary key (block, log_index))`
                    )
                    orphanTableReady = true
                }
                const col = <T>(f: (x: (typeof o)[number]) => T) => o.map((x) => f(x) ?? null)
                await finalized.query(
                    `insert into zz_orphan_order_event select * from unnest($1::int4[], $2::int4[], $3::timestamptz[], $4::text[], $5::text[], $6::int4[], ` +
                        `$7::numeric[], $8::numeric[], $9::numeric[], $10::text[]) on conflict do nothing`,
                    [col((x) => x.m.block), col((x) => x.m.logIndex), col((x) => x.m.time), col((x) => x.kind), col((x) => x.perpId.toString()),
                     col((x) => Number(x.orderId)), col((x) => x.lot?.toString()), col((x) => x.price?.toString()), col((x) => x.expiry?.toString()), col((x) => x.reason)]
                )
            })
        }
        if (em) parts.unshift('bulk')
        this.flushStats = parts.join(', ')
    }
}
