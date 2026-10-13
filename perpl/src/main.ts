import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {DataSourceBuilder} from '@subsquid/evm-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {handle, topics} from './handlers'
import {State} from './state'

// Perpl Exchange proxy on Monad mainnet (chain 143).
// ABI revision: rc_v1.1.7-203-g0e5902dd (see abi/Exchange.json).
const EXCHANGE = '0x34B6552d57a35a1D042CcAe1951BD1C370112a6F'.toLowerCase()
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)

const dataSource = new DataSourceBuilder()
    .setPortal({
        url: process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/monad-mainnet',
        http: {
            headers: {'x-api-key': process.env.SQD_API_KEY ?? ''},
        },
    })
    .setBlockRange({from: START_BLOCK})
    .setFields({
        block: {timestamp: true},
        log: {transactionHash: true, topics: true, data: true},
    })
    .addLog({where: {address: [EXCHANGE], topic0: topics()}})
    .build()

const database = new TypeormDatabase({supportHotBlocks: true, stateSchema: process.env.DB_SCHEMA})
const log = createLogger('sqd:processor')

run(dataSource, database, async (ctx) => {
    const state = new State(ctx.store)
    let count = 0
    for (const block of ctx.blocks.map(augmentBlock)) {
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
    await state.flush()
    if (count > 0) {
        log.info(`Processed ${count} events from block ${ctx.blocks.at(0)?.header.number} to ${ctx.blocks.at(-1)?.header.number}`)
    }
})
