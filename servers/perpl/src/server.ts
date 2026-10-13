import Fastify from 'fastify'
import cors from '@fastify/cors'
import websocket from '@fastify/websocket'
import {config} from './config.js'
import {pool} from './db.js'
import {hub} from './hub.js'
import health from './routes/health.js'
import protocol from './routes/protocol.js'
import stream from './routes/stream.js'

const app = Fastify({logger: true})

await app.register(cors, {origin: config.corsOrigin.includes('*') ? true : config.corsOrigin})
await app.register(websocket, {options: {maxPayload: 64 * 1024}})
await app.register(health)
await app.register(stream)
await app.register(protocol)
// Next: wallet routes and the chart (time-series) routes

hub.start(app.log)

const shutdown = async () => {
    hub.stop()
    await app.close()
    await pool.end()
    process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

await app.listen({port: config.port, host: config.host})
