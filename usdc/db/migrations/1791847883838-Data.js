module.exports = class Data1791847883838 {
    name = 'Data1791847883838'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block" integer NOT NULL, "block_time" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "idx_transfer_block_1ca50110" ON "transfer" ("block") `)
        await db.query(`CREATE INDEX "idx_transfer_from_3d310ced" ON "transfer" ("from") `)
        await db.query(`CREATE INDEX "idx_transfer_to_b90faa67" ON "transfer" ("to") `)
        await db.query(`CREATE TABLE "holder" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "transfers_in" integer NOT NULL, "transfers_out" integer NOT NULL, CONSTRAINT "PK_8266ed18d931b168de2723ad322" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "holder"`)
        await db.query(`DROP INDEX "usdc"."idx_transfer_to_b90faa67"`)
        await db.query(`DROP INDEX "usdc"."idx_transfer_from_3d310ced"`)
        await db.query(`DROP INDEX "usdc"."idx_transfer_block_1ca50110"`)
        await db.query(`DROP TABLE "transfer"`)
    }
}
