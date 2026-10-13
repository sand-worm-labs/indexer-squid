# Runs every squid in this repo (any folder in indexers/ with a squid.yaml) under pm2.
# The shared Postgres comes from docker-compose.yml (service "db").
FROM node:22-slim
RUN npm install -g pm2 && apt-get update && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY . .
RUN for d in indexers/*/; do \
      [ -f "$d/squid.yaml" ] || continue; \
      (cd "$d" && npm install --no-audit --no-fund && npm run build); \
    done

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
