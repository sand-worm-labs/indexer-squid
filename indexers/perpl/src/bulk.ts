import type {Store} from '@subsquid/typeorm-store'
import type {EntityManager} from 'typeorm'

// The store writes through TypeORM's query builder, which assembles every statement value by value in JavaScript: for
// ~8,000 order rows that was about half of the whole write, on the one core the processor has. bulkWrite() sends one
// statement per table instead, with one array parameter per column, so Node does almost no work.

const MAX_ROWS = 20_000 // rows per statement
const columnTypes = new Map<string, Map<string, string>>()

/**
 * The transaction's EntityManager, but only when it is safe to write around the store. For hot (unfinalized) blocks the
 * store carries a change tracker that records every write so a chain reorg can undo it; those writes must go through
 * the store. Returns undefined then, and also if the store's internals ever stop looking the way this expects.
 */
export function finalizedManager(store: Store): EntityManager | undefined {
    const s = store as unknown as {em?: unknown; changes?: unknown}
    if (typeof s.em !== 'function' || !('changes' in s) || s.changes != null) return undefined
    return (s.em as () => EntityManager)()
}

async function typesOf(em: EntityManager, table: string): Promise<Map<string, string>> {
    let types = columnTypes.get(table)
    if (!types) {
        const rows: {c: string; u: string}[] = await em.query(
            `select column_name c, udt_name u from information_schema.columns where table_schema = current_schema() and table_name = $1`,
            [table]
        )
        types = new Map(rows.map((r) => [r.c, r.u]))
        columnTypes.set(table, types)
    }
    return types
}

/**
 * Insert (or upsert on id) entities of one class in a single statement per MAX_ROWS. Same result as store.insert /
 * store.upsert for entities whose optional fields are null or undefined: both are written as NULL.
 */
export async function bulkWrite<E extends object>(
    em: EntityManager,
    entityClass: new (...args: any[]) => E,
    rows: E[],
    mode: 'insert' | 'upsert'
): Promise<void> {
    if (!rows.length) return
    const md = em.connection.getMetadata(entityClass)
    const types = await typesOf(em, md.tableName)
    const cols = md.columns
    const names = cols.map((c) => `"${c.databaseName}"`)
    const params = cols.map((c, i) => {
        const type = types.get(c.databaseName)
        if (!type || !/^[a-z0-9_]+$/.test(type)) throw new Error(`bulkWrite: no usable type for ${md.tableName}.${c.databaseName}`)
        return `$${i + 1}::${type}[]`
    })
    const onConflict =
        mode === 'upsert'
            ? ` ON CONFLICT ("id") DO UPDATE SET ${names.filter((n) => n !== '"id"').map((n) => `${n} = EXCLUDED.${n}`).join(', ')}`
            : ''
    const sql = `INSERT INTO "${md.tableName}" (${names.join(', ')}) SELECT * FROM unnest(${params.join(', ')})${onConflict}`
    const driver = em.connection.driver
    for (let i = 0; i < rows.length; i += MAX_ROWS) {
        const chunk = i === 0 && rows.length <= MAX_ROWS ? rows : rows.slice(i, i + MAX_ROWS)
        const arrays = cols.map((c) =>
            chunk.map((row) => {
                const v = driver.preparePersistentValue(c.getEntityValue(row, true), c)
                return v === undefined ? null : v
            })
        )
        await em.query(sql, arrays)
    }
}
