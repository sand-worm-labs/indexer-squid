import pg from 'pg'
import {config} from './config.js'
import {Semaphore, SingleFlight} from './lock.js'

export const pool = new pg.Pool({
    ...config.db,
    max: 10,
    // Every query resolves unqualified table names inside the squid's schema; no writes are expected.
    options: `-c search_path=${config.schema} -c default_transaction_read_only=on -c statement_timeout=5000`,
})

// Every query goes through query(): identical queries running at the same time share one execution, a semaphore caps how
// many hit Postgres at once (below the pool size, so health checks still get a connection), and `cacheMs` can serve a
// recent result without asking again.
const gate = new Semaphore(config.dbMaxConcurrent)
const flights = new SingleFlight()
const recent = new Map<string, {at: number; rows: any[]}>()
const stats = {executed: 0, cached: 0}

export async function query<T = any>(sql: string, params: unknown[] = [], opts: {cacheMs?: number} = {}): Promise<T[]> {
    const key = sql + '\u0000' + JSON.stringify(params, (_k, v) => (typeof v === 'bigint' ? v.toString() : v))
    const hit = recent.get(key)
    if (hit && opts.cacheMs && Date.now() - hit.at < opts.cacheMs) {
        stats.cached++
        return hit.rows
    }
    return flights.do(key, () =>
        gate.run(async () => {
            stats.executed++
            const {rows} = await pool.query(sql, params as any[])
            if (opts.cacheMs) recent.set(key, {at: Date.now(), rows})
            return rows
        })
    )
}

export const queryStats = () => ({...stats, shared: flights.shared, peakConcurrent: gate.peak, max: config.dbMaxConcurrent})

let useStatus = true

/**
 * Latest block the indexer has processed. Prefers the squid's own `status` table; the read-only login usually can't see
 * internal tables, so it falls back to the newest block any market row was updated in (marks/funding update constantly).
 */
export async function indexedHead(): Promise<number | null> {
    if (useStatus) {
        try {
            const rows = await query(`select height from "${config.schema}".status limit 1`)
            return rows[0] ? Number(rows[0].height) : null
        } catch (e: any) {
            if (e?.code !== '42501') throw e // 42501 = permission denied
            useStatus = false
        }
    }
    const rows = await query(`select max(updated_block) as height from "${config.schema}".market`)
    return rows[0]?.height != null ? Number(rows[0].height) : null
}
