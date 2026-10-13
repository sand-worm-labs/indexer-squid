-- Speeds up backfill: drops secondary indexes on the append-only tables (the processor only inserts into them, never reads).
-- Run on the perpl schema, then run backfill-restore-indexes.sql once the processor has reached the chain head.
--   docker compose exec -T db psql -U $SANDWORM_CLOUD_DB_USER -d $SANDWORM_CLOUD_DB_NAME -f - < perpl/db/backfill-drop-indexes.sql
set search_path = perpl;
DROP INDEX IF EXISTS idx_position_change_position_c565ac62, idx_position_change_market_a7430e52, idx_position_change_account_0e8026dc,
  idx_position_change_block_3c57bde0, idx_position_change_block_time_501087ea,
  idx_trade_market_7d347656, idx_trade_account_64961d47, idx_trade_order_c4eb356b, idx_trade_block_983b8994, idx_trade_block_time_ce291d11,
  idx_collateral_transfer_account_497efd87, idx_collateral_transfer_block_7f884ee3, idx_collateral_transfer_block_time_34258219;
