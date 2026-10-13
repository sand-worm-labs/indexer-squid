import {query} from '../db.js'
import {config} from '../config.js'
import {Mutex} from '../lock.js'

export interface Summary {
    type: 'summary'
    volume24h: number
    volume7d: number
    volume30d: number
    volume24hPrev: number // the 24h before that, for the change %
    fees24h: number
    trades24h: number
    activeUsers24h: number
    openInterest: number // one side: total long notional (= total short notional when the book is balanced)
    longOpenInterest: number
    shortOpenInterest: number
    markets: number
    asOf: string // time of the newest indexed data; all windows end here
    block: number | null
    at: number // server time, ms
    prev: Pick<Summary, 'volume24h' | 'volume7d' | 'volume30d' | 'fees24h' | 'trades24h' | 'activeUsers24h' | 'openInterest'> | null
}

const BUCKET = 60 // seconds per bucket: windows are exact to a minute (at most ~45k buckets in memory)
const KEEP = 31 * 86400 // seconds of history held in memory
const SETTLE_LAG = 50 // blocks re-read on every tick before they are merged for good (reorg safety)
const CNS = `power(10::numeric, ${config.cnsDecimals})`
// price = PNS / 10^priceDecimals, lots = LNS / 10^lotDecimals, notional = price * lots (collateral/USD).
const NOTIONAL = `((t.price_pns / power(10::numeric, m.price_decimals)) * (t.lot_lns / power(10::numeric, m.lot_decimals)))`

interface Bucket {
    vol: number
    fees: number
    trades: number
}

const num = (v: unknown) => (v == null ? 0 : Number(v))
const merge = (into: Map<number, Bucket>, b: number, x: Bucket) => {
    const cur = into.get(b)
    if (cur) {
        cur.vol += x.vol
        cur.fees += x.fees
        cur.trades += x.trades
    } else into.set(b, x)
}

/**
 * Incremental headline numbers. Everything old lives in 5-minute buckets in memory; each tick reads only the trades that
 * arrived since the last tick. Volume counts the TAKER side of each fill only (each fill is stored once per side, taker and
 * maker notionals match, so summing both would double it). Windows end at the newest indexed data, not at now().
 */
export class SummaryAggregator {
    private buckets = new Map<number, Bucket>() // settled history, keyed by floor(epoch / BUCKET)
    private lastSeen = new Map<string, number>() // account -> epoch of its last settled trade (24h+)
    private settled: number | null = null // every trade with block <= settled is in `buckets`
    private last: Summary | null = null
    private lock = new Mutex()

    /** Recompute for the given indexed head. Cost: two small delta queries plus a sum over the buckets. */
    update(head: number): Promise<Summary> {
        // One update at a time: a second caller waits for the first instead of racing it over the same state.
        return this.lock.run(async () => {
            if (this.settled === null || head < this.settled) await this.init(head)
            else await this.settle(head)
            return this.build(head)
        })
    }

    private async anchor(): Promise<number> {
        const rows = await query(`select extract(epoch from coalesce(max(updated_at), now())) a from market`)
        return Number(rows[0].a)
    }

    private async bucketRows(where: string, params: unknown[]) {
        const rows = await query(
            `select floor(extract(epoch from t.block_time) / ${BUCKET})::bigint b,
                    coalesce(sum(case when t.role = 'TAKER' then ${NOTIONAL} end), 0) vol,
                    coalesce(sum(t.fee_cns), 0) / ${CNS} fees,
                    count(*) filter (where t.role = 'TAKER') trades
             from trade t join market m on m.id = t.market_id
             where ${where} group by 1`,
            params
        )
        return rows.map((r) => ({b: Number(r.b), x: {vol: num(r.vol), fees: num(r.fees), trades: num(r.trades)}}))
    }

    private async accountRows(where: string, params: unknown[]) {
        const rows = await query(
            `select t.account_id a, max(extract(epoch from t.block_time)) e from trade t where ${where} group by 1`,
            params
        )
        return rows.map((r) => [String(r.a), Number(r.e)] as const)
    }

