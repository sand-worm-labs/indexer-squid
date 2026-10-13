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
    db: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
}
