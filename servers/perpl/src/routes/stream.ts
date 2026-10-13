import type {FastifyInstance} from 'fastify'
import {hub} from '../hub.js'

export default async function stream(app: FastifyInstance) {
    // WebSocket: bidirectional, for per-client subscriptions (watch a wallet, etc.).
    app.get('/v1/stream', {websocket: true}, (socket) => {
        hub.addSocket(socket)
        socket.on('message', (raw: Buffer) => {
            // Subscription messages (e.g. {"sub":"wallet","address":"0x…"}) go here.
            try {
                const msg = JSON.parse(raw.toString())
                if (msg?.type === 'ping') socket.send(JSON.stringify({type: 'pong', at: Date.now()}))
            } catch {
                /* ignore malformed input */
            }
        })
    })

    // Server-sent events: one-way broadcast, auto-reconnects in the browser (EventSource).
    app.get('/v1/events', (req, reply) => {
        reply.hijack()
        const res = reply.raw
        res.writeHead(200, {
            'content-type': 'text/event-stream',
            'cache-control': 'no-cache, no-transform',
            connection: 'keep-alive',
            'access-control-allow-origin': req.headers.origin ?? '*',
            'x-accel-buffering': 'no',
        })
        res.write('retry: 2000\n\n')
        hub.addSse(res)
    })
}
