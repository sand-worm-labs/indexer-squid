-- Read-only views that expose the HyperIndex tables under the squid's table and column names, in a schema
-- called "perpl". servers/perpl (the live-data server) and any SQL written against the squid's database can then
-- run unchanged with DB_SCHEMA=perpl. Generated from both databases' information_schema; rerun after a schema change.
--
--   psql "$DATABASE_URL" -f sql/squid-compat-views.sql
--
-- Enum columns are cast to text (the squid stores them as varchar). Rows are filtered to Monad (chainId 143).
create schema if not exists perpl;

create or replace view perpl."account" as select
  "id",
  "accountId" as account_id,
  "address",
  "balanceCNS" as balance_cns,
  "totalDepositedCNS" as total_deposited_cns,
  "totalWithdrawnCNS" as total_withdrawn_cns,
  "frozenStatus" as frozen_status,
  "createdBlock" as created_block,
  "createdAt" as created_at,
  "updatedBlock" as updated_block,
  "updatedAt" as updated_at
from public."Account" where "chainId" = 143;

create or replace view perpl."collateral_transfer" as select
  "id",
  "kind"::text,
  "amountCNS" as amount_cns,
  "balanceCNS" as balance_cns,
  "block",
  "blockTime" as block_time,
  "txHash" as tx_hash,
  "account_id"
from public."CollateralTransfer" where "chainId" = 143;

create or replace view perpl."funding" as select
  "id",
  "fundingBlock" as funding_block,
  "specifiedRatePct100K" as specified_rate_pct100_k,
  "actualRatePct100K" as actual_rate_pct100_k,
  "fundingPricePNS" as funding_price_pns,
  "fundingPaymentPNS" as funding_payment_pns,
  "fundingSumPNS" as funding_sum_pns,
  "block",
  "blockTime" as block_time,
  "txHash" as tx_hash,
  "market_id"
from public."Funding" where "chainId" = 143;

create or replace view perpl."market" as select
  "id",
  "perpId" as perp_id,
  "name",
  "symbol",
  "status",
  "paused",
  "removed",
  "basePricePNS" as base_price_pns,
  "priceDecimals" as price_decimals,
  "lotDecimals" as lot_decimals,
  "initMarginFracHdths" as init_margin_frac_hdths,
  "maintMarginFracHdths" as maint_margin_frac_hdths,
  "maxOpenInterestLNS" as max_open_interest_lns,
  "feeScheduleId" as fee_schedule_id,
  "takerFeePer100K" as taker_fee_per100_k,
  "makerFeePer100K" as maker_fee_per100_k,
  "markPricePNS" as mark_price_pns,
  "oraclePricePNS" as oracle_price_pns,
  "oracleTimestamp" as oracle_timestamp,
  "lastFundingRatePct100K" as last_funding_rate_pct100_k,
  "lastFundingBlock" as last_funding_block,
  "createdBlock" as created_block,
  "createdAt" as created_at,
  "updatedBlock" as updated_block,
  "updatedAt" as updated_at
from public."Market" where "chainId" = 143;

create or replace view perpl."order" as select
  "id",
  "orderId" as order_id,
  "orderType"::text as order_type,
  "status"::text,
  "pricePNS" as price_pns,
  "requestedLotLNS" as requested_lot_lns,
  "lotLNS" as lot_lns,
  "filledLotLNS" as filled_lot_lns,
  "expiryBlock" as expiry_block,
  "postOnly" as post_only,
  "fillOrKill" as fill_or_kill,
  "immediateOrCancel" as immediate_or_cancel,
  "leverageHdths" as leverage_hdths,
  "endReason" as end_reason,
  "createdBlock" as created_block,
  "createdAt" as created_at,
  "updatedBlock" as updated_block,
  "updatedAt" as updated_at,
  "txHash" as tx_hash,
  "market_id",
  "account_id"
from public."Order" where "chainId" = 143;

create or replace view perpl."position" as select
  "id",
  "positionType"::text as position_type,
  "status"::text,
  "lotLNS" as lot_lns,
  "depositCNS" as deposit_cns,
  "leverageHdths" as leverage_hdths,
  "openPricePNS" as open_price_pns,
  "realizedPnlCNS" as realized_pnl_cns,
  "fundingCNS" as funding_cns,
  "openedBlock" as opened_block,
  "openedAt" as opened_at,
  "closedAt" as closed_at,
  "updatedBlock" as updated_block,
  "updatedAt" as updated_at,
  "market_id",
  "account_id"
from public."Position" where "chainId" = 143;

create or replace view perpl."position_change" as select
  "id",
  "kind"::text,
  "positionType"::text as position_type,
  "pricePNS" as price_pns,
  "lotBeforeLNS" as lot_before_lns,
  "lotAfterLNS" as lot_after_lns,
  "depositBeforeCNS" as deposit_before_cns,
  "depositAfterCNS" as deposit_after_cns,
  "deltaPnlCNS" as delta_pnl_cns,
  "fundingCNS" as funding_cns,
  "block",
  "blockTime" as block_time,
  "txHash" as tx_hash,
  "position_id",
  "market_id",
  "account_id"
from public."PositionChange" where "chainId" = 143;

create or replace view perpl."trade" as select
  "id",
  "role"::text,
  "pricePNS" as price_pns,
  "lotLNS" as lot_lns,
  "feeCNS" as fee_cns,
  "amountCNS" as amount_cns,
  "balanceCNS" as balance_cns,
  "builderId" as builder_id,
  "builderFeeCNS" as builder_fee_cns,
  "block",
  "blockTime" as block_time,
  "txHash" as tx_hash,
  "market_id",
  "account_id",
  "order_id"
from public."Trade" where "chainId" = 143;

-- The squid's processor status table: servers/perpl reads the indexed head from here.
create or replace view perpl.status as
  select 0 as id, progress_block as height, null::text as hash, null::int as nonce
  from public.envio_chains where id = 143;
