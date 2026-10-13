// Index several block ranges at once, each in its own process and its own schema.
//
//   node db/range.cjs plan <N>                 suggest how to split the remaining blocks across N processes
//   node db/range.cjs start <name> <from> [to]  new schema <main>_<name>, migrated, in backfill mode, pm2 app "<squid>-<name>"
//   node db/range.cjs end <name|main> <to>      make a running range (or the main squid) stop at block <to>
//   node db/range.cjs status                    progress, speed and time left for the main squid and every range
//   node db/range.cjs stop <name>               stop a range's process (its data stays)
//   node db/range.cjs drop <name>               stop it and delete its schema
//
// A range that starts mid-chain has no earlier state. Rows that come straight from events are still exact (trades, fees,
// position changes' after-values and PnL, liquidations, deposits/withdrawals, funding, balances). What depends on earlier
// state is rebuilt by the merge step afterwards (positions, "before" values). Orders left open across a range boundary
// lose their later fills/cancels: that is the known gap.
require('dotenv').config()
const fs = require('fs'), os = require('os'), path = require('path')
const {execFileSync} = require('child_process')
const {Client} = require('pg')

const DIR = path.join(__dirname, '..')
const MAIN = process.env.DB_SCHEMA || 'perpl'
const APP = path.basename(DIR) // pm2 name of the main processor
const REG = `"${MAIN}".zz_ranges`
const [cmd, ...args] = process.argv.slice(2)
const die = (m) => { console.error('error: ' + m); process.exit(1) }
const block = (v, what) => { const n = Number(v); if (v === undefined || !Number.isInteger(n) || n < 0) die(`${what} must be a block number`); return n }
const nameOk = (n) => { if (!/^[a-z0-9]{1,20}$/.test(n || '')) die('name: lowercase letters and digits only, e.g. r2'); return n }
const schemaOf = (n) => (n === 'main' ? MAIN : `${MAIN}_${n}`)
const appOf = (n) => (n === 'main' ? APP : `${APP}-${n}`)
const fmt = (n) => Number(n).toLocaleString('en-US')
const dur = (s) => (!isFinite(s) || s < 0 ? '?' : s < 3600 ? `${Math.round(s / 60)}m` : `${(s / 3600).toFixed(1)}h`)

async function connect() {
  const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
  await c.connect()
  await c.query(`create table if not exists ${REG} (name text primary key, from_block int not null, to_block int, created_at timestamptz default now())`)
  return c
}
const heightOf = async (c, schema) => { try { return Number((await c.query(`select height from "${schema}".status`)).rows[0]?.height ?? -1) } catch { return -1 } }
async function chainHead() {
  const url = (process.env.PORTAL_URL || 'https://portal.sqd.dev/datasets/monad-mainnet') + '/finalized-head'
  const r = await fetch(url, {headers: {'x-api-key': process.env.SQD_API_KEY || ''}})
  if (!r.ok) die(`could not read the chain head from the portal (HTTP ${r.status})`)
  return Number((await r.json()).number)
}

// Start (or restart) a processor under pm2. Exit code 0 means "range finished": pm2 must not restart it then.
function pm2Start(name, env) {
  for (const f of ['lib/main.js', 'lib/bulk.js']) if (!fs.existsSync(path.join(DIR, f))) die(`${f} is missing: run "npm run build" first`)
  const file = path.join(os.tmpdir(), `pm2-${appOf(name)}.json`)
  fs.writeFileSync(file, JSON.stringify({apps: [{name: appOf(name), cwd: DIR, script: 'lib/main.js', node_args: '--require=dotenv/config', stop_exit_codes: [0], env}]}))
  try { execFileSync('pm2', ['delete', appOf(name)], {stdio: 'ignore'}) } catch {}
  execFileSync('pm2', ['start', file], {stdio: 'ignore'})
  execFileSync('pm2', ['save'], {stdio: 'ignore'})
  console.log(`pm2: ${appOf(name)} started (logs: pm2 logs ${appOf(name)})`)
}
const pm2Stop = (name) => { try { execFileSync('pm2', ['delete', appOf(name)], {stdio: 'ignore'}); execFileSync('pm2', ['save'], {stdio: 'ignore'}) } catch {} }
const envFor = (schema, from, to) => ({DB_SCHEMA: schema, ...(from === undefined ? {} : {START_BLOCK: String(from)}), END_BLOCK: to == null ? '' : String(to)})

