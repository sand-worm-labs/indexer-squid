import {run} from '@subsquid/batch-processor'
import {DataSourceBuilder} from '@subsquid/solana-stream'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'

// Follows the wallets in WALLET_ADDRESS (comma-separated): transactions it pays for, its SOL balance changes (incl. incoming transfers),
// and changes to token accounts it owns. TODO: add handlers that store these.
const WALLETS = (process.env.WALLET_ADDRESS ?? '').split(',').map((w) => w.trim()).filter(Boolean)
const START_BLOCK = Number(process.env.START_BLOCK ?? 0)

const dataSource = new DataSourceBuilder()
    .setPortal({
        url: process.env.PORTAL_URL ?? 'https://portal.sqd.dev/datasets/solana-mainnet',
        http: {headers: {'x-api-key': process.env.SQD_API_KEY ?? ''}},
    })
    .setBlockRange({from: START_BLOCK})
    .setFields({
        block: {timestamp: true},
        transaction: {signatures: true, feePayer: true, err: true},
        balance: {pre: true, post: true},
        tokenBalance: {preMint: true, postMint: true, preOwner: true, postOwner: true, preAmount: true, postAmount: true},
    })
    .addTransaction({where: {feePayer: WALLETS}})
    .addBalance({where: {account: WALLETS}, include: {transaction: true}})
    .addTokenBalance({where: {preOwner: WALLETS}, include: {transaction: true}})
    .addTokenBalance({where: {postOwner: WALLETS}, include: {transaction: true}})
    .build()

const database = new TypeormDatabase({supportHotBlocks: true, stateSchema: process.env.DB_SCHEMA})
const log = createLogger('sqd:processor')

run(dataSource, database, async (ctx) => {
    let txs = 0, balances = 0, tokens = 0
    for (const b of ctx.blocks) {
        txs += b.transactions.length
        balances += b.balances.length
        tokens += b.tokenBalances.length
    }
    if (txs + balances + tokens > 0) {
        log.info(`${txs} txs, ${balances} sol balance changes, ${tokens} token balance changes in slots ${ctx.blocks[0].header.number}..${ctx.blocks.at(-1)!.header.number}`)
    }
})
