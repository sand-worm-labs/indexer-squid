# perpl (HyperIndex)

A [HyperIndex](https://docs.envio.dev) port of [`indexers/perpl`](../../indexers/perpl), the Perpl Exchange indexer on
Monad mainnet (chain 143, proxy `0x34B6552d57a35a1D042CcAe1951BD1C370112a6F`). It indexes the same 49 events into the
same 8 entities, with the same ids and field values, so a query or a SQL report written against the squid's data should
need only the changes listed under [Differences](#differences).

## Run

Needs Node 22+, pnpm and Docker.

```sh
pnpm install
cp .env.example .env     # set ENVIO_API_TOKEN (HyperSync), see https://envio.dev/app/api-tokens
pnpm dev                 # Postgres + Hasura in Docker, indexes from the first Perpl block, GraphQL on http://localhost:8080
pnpm test                # unit tests for the order and position logic (no network)
```

Against your own Postgres, without Docker or Hasura:

```sh
ENVIO_PG_HOST=localhost ENVIO_PG_PORT=5432 ENVIO_PG_USER=... ENVIO_PG_PASSWORD=... ENVIO_PG_DATABASE=... \
ENVIO_HASURA=false pnpm start
```

`pnpm start` resumes from the last saved block; `pnpm start -- --restart` (or `envio start --restart`) wipes the tables
and indexes from scratch. After changing `config.yaml` or `schema.graphql`, run `pnpm codegen`.

## What maps to what

| squid (`indexers/perpl`) | HyperIndex (`envio/perpl`) |
| --- | --- |
| `src/main.ts`: SQD portal data source, address, topic filter | `config.yaml`: the address and the 49 event signatures; data from HyperSync |
| `schema.graphql` | `schema.graphql`: same types, enums, fields and `@index`es |
| `src/handlers.ts`: one `on(event, ...)` per event | `src/handlers/Exchange.ts`: one `indexer.onEvent(...)` per event, same logic line by line |
| `src/state.ts`: per-batch entity cache, prefetch, flush | `src/state.ts`: get-or-create helpers only. HyperIndex batches reads (preload phase) and writes itself |
| `src/bulk.ts`, `db/backfill-*.cjs`, `db/range.cjs`: backfill speed-ups | not needed. HyperIndex writes in bulk and creates `@index` indexes after the backfill |
| hot-block handling (`supportHotBlocks`) | built in (reorg rollback, `max_reorg_depth` 200 on Monad) |
| OpenReader GraphQL (`sqd serve`) | Hasura GraphQL (`pnpm dev`, or your own Hasura) |
| `servers/perpl` reading the `perpl` schema | the same server, unchanged, against `sql/squid-compat-views.sql` (see below) |

Entity ids are identical: `Market` = perpId, `Account` = accountId, `Position` = `perpId-accountId`,
`Funding` = `perpId-fundingBlock`, and `Order`, `Trade`, `PositionChange`, `CollateralTransfer` = `block-logIndex` of the
log that created them.

## Differences

- **Two helper tables.** `OpenOrderRef` (`perpId-orderId` -> the OPEN order) replaces the squid's query on
  `(market, orderId, status = OPEN)`, and `TxOrderContext` holds the last `OrderRequest` of the current transaction, which
  the squid keeps in memory. Both are internal; ignore them in queries.
- **Column and table names.** HyperIndex keeps the schema's names: table `"PositionChange"`, column `"lotBeforeLNS"`,
  foreign key `market_id`. The squid's TypeORM names are snake_case (`position_change.lot_before_lns`). Every row also
  carries a `chainId` column (143).
- **SQL compatibility.** `sql/squid-compat-views.sql` creates a `perpl` schema of read-only views with the squid's exact
  table and column names. `servers/perpl` and any SQL written for the squid then run unchanged with `DB_SCHEMA=perpl`.
- **GraphQL.** The entities and fields are the same, but the query language is Hasura's (`Order(where: {status: {_eq:
  OPEN}}, order_by: {createdBlock: desc}, limit: 10)`) rather than OpenReader's (`orders(where: {status_eq: OPEN},
  orderBy: createdBlock_DESC, limit: 10)`). `DateTime` fields are `Timestamp` (both are `timestamptz`).
- **Reused order ids.** If an order id is reused while an older order with the same id was never closed, the squid's
  query returns the newest open one, and so does `OpenOrderRef`. Once that newest order closes, the squid's lookup can
  fall back to the older stale order (only after its in-memory cache is cleared), whereas HyperIndex finds no open order.
  No such case appeared in the comparison below.

## Benchmark

Both indexers ran on the same laptop, from an empty database, one at a time. The squid ran in its own backfill mode
(`db/backfill-*.cjs`, indexes and foreign keys dropped) against the public SQD portal without an API key, which
throttled it with HTTP 529s. Its times stop at the last processed batch and exclude rebuilding its indexes; the
HyperIndex times include building all 24 indexes.

| Block range | Handled events | HyperIndex | squid | Speed-up |
| --- | --- | --- | --- | --- |
| 54,773,010 → 64,766,115 (first Perpl block onward) | 61,499,930 | 534 s (3.14.0) | 2,921 s (2,431 s without 529 back-off) | 4.6–5.5× |
| 110,000,000 → 110,250,000 (dense, ~42 events/block) | 10,608,926 | **139 s (3.15.0)**, 152 s (3.14.0) | 446 s (326 s without 529 back-off) | 2.3–3.2× |

The squid's processor (prefetch, handlers and flush) was busy for 319 s of its 2,921 s on the first range and 61 s of
its 446 s on the dense range; the rest was waiting on data. With a keyed portal the squid would wait less, so the gap
there would likely be smaller than measured here.

**Output is identical.** At the end of each range every row of all 8 tables was compared, column by column, through
`sql/squid-compat-views.sql`: 2,849,110 rows on the first range (3.14.0) and 855,057 rows on the dense range (3.15.0),
with 0 differences and 0 rows on one side only.

The full history is about 2 billion handled events (sampled from HyperSync), so neither indexer was run to head.

## Layout

```
config.yaml            chain, address, the 49 events
schema.graphql         entities (squid schema + 2 helper entities)
src/handlers/Exchange.ts
src/state.ts           get-or-create helpers, open-order lookup, order context
src/indexer.test.ts    vitest: order lifecycle, id reuse, transaction scoping, position inversion
sql/squid-compat-views.sql
.claude/skills/        HyperIndex reference for coding agents (installed by `envio init`)
```
