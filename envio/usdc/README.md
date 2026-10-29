# usdc (HyperIndex)

A [HyperIndex](https://docs.envio.dev) port of [`indexers/usdc`](../../indexers/usdc): every `Transfer` of one ERC-20 on
Monad mainnet (chain 143), plus a running balance and transfer counts per holder. Same entities (`Transfer`, `Holder`),
same fields, same ids (`<block>-<logIndex>` for transfers, the lowercased address for holders).

## Run

```sh
pnpm install
cp .env.example .env    # set ENVIO_API_TOKEN and ENVIO_CONTRACT_ADDRESS (the squid's CONTRACT_ADDRESS)
pnpm dev                # Postgres + Hasura in Docker, GraphQL on http://localhost:8080
pnpm test               # unit test (no network)
```

`ENVIO_START_BLOCK` replaces the squid's `START_BLOCK` and can stay `0`: HyperSync skips blocks without matching logs.

## Mapping

| squid (`indexers/usdc`) | HyperIndex (`envio/usdc`) |
| --- | --- |
| `squid.yaml`, data source in `src/main.ts` | `config.yaml` |
| `schema.graphql` (`@entity`, `DateTime`) | `schema.graphql` (no `@entity`, `Timestamp`) |
| batch handler in `src/main.ts` | `src/handlers/ERC20.ts`, one call per `Transfer` |
| SQD portal | HyperSync |
