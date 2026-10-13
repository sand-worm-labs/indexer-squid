// Why is writing "order" rows slow? Times ~9,000 order-shaped rows through the same table in several variants, so the
// difference between them names the cost. Scratch tables are dropped; tests on the real table are rolled back.
//   node db/bench-order.cjs
require('dotenv').config()
const {Client} = require('pg')
const schema = process.env.DB_SCHEMA || 'perpl'
const N = 9000
const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
const rate = (ms) => `${Math.round(N / (ms / 1000)).toLocaleString().padStart(7)} rows/s  (${((ms / N) * 1000).toFixed(0)} µs/row)`
const time = async (fn) => { const t = Date.now(); await fn(); return Date.now() - t }
let tag = 0

;(async () => {
  await c.connect()
  await c.query(`set search_path = "${schema}"`)
  const cols = (await c.query(`select column_name from information_schema.columns where table_schema = $1 and table_name = 'order' order by ordinal_position`, [schema])).rows.map((r) => `"${r.column_name}"`)
  const list = cols.join(', ')
  const sel = (t) => cols.map((x) => (x === '"id"' ? `'zz${t}-' || o.id` : 'o.' + x)).join(', ')
  const upsert = `on conflict (id) do update set ${cols.filter((x) => x !== '"id"').map((x) => `${x} = excluded.${x}`).join(', ')}`
  const [{n: idx}] = (await c.query(`select count(*) n from pg_indexes where schemaname = $1 and tablename = 'order'`, [schema])).rows
  const [{n: fks}] = (await c.query(`select count(*) n from pg_constraint where conrelid = '"order"'::regclass and contype = 'f'`)).rows
  console.log(`real "order" table: ${idx} indexes, ${fks} foreign keys. Timing ${N} rows per variant (server-side INSERT ... SELECT).\n`)

  // Real table, inside a transaction that is rolled back.
  const real = async (label, setup, tail) => {
    const t = ++tag
    await c.query('begin')
    try {
      if (setup) await c.query(setup)
      const ms = await time(() => c.query(`insert into "order" (${list}) select ${sel(t)} from "order" o limit ${N} ${tail}`))
      console.log(`${label.padEnd(58)} ${rate(ms)}`)
    } finally { await c.query('rollback') }
  }
  await real('A. real table, plain insert', null, '')
  await real('B. real table, INSERT ... ON CONFLICT DO UPDATE (what we do)', null, upsert)
  await real('C. real table, plain insert, foreign-key checks off', 'set local session_replication_role = replica', '').catch((e) => console.log('C. skipped (needs superuser):', e.message))

  // Scratch copies of the same shape, to separate "wide rows" from "the real table's indexes".
  for (const [label, create] of [
    ['D. scratch copy, primary key only', `create table zz_o (like "order" including defaults); alter table zz_o add primary key (id)`],
    ['E. scratch copy, no key at all', `create table zz_o (like "order" including defaults)`],
  ]) {
    await c.query('drop table if exists zz_o')
    await c.query(create)
    const ms = await time(() => c.query(`insert into zz_o (${list}) select ${sel(++tag)} from "order" o limit ${N}`))
    console.log(`${label.padEnd(58)} ${rate(ms)}`)
    await c.query('drop table zz_o')
  }
  await c.end()
})().catch(async (e) => { console.error(e.message); try { await c.query('rollback'); await c.query(`drop table if exists "${schema}".zz_o`) } catch {} process.exit(1) })
