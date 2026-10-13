import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {DataSourceBuilder} from '@subsquid/evm-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {handle, referenced, topics} from './handlers'
import {Cache, State} from './state'

// Perpl Exchange proxy on Monad mainnet (chain 143).
// ABI revision: rc_v1.1.7-203-g0e5902dd (see abi/Exchange.json).
const EXCHANGE = '0x34B6552d57a35a1D042CcAe1951BD1C370112a6F'.toLowerCase()
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)
// Optional: stop after this block (for test runs over a fixed range).
const END_BLOCK = process.env.END_BLOCK ? Number(process.env.END_BLOCK) : undefined
// Set BULK_WRITES=0 to send every write through the store again (see bulk.ts).
const BULK_WRITES = process.env.BULK_WRITES !== '0'
// Set by db/range.cjs for a processor that starts mid-chain in its own schema (see State).
const RANGE_MODE = process.env.RANGE_MODE === '1'
// Do not track orders at all (see State). Set by db/range.cjs start --no-orders.
const SKIP_ORDERS = process.env.SKIP_ORDERS === '1'

const dataSource = new DataSourceBuilder()
    .setPortal({
        url: process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/monad-mainnet',
        http: {
            headers: {'x-api-key': process.env.SQD_API_KEY ?? ''},
        },
    })
    .setBlockRange({from: START_BLOCK, to: END_BLOCK})
    .setFields({
        block: {timestamp: true},
        log: {transactionHash: true, topics: true, data: true},
    })
    .addLog({where: {address: [EXCHANGE], topic0: topics()}})
    .build()

const database = new TypeormDatabase({supportHotBlocks: true, stateSchema: process.env.DB_SCHEMA})
const log = createLogger('sqd:processor')

// Keeps entities in memory between batches while backfilling, so hot markets/accounts/positions/orders
// aren't re-read from Postgres every batch. Dropped at the chain head, where hot-block rollbacks can happen.
const cache = new Cache()
const MAX_CACHED = 500_000

run(dataSource, database, async (ctx) => {
    if (ctx.isHead) cache.clear()
    // Bulk writes only while backfilling: at the head, blocks can still be reorged and the store must track every write.
    const state = new State(ctx.store, cache, BULK_WRITES && !ctx.isHead, RANGE_MODE, SKIP_ORDERS)
    const t0 = Date.now()
    const blocks = ctx.blocks.map(augmentBlock)
    await state.prefetch(referenced(blocks.flatMap((b) => b.logs)))
    const tp = Date.now()
    let count = 0
    for (const block of blocks) {
        for (const l of block.logs) {
            await handle(
                state,
                {
                    block: block.header.number,
                    time: new Date(block.header.timestamp),
                    txHash: l.transactionHash,
                    logIndex: l.logIndex,
                },
                l
            )
            count++
        }
    }
    const t1 = Date.now()
    await state.flush()
    const t2 = Date.now()
    if (ctx.isHead || cache.size > MAX_CACHED) cache.clear()
    if (count > 0) {
        log.info(`Processed ${count} events from block ${ctx.blocks.at(0)?.header.number} to ${ctx.blocks.at(-1)?.header.number} (prefetch ${tp - t0}ms, handlers ${t1 - tp}ms, flush ${t2 - t1}ms: ${state.flushStats})`)
    }
})
