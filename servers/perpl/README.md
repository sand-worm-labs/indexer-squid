# perpl-livedata-server

Fastify server for the Perpl dashboard: REST routes, a WebSocket stream and an SSE feed, all reading the perpl squid's Postgres schema.

## Run

```
./livedata start perpl   # generates .env from the root .env (read-only login) and runs it under pm2
# or, for development, with a hand-made .env (see .env.example):
npm install && npm run dev
```

## Endpoints

| Route | What |
|---|---|
| `GET /health` | DB check and connected client count |
| `GET /v1/head` | latest block the indexer has committed |
| `GET /v1/stream` (WebSocket) | live `{"type":"head","block":N}` events; send `{"type":"ping"}` for a pong |
| `GET /v1/events` (SSE) | same events as server-sent events (use `EventSource`) |

## Design

- One poll of the indexed head (`HEAD_POLL_MS`) serves every client; clients never cause their own queries (`src/hub.ts`).
- The pool is read-only (`default_transaction_read_only=on`, 5s statement timeout) and resolves tables inside `DB_SCHEMA`.
- Add routes in `src/routes/` and register them in `src/server.ts`. Add new live feeds in `src/hub.ts` and call `hub.broadcast()`.