const commands = {
  async plan() {
    const n = Number(args[0]); if (!Number.isInteger(n) || n < 2) die('usage: plan <N>   (N = total processes, 2 or more)')
    const c = await connect(); const at = await heightOf(c, MAIN); const head = await chainHead(); await c.end()
    const per = Math.ceil((head - at) / n)
    console.log(`main squid is at block ${fmt(at)}, chain head ${fmt(head)}: ${fmt(head - at)} blocks left, ${fmt(per)} per process.\n`)
    console.log(`node db/range.cjs end main ${at + per}`)
    for (let i = 1; i < n; i++) {
      const from = at + per * i + 1, to = i === n - 1 ? '' : at + per * (i + 1)
      console.log(`node db/range.cjs start r${i + 1} ${from} ${to}`.trim())
    }
    console.log(`\nThe last one has no end: it follows the chain head. Check progress with: node db/range.cjs status`)
  },

  async start() {
    const name = nameOk(args[0]); if (name === 'main') die('"main" is the main squid: use "end main <to>"')
    const from = block(args[1], 'from'), to = args[2] === undefined ? null : block(args[2], 'to')
    if (to !== null && to < from) die('to is before from')
    const schema = schemaOf(name), c = await connect()
    const known = (await c.query(`select from_block, to_block from ${REG} where name = $1`, [name])).rows[0]
    if (known) {
      console.log(`range ${name} already exists (${fmt(known.from_block)} to ${known.to_block ? fmt(known.to_block) : 'head'}): restarting its process`)
      await c.end(); return pm2Start(name, envFor(schema, known.from_block, known.to_block))
    }
    await c.query(`create schema "${schema}"`)
    console.log(`schema ${schema}: applying migrations`)
    execFileSync('npx', ['squid-typeorm-migration', 'apply'], {cwd: DIR, env: {...process.env, DB_SCHEMA: schema}, stdio: 'ignore'})
    // Market config (names, decimals, fees) was set by events long before this range: carry it over.
    await c.query(`insert into "${schema}".market select * from "${MAIN}".market on conflict (id) do nothing`)
    // Backfill mode: no foreign keys, and only the indexes the processor itself needs.
    for (const r of (await c.query(`select c.conname, c.conrelid::regclass::text tbl from pg_constraint c join pg_namespace n on n.oid = c.connamespace
                                    where c.contype = 'f' and n.nspname = $1 and c.conrelid::regclass::text !~ '(hot_|status|migrations)'`, [schema])).rows) {
      await c.query(`alter table ${r.tbl} drop constraint "${r.conname}"`)
    }
    for (const r of (await c.query(`select indexname from pg_indexes where schemaname = $1 and tablename in ('trade','position_change','collateral_transfer','order')
                                    and indexname <> 'idx_order_open_lookup'
                                    and indexname not in (select c.conname from pg_constraint c join pg_namespace n on n.oid = c.connamespace where c.contype = 'p' and n.nspname = $1)`, [schema])).rows) {
      await c.query(`drop index "${schema}"."${r.indexname}"`)
    }
    await c.query(`insert into ${REG} (name, from_block, to_block) values ($1, $2, $3)`, [name, from, to])
    await c.end()
    console.log(`range ${name}: blocks ${fmt(from)} to ${to === null ? 'the chain head' : fmt(to)}`)
    pm2Start(name, envFor(schema, from, to))
  },

  async end() {
    const name = args[0] === 'main' ? 'main' : nameOk(args[0]), to = block(args[1], 'to')
    const c = await connect(), at = await heightOf(c, schemaOf(name))
    if (to < at) die(`${name} is already at block ${fmt(at)}, past ${fmt(to)}`)
    let from
    if (name !== 'main') {
      const r = (await c.query(`update ${REG} set to_block = $2 where name = $1 returning from_block`, [name, to])).rows[0]
      if (!r) die(`no range called ${name}`)
      from = r.from_block
    }
    await c.end()
    console.log(`${name}: will stop at block ${fmt(to)} (now at ${fmt(at)}, ${fmt(to - at)} to go)`)
    pm2Start(name, envFor(schemaOf(name), from, to))
  },

  async status() {
    const c = await connect()
    const rows = [{name: 'main', from_block: null, to_block: null}, ...(await c.query(`select name, from_block, to_block from ${REG} order by from_block`)).rows]
    const head = await chainHead()
    // main's end is where the first range begins
    const firstFrom = rows[1]?.from_block; if (firstFrom) rows[0].to_block = firstFrom - 1
    const sample = async () => Promise.all(rows.map((r) => heightOf(c, schemaOf(r.name))))
    const a = await sample(), t = Date.now(); await new Promise((r) => setTimeout(r, 10000)); const b = await sample(), secs = (Date.now() - t) / 1000
    await c.end()
    console.log(`chain head ${fmt(head)}\n`)
    console.log('range   from          to            at            left        blocks/s   time left')
    let worst = 0
    rows.forEach((r, i) => {
      const to = r.to_block ?? head, left = Math.max(0, to - b[i]), rate = (b[i] - a[i]) / secs, eta = left === 0 ? 0 : left / rate
      if (left > 0) worst = Math.max(worst, eta)
      console.log([r.name.padEnd(7), (r.from_block == null ? '-' : fmt(r.from_block)).padEnd(13), (r.to_block == null ? 'head' : fmt(r.to_block)).padEnd(13), fmt(b[i]).padEnd(13),
        fmt(left).padEnd(11), (left === 0 ? 'done' : rate.toFixed(0)).padEnd(10), left === 0 ? 'done' : dur(eta)].join(' '))
    })
    console.log(`\nall ranges done in about ${dur(worst)} (the slowest one)`)
  },

  async stop() { const name = nameOk(args[0]); pm2Stop(name); console.log(`${appOf(name)} stopped; its data is still in schema ${schemaOf(name)}`) },

  async drop() {
    const name = nameOk(args[0]); if (name === 'main') die('refusing to drop the main squid')
    pm2Stop(name)
    const c = await connect()
    await c.query(`drop schema if exists "${schemaOf(name)}" cascade`)
    await c.query(`delete from ${REG} where name = $1`, [name])
    await c.end(); console.log(`range ${name} dropped`)
  },
}

if (!commands[cmd]) { console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(2, 9).map((l) => l.replace(/^\/\/ ?/, '')).join('\n')); process.exit(cmd ? 1 : 0) }
commands[cmd]().catch((e) => die(e.message))
