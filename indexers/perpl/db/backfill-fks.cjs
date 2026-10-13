// Every insert into order/trade/position/... runs one hidden internal query per foreign key to check the parent row.
// The processor writes parents first and never produces dangling references, so during backfill those checks are pure cost.
//   node db/backfill-fks.cjs drop              save every foreign key's definition, then drop it
//   node db/backfill-fks.cjs restore           re-add them as NOT VALID (instant; protects new rows from then on)
//   node db/backfill-fks.cjs restore --validate  also validate the old rows (scans the tables; allows reads and writes)
require('dotenv').config()
const {Client} = require('pg')
const schema = process.env.DB_SCHEMA || 'perpl'
const [mode, flag] = process.argv.slice(2)
if (!['drop', 'restore'].includes(mode)) { console.error('usage: node db/backfill-fks.cjs drop|restore [--validate]'); process.exit(1) }

const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
const SAVED = `"${schema}".zz_dropped_fks`

// DDL needs a brief exclusive lock; the processor holds row locks for a whole batch, so wait politely and retry.
async function ddl(sql) {
  for (let attempt = 1; ; attempt++) {
    try { await c.query(sql); return } catch (e) {
      if (e.code !== '55P03' || attempt >= 8) throw e // 55P03 = lock_timeout
      process.stdout.write(`  (waiting for a quiet moment, try ${attempt})\n`)
    }
  }
}

;(async () => {
  await c.connect()
  await c.query("set lock_timeout = '4s'")
  await c.query('set statement_timeout = 0')
  if (mode === 'drop') {
    await c.query(`create table if not exists ${SAVED} (conname text primary key, tbl text not null, def text not null)`)
    const {rows} = await c.query(`
      select c.conname, c.conrelid::regclass::text tbl, pg_get_constraintdef(c.oid) def
      from pg_constraint c join pg_namespace n on n.oid = c.connamespace
      where c.contype = 'f' and n.nspname = $1
        and c.conrelid::regclass::text !~ '(hot_|status|migrations)' -- leave the framework's own tables alone
      order by 2, 1`, [schema])
    for (const r of rows) {
      await c.query(`insert into ${SAVED} values ($1, $2, $3) on conflict (conname) do nothing`, [r.conname, r.tbl, r.def])
      await ddl(`alter table ${r.tbl} drop constraint "${r.conname}"`)
      console.log(`dropped ${r.tbl}.${r.conname}  ${r.def}`)
    }
    console.log(rows.length ? `done: ${rows.length} foreign keys saved in ${SAVED}` : 'nothing to drop')
  } else {
    const {rows} = await c.query(`select conname, tbl, def from ${SAVED} order by tbl, conname`).catch(() => ({rows: []}))
    if (!rows.length) { console.log('no saved foreign keys: nothing to restore'); return c.end() }
    for (const r of rows) {
      await ddl(`alter table ${r.tbl} add constraint "${r.conname}" ${r.def} not valid`)
      console.log(`re-added ${r.tbl}.${r.conname} (not valid yet)`)
    }
    if (flag === '--validate') {
      for (const r of rows) {
        const t = Date.now()
        await c.query(`alter table ${r.tbl} validate constraint "${r.conname}"`)
        console.log(`validated ${r.tbl}.${r.conname} (${((Date.now() - t) / 1000).toFixed(1)}s)`)
      }
    }
    await c.query(`drop table ${SAVED}`)
    console.log('done' + (flag === '--validate' ? '' : ' (run again later with --validate to check the old rows)'))
  }
  await c.end()
})().catch((e) => { console.error(e.message); process.exit(1) })
