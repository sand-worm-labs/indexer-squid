// The processor looks up the OPEN order for (market, order_id) on every order event. Order ids are reused, so without this
// index Postgres scans most of the order table (~700ms at 1.2M rows) per lookup.
module.exports = class OpenOrderIndex1791856000000 {
    name = 'OpenOrderIndex1791856000000'

    async up(db) {
        await db.query(`CREATE INDEX IF NOT EXISTS "idx_order_open_lookup" ON "order" ("market_id", "order_id", "created_block" DESC) WHERE "status" = 'OPEN'`)
    }

    async down(db) {
        await db.query(`DROP INDEX "idx_order_open_lookup"`)
    }
}
