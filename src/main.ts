import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {DataSourceBuilder} from '@subsquid/evm-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {handlers} from './events'
import type {Handler} from './bind'

// Perpl Exchange proxy on Monad mainnet (chain 143).
// ABI revision: rc_v1.1.7-203-g0e5902dd (see abi/Exchange.json).
const EXCHANGE = '0x34B6552d57a35a1D042CcAe1951BD1C370112a6F'.toLowerCase()
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)

const byTopic = new Map<string, Handler>(handlers.map((h) => [h.topic, h]))

const dataSource = new DataSourceBuilder()
    .setPortal(process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/monad-mainnet')
    .setBlockRange({from: START_BLOCK})
    .setFields({
        block: {timestamp: true},
        log: {transactionHash: true, topics: true, data: true},
    })
    .addLog({
        where: {
            address: [EXCHANGE],
            topic0: [...byTopic.keys()],
        },
    })
    .build()

const database = new TypeormDatabase({supportHotBlocks: true})
const log = createLogger('sqd:processor')

run(dataSource, database, async (ctx) => {
    const batches = new Map<Function, object[]>()
    let count = 0

    for (const block of ctx.blocks.map(augmentBlock)) {
        for (const l of block.logs) {
            const handler = byTopic.get(l.topics[0])
            if (!handler) continue
            const entity = handler.build(l, {
                id: `143_${block.header.number}_${l.logIndex}`,
                block: block.header.number,
                blockTime: new Date(block.header.timestamp),
                txHash: l.transactionHash,
                logIndex: l.logIndex,
            })
            let list = batches.get(handler.entity)
            if (!list) batches.set(handler.entity, (list = []))
            list.push(entity)
            count++
        }
    }

    for (const entities of batches.values()) {
        await ctx.store.insert(entities as any[])
    }

    if (count > 0) {
        const first = ctx.blocks.at(0)?.header.number
        const last = ctx.blocks.at(-1)?.header.number
        log.info(`Indexed ${count} events from block ${first} to ${last}`)
    }
})
