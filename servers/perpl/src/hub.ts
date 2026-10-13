import type {ServerResponse} from 'node:http'
import type {WebSocket} from 'ws'
import {indexedHead} from './db.js'
import {config} from './config.js'

export interface HeadEvent {
    type: 'head'
    block: number
    at: number // server time, ms
}

/**
 * One poll for every connected client. Add more feeds here (liquidations, market ticks) and call broadcast();
 * clients never cause their own database queries.
 */
class Hub {
    private sockets = new Set<WebSocket>()
    private sse = new Set<ServerResponse>()
    private timer?: NodeJS.Timeout
    head: HeadEvent | null = null

    addSocket(ws: WebSocket) {
        this.sockets.add(ws)
        ws.on('close', () => this.sockets.delete(ws))
        if (this.head) ws.send(JSON.stringify(this.head)) // current state on connect
    }

    addSse(res: ServerResponse) {
        this.sse.add(res)
        res.on('close', () => this.sse.delete(res))
        if (this.head) res.write(`data: ${JSON.stringify(this.head)}\n\n`)
    }

    get clients() {
        return this.sockets.size + this.sse.size
    }

    broadcast(event: object) {
        const json = JSON.stringify(event)
        for (const ws of this.sockets) {
            // Slow client: skip rather than queue unboundedly; it gets the next update.
            if (ws.readyState === ws.OPEN && ws.bufferedAmount < 1_000_000) ws.send(json)
        }
        for (const res of this.sse) res.write(`data: ${json}\n\n`)
    }

    start(log: {error: (e: unknown) => void}) {
        const tick = async () => {
            try {
                const block = await indexedHead()
                if (block !== null && block !== this.head?.block) {
                    this.head = {type: 'head', block, at: Date.now()}
                    this.broadcast(this.head)
                }
            } catch (e) {
                log.error(e)
            }
        }
        void tick()
        this.timer = setInterval(tick, config.headPollMs)
        // Keep SSE connections alive through proxies.
        setInterval(() => {
            for (const res of this.sse) res.write(': ping\n\n')
        }, 15_000).unref()
    }

    stop() {
        clearInterval(this.timer)
    }
}

export const hub = new Hub()
