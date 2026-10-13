// The processor only needs two indexes on "order": the primary key (upserts) and the open-order lookup. The other four cost
// a write each on 26M+ rows. During backfill, replace them with one tiny partial index; restore them at the chain head.
//   node db/backfill-order-indexes.cjs drop      slim down (safe while the processor runs: every step is CONCURRENTLY)
//   node db/backfill-order-indexes.cjs restore   put the full set back for the API (takes a while on a big table)
require('dotenv').config()
const {Client} = require('pg')
const schema = process.env.DB_SCHEMA || 'perpl'
const mode = process.argv[2]
if (!['drop', 'restore'].includes(mode)) { console.error('usage: node db/backfill-order-indexes.cjs drop|restore'); process.exit(1) }

const OLD = [
  ['idx_order_order_id_364d1a73', '("order_id")'],
  ['idx_order_market_2bcf1d9f', '("market_id")'],
  ['idx_order_account_c4969a7b', '("account_id")'],
  ['idx_order_created_block_331960b7', '("created_block")'],
]
const OPEN = ['idx_order_open_lookup', `("market_id", "order_id", "created_block" DESC) WHERE "status" = 'OPEN'`]

const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
const run = async (label, sql) => { const t = Date.now(); await c.query(sql); console.log(`${label} (${((Date.now() - t) / 1000).toFixed(1)}s)`) }

;(async () => {
  await c.connect()
  await c.query(`set search_path = "${schema}"`)
  await c.query('set statement_timeout = 0')
  await c.query('set maintenance_work_mem = \'512MB\'')
  if (mode === 'drop') {
    await run(`create ${OPEN[0]}`, `create index concurrently if not exists "${OPEN[0]}" on "order" ${OPEN[1]}`)
    await run('analyze "order"', 'analyze "order"')
    for (const [name] of OLD) await run(`drop ${name}`, `drop index concurrently if exists "${name}"`)
  } else {
    for (const [name, cols] of OLD) await run(`create ${name}`, `create index concurrently if not exists "${name}" on "order" ${cols}`)
    await run('analyze "order"', 'analyze "order"')
  }
  console.log('done')
  await c.end()
})().catch((e) => { console.error(e.message); process.exit(1) })
