# Perpl Exchange squid

[Subsquid](https://docs.sqd.ai) indexer for the Perpl Exchange on Monad mainnet (chain 143), proxy
`0x34B6552d57a35a1D042CcAe1951BD1C370112a6F`. ABI: `abi/Exchange.json` (PerplFoundation/dex-sdk, contract revision `rc_v1.1.7-203-g0e5902dd`).

## Data model (`schema.graphql`)

| Entity | What it is |
| --- | --- |
| `Market` | a perpetual (perpId), its parameters, mark/oracle price, last funding |
| `Account` | an exchange account: owner address, latest balance, deposit/withdraw totals |
| `Order` | a resting order: status `OPEN / FILLED / CANCELLED / CLEARED`, remaining and filled size |
| `Trade` | one maker or taker fill |
| `Position` | current state per (market, account), with realized PnL and funding |
| `PositionChange` | every open / increase / decrease / close / invert / liquidation / deleverage / unwind / collateral change |
| `Funding` | one row per funding event |
| `CollateralTransfer` | deposits and withdrawals |

Amounts are raw on-chain integers: `*PNS` price, `*LNS` lot size (scale with the market's `priceDecimals` / `lotDecimals`), `*CNS` collateral.

## How events are mapped

Code is in `src/handlers.ts` (one `on(event, …)` per event) and `src/state.ts` (a per-batch entity cache, flushed at the end of each batch).

- `OrderRequest(V2)` sets the order context for its transaction. `OrderPlaced`, `OrderChanged`, `OrderCancelled` and `TakerOrderFilled`
  don't carry perpId/accountId, so they read it from that context. It is dropped at the end of the transaction or on `OrderBatchCompleted`.
- Order ids are small and get reused, so `Order.id` is the placing log (`block-logIndex`) and open orders are looked up by (market, orderId, status OPEN).
- Events not listed above (admin, config, error/diagnostic events) are not indexed.

## Run

```sh
npm ci
sqd up                 # Postgres
sqd process            # build, migrate, index
sqd serve              # GraphQL on :4350
```

Env (`.env`, see `.env.example`): `SQD_API_KEY`; optional `START_BLOCK` (set to the deploy block to skip empty history) and `PORTAL_URL`.
Start from before the first `ContractAdded`, otherwise markets are created as placeholders (`perp-<id>`).

## Changing the schema or ABI

```sh
sqd typegen            # abi/*.json -> src/abi
sqd codegen            # schema.graphql -> src/model
sqd migration:generate
```
