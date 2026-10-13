import {run} from '@subsquid/batch-processor'
import {DataSourceBuilder} from '@subsquid/solana-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'

// TODO: set the program id, then add handlers.
const PROGRAM_ID = process.env.PROGRAM_ID ?? ''
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)

const dataSource = new DataSourceBuilder()
    .setPortal({
        url: process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/solana-mainnet',
        http: {headers: {'x-api-key': process.env.SQD_API_KEY ?? ''}},
    })
    .setBlockRange({from: START_BLOCK})
    .setFields({
        block: {timestamp: true},
        transaction: {signatures: true},
        instruction: {programId: true, accounts: true, data: true},
    })
    .addInstruction({
        where: {programId: [PROGRAM_ID]},
        include: {transaction: true},
    })
    .build()

const database = new TypeormDatabase({supportHotBlocks: true, stateSchema: process.env.DB_SCHEMA})
const log = createLogger('sqd:processor')

run(dataSource, database, async (ctx) => {
    const count = ctx.blocks.reduce((n, b) => n + b.instructions.length, 0)
    if (count > 0) log.info(`${count} instructions in slots ${ctx.blocks[0].header.number}..${ctx.blocks.at(-1)!.header.number}`)
})
