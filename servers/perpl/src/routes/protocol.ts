import type {FastifyInstance} from 'fastify'
import {indexedHead} from '../db.js'
import {aggregator} from '../protocol/summary.js'
import {hub} from '../hub.js'

export default async function protocol(app: FastifyInstance) {
    // Headline numbers: 24h/7d/30d volume, open interest, markets, fees, users. Also pushed live as {"type":"summary"}.
    app.get('/v1/protocol/summary', async () => {
        if (hub.summary) return hub.summary
        return aggregator.update((await indexedHead()) ?? 0)
    })
}
