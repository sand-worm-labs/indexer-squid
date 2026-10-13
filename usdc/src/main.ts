import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {DataSourceBuilder} from '@subsquid/evm-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as erc20 from './abi/ERC20'
import {Holder, Transfer} from './model'

// Example squid: an ERC-20 token's Transfer events plus a running balance per holder.
const CONTRACT = (process.env.CONTRACT_ADDRESS ?? '').toLowerCase()
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)
const ZERO = '0x0000000000000000000000000000000000000000'

const dataSource = new DataSourceBuilder()
    .setPortal({
        url: process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/monad-mainnet',
        http: {headers: {'x-api-key': process.env.SQD_API_KEY ?? ''}},
    })
    .setBlockRange({from: START_BLOCK})
    .setFields({block: {timestamp: true}, log: {transactionHash: true, topics: true, data: true}})
    .addLog({where: {address: [CONTRACT], ...erc20.events.Transfer.topicSelection()}})
    .build()

const database = new TypeormDatabase({supportHotBlocks: true, stateSchema: process.env.DB_SCHEMA})
const log = createLogger('sqd:usdc')

run(dataSource, database, async (ctx) => {
    const transfers: Transfer[] = []
    const holders = new Map<string, Holder>()

    const holder = async (address: string) => {
        let h = holders.get(address) ?? (await ctx.store.get(Holder, address))
        if (!h) h = new Holder({id: address, balance: 0n, transfersIn: 0, transfersOut: 0})
        holders.set(address, h)
        return h
    }

    for (const block of ctx.blocks.map(augmentBlock)) {
        for (const l of block.logs) {
            const {from, to, value} = erc20.events.Transfer.decode(l)
            const [f, t] = [from.toLowerCase(), to.toLowerCase()]
            transfers.push(
                new Transfer({
                    id: `${block.header.number}-${l.logIndex}`,
                    block: block.header.number,
                    blockTime: new Date(block.header.timestamp),
                    txHash: l.transactionHash,
                    from: f,
                    to: t,
                    value,
                })
            )
            if (f !== ZERO) {
                const h = await holder(f)
                h.balance -= value
                h.transfersOut++
            }
            if (t !== ZERO) {
                const h = await holder(t)
                h.balance += value
                h.transfersIn++
            }
        }
    }
    await ctx.store.insert(transfers)
    await ctx.store.upsert([...holders.values()])
    if (transfers.length) log.info(`${transfers.length} transfers up to block ${ctx.blocks.at(-1)?.header.number}`)
})
