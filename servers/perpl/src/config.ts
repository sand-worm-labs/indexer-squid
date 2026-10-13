import 'dotenv/config'

const schema = process.env.DB_SCHEMA ?? 'perpl'
// The schema name is interpolated into SQL, so only allow plain identifiers.
if (!/^[a-z_][a-z0-9_]*$/i.test(schema)) throw new Error(`invalid DB_SCHEMA: ${schema}`)

export const config = {
    port: Number(process.env.PORT ?? 4400),
    host: process.env.HOST ?? '0.0.0.0',
    corsOrigin: (process.env.CORS_ORIGIN ?? '*').split(',').map((s) => s.trim()),
    headPollMs: Number(process.env.HEAD_POLL_MS ?? 1000),
    schema,
    dbMaxConcurrent: Number(process.env.DB_MAX_CONCURRENT ?? 6), // queries in flight at once (pool size is 10)
    cnsDecimals: Number(process.env.CNS_DECIMALS ?? 6), // collateral token decimals (checked against fee/notional ratios)
    summaryMinMs: Number(process.env.SUMMARY_MIN_MS ?? 2000), // never recompute the summary more often than this
    db: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
}
