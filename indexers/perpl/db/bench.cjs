// Is the database slow at writing, or is it our write path? Creates a scratch table in the squid's schema, times
// inserts shaped like a "trade" row, and drops the table. Touches no real data.
//   node db/bench.cjs
require('dotenv').config()
const {Client} = require('pg')
const schema = process.env.DB_SCHEMA || 'perpl'
const c = new Client({host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME})
const COLS = 15 // like trade: 1 text pk + 11 numeric/int + 3 text
const ddl = `create table "${schema}".zz_bench (id varchar primary key, a numeric, b numeric, c numeric, d numeric, e numeric, f numeric, g numeric, h numeric, i integer, j integer, k timestamptz, t1 text, t2 text, t3 text)`
const rate = (n, ms) => `${Math.round(n / (ms / 1000)).toLocaleString().padStart(8)} rows/s  (${(ms / n * 1000).toFixed(0)} µs/row)`
const time = async (fn) => { const t = Date.now(); await fn(); return Date.now() - t }

;(async () => {
  await c.connect()
  await c.query(`drop table if exists "${schema}".zz_bench`)
  await c.query(ddl)
  const N = 20000
  try {
    // 1. the machine itself: rows generated inside the server, no client, no parameters
    let ms = await time(() => c.query(`insert into "${schema}".zz_bench select 'a'||g, g, g, g, g, g, g, g, g, g, g, now(), 'x','y','z' from generate_series(1, ${N}) g`))
    console.log('1. server-side insert (no client):        ', rate(N, ms))

    // 2. like the processor: parameterised multi-row INSERT sent from Node, in one transaction
    for (const per of [200, 2000]) {
      const rows = Array.from({length: N}, (_, i) => [`b${per}-${i}`, ...Array(8).fill(String(1234567 + i)), i, i, new Date(), 'x', 'y', 'z'])
      ms = await time(async () => {
        await c.query('begin')
        for (let s = 0; s < N; s += per) {
          const chunk = rows.slice(s, s + per), params = []
          const values = chunk.map((r, ri) => { params.push(...r); return '(' + r.map((_, ci) => '$' + (ri * COLS + ci + 1)).join(',') + ')' })
          await c.query(`insert into "${schema}".zz_bench values ${values.join(',')}`, params)
        }
        await c.query('commit')
      })
      console.log(`2. client insert, ${String(per).padStart(4)} rows/statement:  `, rate(N, ms))
    }

    // 3. commit cost: how long does one tiny committed transaction take (fsync)?
    ms = await time(async () => { for (let i = 0; i < 20; i++) await c.query(`insert into "${schema}".zz_bench (id) values ('c${i}')`) })
    console.log(`3. one committed insert:                   ${(ms / 20).toFixed(1)} ms each (fsync cost; ~1 ms is good, 10+ is a slow disk)`)
  } finally {
    await c.query(`drop table if exists "${schema}".zz_bench`)
    await c.end()
  }
})().catch((e) => { console.error(e.message); process.exit(1) })
