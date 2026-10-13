-- Recreates what backfill-drop-indexes.sql dropped. Run when the processor is at the chain head (the API is slow without them).
set search_path = perpl;
CREATE INDEX IF NOT EXISTS idx_position_change_position_c565ac62 ON position_change (position_id);
CREATE INDEX IF NOT EXISTS idx_position_change_market_a7430e52 ON position_change (market_id);
CREATE INDEX IF NOT EXISTS idx_position_change_account_0e8026dc ON position_change (account_id);
CREATE INDEX IF NOT EXISTS idx_position_change_block_3c57bde0 ON position_change (block);
CREATE INDEX IF NOT EXISTS idx_position_change_block_time_501087ea ON position_change (block_time);
CREATE INDEX IF NOT EXISTS idx_trade_market_7d347656 ON trade (market_id);
CREATE INDEX IF NOT EXISTS idx_trade_account_64961d47 ON trade (account_id);
CREATE INDEX IF NOT EXISTS idx_trade_order_c4eb356b ON trade (order_id);
CREATE INDEX IF NOT EXISTS idx_trade_block_983b8994 ON trade (block);
CREATE INDEX IF NOT EXISTS idx_trade_block_time_ce291d11 ON trade (block_time);
CREATE INDEX IF NOT EXISTS idx_collateral_transfer_account_497efd87 ON collateral_transfer (account_id);
CREATE INDEX IF NOT EXISTS idx_collateral_transfer_block_7f884ee3 ON collateral_transfer (block);
CREATE INDEX IF NOT EXISTS idx_collateral_transfer_block_time_34258219 ON collateral_transfer (block_time);