    /** Load the last 31 days once (one grouped query), then everything else is incremental. */
    private async init(head: number) {
        const to = head - SETTLE_LAG
        const a = await this.anchor()
        this.buckets.clear()
        this.lastSeen.clear()
        for (const {b, x} of await this.bucketRows(`t.block_time > to_timestamp($1) and t.block <= $2`, [a - KEEP, to])) {
            merge(this.buckets, b, x)
        }
        for (const [acc, e] of await this.accountRows(`t.block_time > to_timestamp($1) and t.block <= $2`, [a - 25 * 3600, to])) {
            this.lastSeen.set(acc, e)
        }
        this.settled = to
    }

    /** Merge trades that just became old enough to be final. */
    private async settle(head: number) {
        const to = head - SETTLE_LAG
        if (to <= this.settled!) return
        for (const {b, x} of await this.bucketRows(`t.block > $1 and t.block <= $2`, [this.settled, to])) merge(this.buckets, b, x)
        for (const [acc, e] of await this.accountRows(`t.block > $1 and t.block <= $2`, [this.settled, to])) {
            this.lastSeen.set(acc, Math.max(e, this.lastSeen.get(acc) ?? 0))
        }
        this.settled = to
        const a = await this.anchor()
        for (const b of this.buckets.keys()) if (b * BUCKET < a - KEEP) this.buckets.delete(b)
        for (const [acc, e] of this.lastSeen) if (e < a - 25 * 3600) this.lastSeen.delete(acc)
    }

    private async build(head: number): Promise<Summary> {
        const a = await this.anchor()
        // Unsettled tail: re-read fresh each tick, so a rollback near the head can't leave stale numbers.
        const tail = new Map<number, Bucket>()
        for (const {b, x} of await this.bucketRows(`t.block > $1`, [this.settled])) merge(tail, b, x)
        const tailAccounts = await this.accountRows(`t.block > $1`, [this.settled])

        const sum = (from: number, to: number) => {
            const r = {vol: 0, fees: 0, trades: 0}
            for (const m of [this.buckets, tail]) {
                for (const [b, x] of m) {
                    const start = b * BUCKET
                    if (start > a - from && start <= a - to) {
                        r.vol += x.vol
                        r.fees += x.fees
                        r.trades += x.trades
                    }
                }
            }
            return r
        }
        const d1 = sum(86400, 0), d2 = sum(2 * 86400, 86400), d7 = sum(7 * 86400, 0), d30 = sum(30 * 86400, 0)

        const users = new Set<string>()
        for (const [acc, e] of this.lastSeen) if (e > a - 86400) users.add(acc)
        for (const [acc, e] of tailAccounts) if (e > a - 86400) users.add(acc)

        const [oi, mk] = await Promise.all([
            query(`
                select sum(n) filter (where position_type = 'LONG') long_oi, sum(n) filter (where position_type = 'SHORT') short_oi
                from (select p.position_type,
                             (p.lot_lns / power(10::numeric, m.lot_decimals)) *
                             (coalesce(m.mark_price_pns, m.oracle_price_pns, m.base_price_pns) / power(10::numeric, m.price_decimals)) n
                      from "position" p join market m on m.id = p.market_id
                      where p.status = 'OPEN') x`),
            query(`select count(*) n from market where not removed`),
        ])
        const o = oi[0]
        const s: Summary = {
            type: 'summary',
            volume24h: d1.vol,
            volume7d: d7.vol,
            volume30d: d30.vol,
            volume24hPrev: d2.vol,
            fees24h: d1.fees,
            trades24h: d1.trades,
            activeUsers24h: users.size,
            openInterest: num(o.long_oi),
            longOpenInterest: num(o.long_oi),
            shortOpenInterest: num(o.short_oi),
            markets: num(mk[0].n),
            asOf: new Date(a * 1000).toISOString(),
            block: head,
            at: Date.now(),
            prev: this.last && {
                volume24h: this.last.volume24h, volume7d: this.last.volume7d, volume30d: this.last.volume30d,
                fees24h: this.last.fees24h, trades24h: this.last.trades24h, activeUsers24h: this.last.activeUsers24h,
                openInterest: this.last.openInterest,
            },
        }
        this.last = s
        return s
    }
}

export const aggregator = new SummaryAggregator()
