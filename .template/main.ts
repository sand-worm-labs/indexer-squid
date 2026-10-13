import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {DataSourceBuilder} from '@subsquid/evm-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'

// TODO: set the contract address, then add handlers (see ../perpl_squid/src/handlers.ts for a worked example).
const CONTRACT = (process.env.CONTRACT_ADDRESS ?? '').toLowerCase()
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)

const dataSource = new DataSourceBuilder()
    .setPortal({
        url: process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/{{CHAIN}}',
        http: {headers: {'x-api-key': process.env.SQD_API_KEY ?? ''}},
    })
    .setBlockRange({from: START_BLOCK})
    .setFields({block: {timestamp: true}, log: {transactionHash: true, topics: true, data: true}})
    .addLog({where: {address: [CONTRACT]}})
    .build()

const database = new TypeormDatabase({supportHotBlocks: true, stateSchema: process.env.DB_SCHEMA})
const log = createLogger('sqd:processor')

run(dataSource, database, async (ctx) => {
    const blocks = ctx.blocks.map(augmentBlock)
    const logs = blocks.reduce((n, b) => n + b.logs.length, 0)
    if (logs > 0) log.info(`${logs} logs in blocks ${blocks[0].header.number}..${blocks.at(-1)!.header.number}`)
})
