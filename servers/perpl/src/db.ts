import pg from 'pg'
import {config} from './config.js'

export const pool = new pg.Pool({
    ...config.db,
    max: 10,
    // Every query resolves unqualified table names inside the squid's schema; no writes are expected.
    options: `-c search_path=${config.schema} -c default_transaction_read_only=on -c statement_timeout=5000`,
})

let useStatus = true

/**
 * Latest block the indexer has processed. Prefers the squid's own `status` table; the read-only login usually can't see
 * internal tables, so it falls back to the newest block any market row was updated in (marks/funding update constantly).
 */
export async function indexedHead(): Promise<number | null> {
    if (useStatus) {
        try {
            const {rows} = await pool.query(`select height from "${config.schema}".status limit 1`)
            return rows[0] ? Number(rows[0].height) : null
        } catch (e: any) {
            if (e?.code !== '42501') throw e // 42501 = permission denied
            useStatus = false
        }
    }
    const {rows} = await pool.query(`select max(updated_block) as height from "${config.schema}".market`)
    return rows[0]?.height != null ? Number(rows[0].height) : null
}
