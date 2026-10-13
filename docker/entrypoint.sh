#!/usr/bin/env bash
# For each enabled squid: create its schema, apply migrations, then run processor + GraphQL API under pm2-runtime.
# Per-squid settings (START_BLOCK, CONTRACT_ADDRESS/WALLET_ADDRESS, SQD_API_KEY, ...) come from /app/<squid>/.env (mounted by compose);
# DB host/port/user/password come from the root .env via the container environment.
set -euo pipefail
cd /app

: "${SANDWORM_CLOUD_DB_USER:?}" "${SANDWORM_CLOUD_DB_PASSWORD:?}"
export DB_NAME=${SANDWORM_CLOUD_DB_NAME:-sandworm_cloud_db}
enabled() { [ -z "${ENABLED_SQUIDS:-}" ] || [[ ",${ENABLED_SQUIDS// /}," == *",$1,"* ]]; }

port=4350
apps=()
for f in */squid.yaml; do
  d=$(dirname "$f"); enabled "$d" || continue
  (
    set -a; [ -f "$d/.env" ] && . "$d/.env"; set +a
    export DB_NAME DB_SCHEMA=$d DB_HOST=db DB_PORT=5432 DB_USER=$SANDWORM_CLOUD_DB_USER DB_PASS=$SANDWORM_CLOUD_DB_PASSWORD
    cd "$d"
    if grep -q CONTRACT_ADDRESS src/main.ts && [ -z "${CONTRACT_ADDRESS:-}" ]; then echo "skip $d: CONTRACT_ADDRESS not set"; exit 3; fi
    if grep -q WALLET_ADDRESS src/main.ts && [ -z "${WALLET_ADDRESS:-}" ]; then echo "skip $d: WALLET_ADDRESS not set"; exit 3; fi
    node -e "
      const {Client}=require('pg');const c=new Client({host:'db',port:5432,user:process.env.DB_USER,password:process.env.DB_PASS,database:process.env.DB_NAME});
      c.connect().then(()=>c.query('create schema if not exists \"'+process.env.DB_SCHEMA+'\"')).then(()=>c.end())"
    ls db/migrations/*.js >/dev/null 2>&1 || npx squid-typeorm-migration generate
    npx squid-typeorm-migration apply
  ) && rc=0 || rc=$?
  [ "$rc" = 3 ] && continue
  [ "$rc" = 0 ] || exit "$rc"
  gql=$port; port=$((port+1))
  apps+=("$d:$gql")
done
[ ${#apps[@]} -gt 0 ] || { echo "no squid ready to run"; exit 1; }

# pm2 ecosystem: two processes per squid, same env as above.
node -e '
const apps=process.argv.slice(1).flatMap(a=>{
  const [d,gql]=a.split(":");
  const env={...require(require.resolve("dotenv",{paths:["/app/"+d]})).config({path:`/app/${d}/.env`}).parsed,DB_NAME:process.env.DB_NAME,DB_SCHEMA:d,DB_HOST:"db",DB_PORT:"5432",
    DB_USER:process.env.SANDWORM_CLOUD_DB_USER,DB_PASS:process.env.SANDWORM_CLOUD_DB_PASSWORD,GQL_PORT:gql};
  return [{name:d,cwd:`/app/${d}`,script:"lib/main.js",env},
          {name:d+"-api",cwd:`/app/${d}`,script:"npx",args:"squid-graphql-server",env}];
});
require("fs").writeFileSync("/tmp/ecosystem.config.json",JSON.stringify({apps}))' "${apps[@]}"
exec pm2-runtime /tmp/ecosystem.config.json
