// Where does the database spend its time while the processor runs? Read-only; safe to run against the live DB.
//   cd indexers/perpl && node db/diagnose.cjs
require('dotenv').config()
const {Client} = require('pg')
const schema = process.env.DB_SCHEMA || 'perpl'
const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
const q = async (sql, p) => (await c.query(sql, p)).rows
const mb = (n) => (Number(n) / 1048576).toFixed(0) + ' MB'

;(async () => {
  await c.connect()

  // 1. network round trip: matters if the DB is not on this machine
  const t0 = process.hrtime.bigint()
  for (let i = 0; i < 20; i++) await c.query('select 1')
  console.log(`\n[1] round trip to the database: ${(Number(process.hrtime.bigint() - t0) / 20e6).toFixed(1)} ms per query`)

  // 2. tables: size, indexes, dead rows, HOT updates
  console.log('\n[2] tables (size / of which indexes / rows / dead rows / HOT-update share / last autovacuum)')
  for (const r of await q(`
    select s.relname, pg_total_relation_size(s.relid) total, pg_indexes_size(s.relid) idx, s.n_live_tup live, s.n_dead_tup dead,
           s.n_tup_upd upd, s.n_tup_hot_upd hot, s.last_autovacuum av
    from pg_stat_user_tables s where s.schemaname = $1 order by total desc`, [schema])) {
    const hot = Number(r.upd) ? ((Number(r.hot) / Number(r.upd)) * 100).toFixed(0) + '% HOT' : '-'
    console.log(`  ${r.relname.padEnd(20)} ${mb(r.total).padStart(9)} / ${mb(r.idx).padStart(9)}  rows ${String(r.live).padStart(10)}  dead ${String(r.dead).padStart(9)}  ${hot.padStart(8)}  av ${r.av ? new Date(r.av).toISOString().slice(0, 16) : 'never'}`)
  }

  // 3. indexes still present on the append-only tables (should be few during backfill)
  console.log('\n[3] indexes on trade / position_change / collateral_transfer / order / position / account')
  for (const r of await q(`
    select tablename, indexname, pg_relation_size(format('%I.%I', schemaname, indexname)::regclass) size
    from pg_indexes where schemaname = $1 and tablename in ('trade','position_change','collateral_transfer','order','position','account')
    order by tablename, size desc`, [schema])) console.log(`  ${r.tablename.padEnd(20)} ${r.indexname.padEnd(46)} ${mb(r.size)}`)

  // 4. settings that govern write speed
  console.log('\n[4] settings')
  for (const r of await q(`select name, setting, unit from pg_settings where name in ('synchronous_commit','shared_buffers','max_wal_size','checkpoint_timeout','wal_compression','fsync','full_page_writes','work_mem','max_connections')`)) console.log(`  ${r.name.padEnd(22)} ${r.setting}${r.unit || ''}`)
  try {
    const [b] = await q('select checkpoints_timed t, checkpoints_req r from pg_stat_bgwriter')
    console.log(`  checkpoints: ${b.t} timed, ${b.r} forced by WAL size (a high forced count means max_wal_size is too small)`)
  } catch { try { const [b] = await q('select num_timed t, num_requested r from pg_stat_checkpointer'); console.log(`  checkpoints: ${b.t} timed, ${b.r} requested`) } catch {} }

  // 5. what is the database doing right now? sample for ~10s
  console.log('\n[5] sampling what the other connections are waiting on (10 s)')
  const seen = new Map()
  for (let i = 0; i < 50; i++) {
    for (const r of await q(`select coalesce(wait_event_type,'CPU/none') w, coalesce(wait_event,'-') e, left(regexp_replace(query, '\\s+', ' ', 'g'), 70) qy
                             from pg_stat_activity where state = 'active' and pid <> pg_backend_pid() and datname = current_database()`)) {
      const k = `${r.w}/${r.e}  ${r.qy}`; seen.set(k, (seen.get(k) || 0) + 1)
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  for (const [k, n] of [...seen].sort((a, b) => b[1] - a[1]).slice(0, 12)) console.log(`  ${String(n).padStart(3)}x  ${k}`)
  if (!seen.size) console.log('  (nothing active: the processor is not writing, or the DB is idle between batches)')
  await c.end()
})().catch((e) => { console.error(e.message); process.exit(1) })
