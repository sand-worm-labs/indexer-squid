# indexer-squid

[Subsquid](https://docs.sqd.dev) indexers for Sandworm. Every top-level folder with a `squid.yaml` is a squid. All squids share one Postgres, with one database and one schema per squid.

`.template/` is the scaffold used by `./squids new`.

## Configuration

Create `./.env` in the repo root (gitignored):

```
SQD_API_KEY=...
SANDWORM_CLOUD_DB_USER=...
SANDWORM_CLOUD_DB_PASSWORD=...
SANDWORM_CLOUD_DB_NAME=sandworm_cloud_db   # optional
SANDWORM_CLOUD_DB_PORT=23798               # optional
ENABLED_SQUIDS=perpl,usdc                  # optional; unset means every squid
```

Each squid also has its own `.env` (written by `./squids setup`) with `START_BLOCK` and either `CONTRACT_ADDRESS` (EVM) or `WALLET_ADDRESS` (Solana, comma-separated wallets). A squid with that value empty is skipped on start.

## Run with the `squids` script

Needs Node, pm2, Docker (for Postgres) and Python 3.

```
./squids db up          # shared Postgres (+ adminer: ./squids db ui)
./squids setup all      # install deps, create .env + schema, migrate
./squids start all      # processor + GraphQL API per squid, under pm2
pm2 save
```

Also: `list`, `new <name> [--chain <portal-dataset>]`, `stop|restart|logs|status|migrate <name|all>`, `db readonly|psql|down`.

GraphQL ports come from each squid's `GQL_PORT` (4350 and up).

## Run with Docker

```
docker compose up -d --build squids
```

This starts Postgres plus one container running every enabled squid under `pm2-runtime`. It creates schemas, applies migrations and resumes from each squid's saved height. The squids' `.env` files must exist first, because compose mounts them read-only.

Don't run a squid both on the host and in Docker. Two processors on one schema corrupt it. Use `ENABLED_SQUIDS` to split them.

## Read-only access

`./squids db readonly` creates a login (`SANDWORM_CLOUD_DB_READER_USER` / `_PASSWORD`) with `SELECT` on data tables only.

## Deploy to a server

```
git clone https://github.com/sand-worm-labs/indexer-squid.git && cd indexer-squid
# create ./.env, then either the squids script or docker compose, as above
```

## Live data servers

`servers/<name>/` are Fastify REST + WebSocket + SSE servers that read a squid's schema with the read-only login (`SANDWORM_CLOUD_DB_READER_USER/PASSWORD` in the root `.env`). Each has a `server.conf` (port, schema); its `.env` is generated on start. After a `git pull` on the server:

```
./livedata list                              # servers, ports, enabled flag, pm2 state
./livedata start all                         # or a name; ENABLED_SERVERS=a,b in the root .env limits 'all'
./livedata new <name> --schema <schema>      # scaffold another server (next free port from 4400)
./livedata tunnel <name>                     # free public https URL via cloudflared (no domain needed)
./livedata logs|status|stop|restart <name>
```
