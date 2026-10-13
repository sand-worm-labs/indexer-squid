import type {FastifyInstance} from 'fastify'
import {indexedHead, pool, queryStats} from '../db.js'
import {hub} from '../hub.js'

export default async function health(app: FastifyInstance) {
    app.get('/health', async () => {
        await pool.query('select 1')
        return {ok: true, clients: hub.clients, db: queryStats()}
    })

    // Latest block the indexer has committed.
    app.get('/v1/head', async () => ({block: await indexedHead(), at: Date.now()}))
}
