// One command to put the database into backfill mode, then verify it. Safe to rerun; safe while the processor runs.
//   node db/backfill-prepare.cjs
// 1. drops the secondary indexes on trade / position_change / collateral_transfer (never read by the processor)
// 2. slims "order" to its primary key + the tiny open-order index
// 3. drops the foreign keys on our tables (definitions are saved for the restore)
// 4. prints what is left, so you can see it worked
require('dotenv').config()
const fs = require('fs'), path = require('path')
const {execFileSync} = require('child_process')
const {Client} = require('pg')
const schema = process.env.DB_SCHEMA || 'perpl'
const here = (f) => path.join(__dirname, f)
const run = (script, ...args) => { console.log(`\n== node db/${script} ${args.join(' ')}`); execFileSync('node', [here(script), ...args], {stdio: 'inherit'}) }

;(async () => {
  const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
  await c.connect()

  console.log('== dropping secondary indexes on trade / position_change / collateral_transfer')
  await c.query(fs.readFileSync(here('backfill-drop-indexes.sql'), 'utf8'))
  console.log('   done')
  await c.end()

  run('backfill-order-indexes.cjs', 'drop')
  run('backfill-fks.cjs', 'drop')

  const v = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
  await v.connect()
  console.log('\n== RESULT (what is left on each table)')
  const idx = await v.query(`select tablename t, count(*) n, string_agg(indexname, ', ' order by indexname) names from pg_indexes
                             where schemaname = $1 and tablename in ('order','trade','position_change','collateral_transfer') group by 1 order by 1`, [schema])
  const want = {order: 2, trade: 1, position_change: 1, collateral_transfer: 1} // primary key (+ the open-order index on order)
  let ok = true
  for (const r of idx.rows) {
    const good = Number(r.n) <= want[r.t]; ok = ok && good
    console.log(`  ${good ? 'OK ' : 'BAD'} ${r.t.padEnd(20)} ${r.n} index(es): ${r.names}`)
  }
  const fk = await v.query(`select count(*) n from pg_constraint c join pg_namespace n on n.oid = c.connamespace
                            where c.contype = 'f' and n.nspname = $1 and c.conrelid::regclass::text !~ '(hot_|status|migrations)'`, [schema])
  console.log(`  ${Number(fk.rows[0].n) === 0 ? 'OK ' : 'BAD'} foreign keys left: ${fk.rows[0].n}`)
  ok = ok && Number(fk.rows[0].n) === 0
  const bad = await v.query(`select c.relname from pg_index i join pg_class c on c.oid = i.indexrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = $1 and not i.indisvalid`, [schema])
  console.log(`  ${bad.rows.length ? 'BAD' : 'OK '} invalid indexes: ${bad.rows.map((r) => r.relname).join(', ') || 'none'}`)
  ok = ok && !bad.rows.length
  console.log(ok ? '\nBackfill mode is ON. Watch the next batches: flush should drop.' : '\nSomething did not apply: paste this whole output.')
  await v.end()
})().catch((e) => { console.error('\nFAILED:', e.message); process.exit(1) })
