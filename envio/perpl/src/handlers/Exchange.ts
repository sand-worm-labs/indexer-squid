// Perpl Exchange handlers. A line-by-line port of indexers/perpl/src/handlers.ts: same events, same entity
// ids, same field values. See state.ts for the helpers and README.md for the differences.
import { indexer } from "envio";
import type { Market, Position, PositionChange } from "envio";
import {
  type Ctx,
  type Meta,
  type Mut,
  account,
  addOpenOrder,
  clearOrderContext,
  closeOrder,
  logId,
  market,
  meta,
  openOrder,
  orderContext,
  orderType,
  position,
  positionType,
  setBalance,
  setOrderContext,
  touch,
} from "../state";

// ---------------------------------------------------------------------------------------------
// Accounts and collateral
// ---------------------------------------------------------------------------------------------

indexer.onEvent({ contract: "Exchange", event: "AccountCreated" }, async ({ event, context }) => {
  const m = meta(event);
  const a = await account(context, event.params.id, m);
  a.address = event.params.account.toLowerCase();
  a.createdBlock = m.block;
  a.createdAt = m.time;
  touch(a, m);
  context.Account.set(a);
});

indexer.onEvent({ contract: "Exchange", event: "AccountFreeze" }, async ({ event, context }) => {
  const m = meta(event);
  const a = await account(context, event.params.accountId, m);
  a.frozenStatus = Number(event.params.status);
  touch(a, m);
  context.Account.set(a);
});

async function transfer(
  c: Ctx,
  m: Meta,
  kind: "DEPOSIT" | "WITHDRAWAL",
  p: { accountId: bigint; amountCNS: bigint; balanceCNS: bigint },
) {
  const a = await account(c, p.accountId, m);
  a.balanceCNS = p.balanceCNS;
  if (kind === "DEPOSIT") a.totalDepositedCNS += p.amountCNS;
  else a.totalWithdrawnCNS += p.amountCNS;
  touch(a, m);
  c.Account.set(a);
  c.CollateralTransfer.set({
    id: logId(m),
    account_id: a.id,
    kind,
    amountCNS: p.amountCNS,
    balanceCNS: p.balanceCNS,
    block: m.block,
    blockTime: m.time,
    txHash: m.txHash,
  });
}

indexer.onEvent({ contract: "Exchange", event: "CollateralDeposit" }, ({ event, context }) =>
  transfer(context, meta(event), "DEPOSIT", event.params),
);
indexer.onEvent({ contract: "Exchange", event: "CollateralWithdrawal" }, ({ event, context }) =>
  transfer(context, meta(event), "WITHDRAWAL", event.params),
);

// ---------------------------------------------------------------------------------------------
// Markets
// ---------------------------------------------------------------------------------------------

type MarketAdded = {
  perpId: bigint;
  name: string;
  symbol: string;
  status: bigint;
  basePricePNS: bigint;
  priceDecimals: bigint;
  lotDecimals: bigint;
  initMarginFracHdths: bigint;
  maintMarginFracHdths: bigint;
  maxOpenInterestLNS: bigint;
};

async function addMarket(c: Ctx, m: Meta, p: MarketAdded, extra: Partial<Market>) {
  const x = await market(c, p.perpId, m);
  x.name = p.name;
  x.symbol = p.symbol;
  x.status = Number(p.status);
  x.paused = false;
  x.removed = false;
  x.basePricePNS = p.basePricePNS;
  x.priceDecimals = Number(p.priceDecimals);
  x.lotDecimals = Number(p.lotDecimals);
  x.initMarginFracHdths = p.initMarginFracHdths;
  x.maintMarginFracHdths = p.maintMarginFracHdths;
  x.maxOpenInterestLNS = p.maxOpenInterestLNS;
  x.createdBlock = m.block;
  x.createdAt = m.time;
  touch(x, m);
  c.Market.set({ ...x, ...extra });
}

indexer.onEvent({ contract: "Exchange", event: "ContractAdded" }, ({ event, context }) =>
  addMarket(context, meta(event), event.params, {
    takerFeePer100K: event.params.takerFeePer100K,
    makerFeePer100K: event.params.makerFeePer100K,
  }),
);
indexer.onEvent({ contract: "Exchange", event: "ContractAddedV2" }, ({ event, context }) =>
  addMarket(context, meta(event), event.params, { feeScheduleId: event.params.perpFeeSchedId }),
);

async function updateMarket(c: Ctx, m: Meta, perpId: bigint, apply: (x: Mut<Market>) => void) {
  const x = await market(c, perpId, m);
  apply(x);
  touch(x, m);
  c.Market.set(x);
}

indexer.onEvent({ contract: "Exchange", event: "ContractPaused" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.paused = e.params.paused)),
);
indexer.onEvent({ contract: "Exchange", event: "ContractRemoved" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.removed = true)),
);
indexer.onEvent({ contract: "Exchange", event: "MarkUpdated" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.markPricePNS = e.params.pricePNS)),
);
indexer.onEvent({ contract: "Exchange", event: "TakerFeeUpdated" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.takerFeePer100K = e.params.takerFeePer100K)),
);
indexer.onEvent({ contract: "Exchange", event: "MakerFeeUpdated" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.makerFeePer100K = e.params.makerFeePer100K)),
);
indexer.onEvent({ contract: "Exchange", event: "PerpFeeSchedIdSet" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.feeScheduleId = e.params.feeSchedId)),
);
indexer.onEvent({ contract: "Exchange", event: "InitialMarginFractionUpdated" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.initMarginFracHdths = e.params.initMarginFracHdths)),
);
indexer.onEvent(
  { contract: "Exchange", event: "MaintenanceMarginFractionUpdated" },
  ({ event: e, context }) =>
    updateMarket(context, meta(e), e.params.perpId, (x) => void (x.maintMarginFracHdths = e.params.maintMarginFracHdths)),
);
indexer.onEvent({ contract: "Exchange", event: "MaxOpenInterestUpdated" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => void (x.maxOpenInterestLNS = e.params.maxOpenInterestLNS)),
);
indexer.onEvent({ contract: "Exchange", event: "LinkPriceUpdated" }, ({ event: e, context }) =>
  updateMarket(context, meta(e), e.params.perpId, (x) => {
    x.oraclePricePNS = e.params.oraclePricePNS;
    x.oracleTimestamp = e.params.timestamp;
  }),
);

indexer.onEvent({ contract: "Exchange", event: "FundingEventCompleted" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const x = await market(context, p.perpId, m);
  x.lastFundingRatePct100K = p.actualRatePct100k;
  x.lastFundingBlock = Number(p.fundingEventBlock);
  touch(x, m);
  context.Market.set(x);
  // A later event for the same funding block replaces the earlier one (allowOverwrite).
  context.Funding.set({
    id: `${p.perpId}-${p.fundingEventBlock}`,
    market_id: x.id,
    fundingBlock: Number(p.fundingEventBlock),
    specifiedRatePct100K: p.specifiedRatePct100k,
    actualRatePct100K: p.actualRatePct100k,
    fundingPricePNS: p.fundingPricePNS,
    fundingPaymentPNS: p.fundingPaymentPNS,
    fundingSumPNS: p.fundingSumPNS,
    block: m.block,
    blockTime: m.time,
    txHash: m.txHash,
  });
});

// ---------------------------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------------------------

type OrderRequested = {
  perpId: bigint;
  accountId: bigint;
  orderId: bigint;
  orderType: bigint;
  pricePNS: bigint;
  lotLNS: bigint;
  expiryBlock: bigint;
  postOnly: boolean;
  fillOrKill: boolean;
  immediateOrCancel: boolean;
  leverageHdths: bigint;
};

const requested = (c: Ctx, m: Meta, p: OrderRequested) =>
  setOrderContext(c, {
    txHash: m.txHash,
    perpId: p.perpId,
    accountId: p.accountId,
    orderId: p.orderId,
    orderType: orderType(p.orderType),
    pricePNS: p.pricePNS,
    lotLNS: p.lotLNS,
    expiryBlock: p.expiryBlock,
    postOnly: p.postOnly,
    fillOrKill: p.fillOrKill,
    immediateOrCancel: p.immediateOrCancel,
    leverageHdths: p.leverageHdths,
  });

indexer.onEvent({ contract: "Exchange", event: "OrderRequest" }, async ({ event, context }) =>
  requested(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "OrderRequestV2" }, async ({ event, context }) =>
  requested(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "OrderBatchCompleted" }, ({ context }) =>
  clearOrderContext(context),
);

indexer.onEvent({ contract: "Exchange", event: "OrderPlaced" }, async ({ event, context }) => {
  const m = meta(event);
  const ctx = await orderContext(context, m);
  if (!ctx) return;
  const [mk, ac] = [await market(context, ctx.perpId, m), await account(context, ctx.accountId, m)];
  if (ctx.orderType === undefined) throw new Error(`OrderPlaced ${logId(m)}: unknown orderType in OrderRequest`);
  addOpenOrder(context, {
    id: logId(m),
    orderId: Number(event.params.orderId),
    market_id: mk.id,
    account_id: ac.id,
    orderType: ctx.orderType,
    status: "OPEN",
    pricePNS: ctx.pricePNS,
    requestedLotLNS: ctx.lotLNS,
    lotLNS: event.params.lotLNS,
    filledLotLNS: 0n,
    expiryBlock: ctx.expiryBlock,
    postOnly: ctx.postOnly,
    fillOrKill: ctx.fillOrKill,
    immediateOrCancel: ctx.immediateOrCancel,
    leverageHdths: ctx.leverageHdths,
    endReason: undefined,
    createdBlock: m.block,
    createdAt: m.time,
    updatedBlock: m.block,
    updatedAt: m.time,
    txHash: m.txHash,
  });
  await setBalance(context, ctx.accountId, event.params.balanceCNS, m);
});

indexer.onEvent({ contract: "Exchange", event: "OrderChanged" }, async ({ event, context }) => {
  const m = meta(event);
  const ctx = await orderContext(context, m);
  if (!ctx) return;
  const order = await openOrder(context, ctx.perpId, event.params.orderId);
  if (order) {
    order.pricePNS = event.params.pricePNS;
    order.lotLNS = event.params.lotLNS;
    order.expiryBlock = event.params.expiryBlock;
    order.updatedBlock = m.block;
    order.updatedAt = m.time;
    context.Order.set(order);
  }
  await setBalance(context, ctx.accountId, event.params.balanceCNS, m);
});

indexer.onEvent({ contract: "Exchange", event: "OrderCancelled" }, async ({ event, context }) => {
  const m = meta(event);
  const ctx = await orderContext(context, m);
  if (!ctx) return;
  const order = await openOrder(context, ctx.perpId, ctx.orderId);
  if (order) closeOrder(context, order, "CANCELLED", m);
  await setBalance(context, ctx.accountId, event.params.balanceCNS, m);
});

async function clearOrder(c: Ctx, m: Meta, perpId: bigint, orderId: bigint, reason: string) {
  const order = await openOrder(c, perpId, orderId);
  if (order) closeOrder(c, order, "CLEARED", m, reason);
}

const CLEARED = {
  OrderCancelledByAdmin: "CANCELLED_BY_ADMIN",
  OrderCancelledByLiquidator: "CANCELLED_BY_LIQUIDATOR",
  ClearingExpiredOrder: "EXPIRED",
  ClearingFrozenAccountOrder: "FROZEN_ACCOUNT",
  ClearingInvalidCloseOrder: "INVALID_CLOSE_ORDER",
  ClearingSelfMatchingOrder: "SELF_MATCH",
} as const;

for (const [name, reason] of Object.entries(CLEARED) as [keyof typeof CLEARED, string][]) {
  indexer.onEvent({ contract: "Exchange", event: name }, ({ event, context }) =>
    clearOrder(context, meta(event), event.params.perpId, event.params.orderId, reason),
  );
}

// ---------------------------------------------------------------------------------------------
// Fills
// ---------------------------------------------------------------------------------------------

type Builder = { builderId: bigint; builderFeeCNS: bigint };

async function makerFill(
  c: Ctx,
  m: Meta,
  p: { perpId: bigint; accountId: bigint; orderId: bigint; pricePNS: bigint; lotLNS: bigint; feeCNS: bigint; amountCNS: bigint; balanceCNS: bigint },
  builder?: Builder,
) {
  const order = await openOrder(c, p.perpId, p.orderId);
  if (order) {
    order.filledLotLNS += p.lotLNS;
    order.lotLNS = order.lotLNS > p.lotLNS ? order.lotLNS - p.lotLNS : 0n;
    order.updatedBlock = m.block;
    order.updatedAt = m.time;
    if (order.lotLNS === 0n) closeOrder(c, order, "FILLED", m);
    else c.Order.set(order);
  }
  const [mk, ac] = [await market(c, p.perpId, m), await account(c, p.accountId, m)];
  c.Trade.set({
    id: logId(m),
    market_id: mk.id,
    account_id: ac.id,
    order_id: order?.id,
    role: "MAKER",
    pricePNS: p.pricePNS,
    lotLNS: p.lotLNS,
    feeCNS: p.feeCNS,
    amountCNS: p.amountCNS,
    balanceCNS: p.balanceCNS,
    builderId: builder?.builderId,
    builderFeeCNS: builder?.builderFeeCNS,
    block: m.block,
    blockTime: m.time,
    txHash: m.txHash,
  });
  await setBalance(c, p.accountId, p.balanceCNS, m);
}

indexer.onEvent({ contract: "Exchange", event: "MakerOrderFilled" }, ({ event, context }) =>
  makerFill(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "MakerOrderFilledV2" }, ({ event, context }) =>
  makerFill(context, meta(event), event.params, event.params),
);

async function takerFill(
  c: Ctx,
  m: Meta,
  p: { entryPricePNS: bigint; lotLNS: bigint; feeCNS: bigint; amountCNS: bigint; balanceCNS: bigint },
  builder?: Builder,
) {
  const ctx = await orderContext(c, m);
  if (!ctx) return;
  const [mk, ac] = [await market(c, ctx.perpId, m), await account(c, ctx.accountId, m)];
  c.Trade.set({
    id: logId(m),
    market_id: mk.id,
    account_id: ac.id,
    order_id: undefined,
    role: "TAKER",
    pricePNS: p.entryPricePNS,
    lotLNS: p.lotLNS,
    feeCNS: p.feeCNS,
    amountCNS: p.amountCNS,
    balanceCNS: p.balanceCNS,
    builderId: builder?.builderId,
    builderFeeCNS: builder?.builderFeeCNS,
    block: m.block,
    blockTime: m.time,
    txHash: m.txHash,
  });
  await setBalance(c, ctx.accountId, p.balanceCNS, m);
}

indexer.onEvent({ contract: "Exchange", event: "TakerOrderFilled" }, ({ event, context }) =>
  takerFill(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "TakerOrderFilledV2" }, ({ event, context }) =>
  takerFill(context, meta(event), event.params, event.params),
);

// ---------------------------------------------------------------------------------------------
// Positions
// ---------------------------------------------------------------------------------------------

interface Next {
  kind: PositionChange["kind"];
  positionType?: Position["positionType"];
  lotLNS: bigint;
  depositCNS: bigint;
  pricePNS?: bigint;
  deltaPnlCNS?: bigint;
  fundingCNS?: bigint;
  leverageHdths?: bigint;
  opened?: boolean; // (re)opens the position, resetting its lifetime counters
}

/** Records a PositionChange and moves the position to its new state. */
function applyChange(c: Ctx, m: Meta, pos: Mut<Position>, next: Next) {
  c.PositionChange.set({
    id: logId(m),
    position_id: pos.id,
    market_id: pos.market_id,
    account_id: pos.account_id,
    kind: next.kind,
    positionType: next.positionType ?? pos.positionType,
    pricePNS: next.pricePNS,
    lotBeforeLNS: pos.lotLNS,
    lotAfterLNS: next.lotLNS,
    depositBeforeCNS: pos.depositCNS,
    depositAfterCNS: next.depositCNS,
    deltaPnlCNS: next.deltaPnlCNS,
    fundingCNS: next.fundingCNS,
    block: m.block,
    blockTime: m.time,
    txHash: m.txHash,
  });

  if (next.opened) {
    pos.realizedPnlCNS = 0n;
    pos.fundingCNS = 0n;
    pos.openedBlock = m.block;
    pos.openedAt = m.time;
    pos.closedAt = undefined;
  }
  if (next.positionType !== undefined) pos.positionType = next.positionType;
  if (next.leverageHdths !== undefined) pos.leverageHdths = next.leverageHdths;
  if (next.opened || (next.kind === "INVERTED" && next.pricePNS !== undefined)) {
    pos.openPricePNS = next.pricePNS ?? pos.openPricePNS;
  }
  pos.lotLNS = next.lotLNS;
  pos.depositCNS = next.depositCNS;
  pos.realizedPnlCNS += next.deltaPnlCNS ?? 0n;
  pos.fundingCNS += next.fundingCNS ?? 0n;
  pos.status = next.lotLNS === 0n ? "CLOSED" : "OPEN";
  if (pos.status === "CLOSED") pos.closedAt = m.time;
  touch(pos, m);
  c.Position.set(pos);
}

type Opened = { perpId: bigint; accountId: bigint; positionType: bigint; lotLNS: bigint; depositCNS: bigint; pricePNS: bigint; leverageHdths: bigint };
const opened = async (c: Ctx, m: Meta, p: Opened) => {
  const pos = await position(c, p.perpId, p.accountId, m);
  applyChange(c, m, pos, {
    kind: "OPENED",
    positionType: positionType(p.positionType),
    lotLNS: p.lotLNS,
    depositCNS: p.depositCNS,
    pricePNS: p.pricePNS,
    leverageHdths: p.leverageHdths,
    opened: true,
  });
};
indexer.onEvent({ contract: "Exchange", event: "PositionOpened" }, ({ event, context }) =>
  opened(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "PositionOpenedV2" }, ({ event, context }) =>
  opened(context, meta(event), event.params),
);

type Increased = { perpId: bigint; accountId: bigint; positionType: bigint; endLotLNS: bigint; endDepositCNS: bigint; pricePNS: bigint; leverageHdths: bigint };
const increased = async (c: Ctx, m: Meta, p: Increased) => {
  const pos = await position(c, p.perpId, p.accountId, m);
  applyChange(c, m, pos, {
    kind: "INCREASED",
    positionType: positionType(p.positionType),
    lotLNS: p.endLotLNS,
    depositCNS: p.endDepositCNS,
    pricePNS: p.pricePNS,
    leverageHdths: p.leverageHdths,
  });
};
indexer.onEvent({ contract: "Exchange", event: "PositionIncreased" }, ({ event, context }) =>
  increased(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "PositionIncreasedV2" }, ({ event, context }) =>
  increased(context, meta(event), event.params),
);

indexer.onEvent({ contract: "Exchange", event: "PositionDecreased" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const pos = await position(context, p.perpId, p.accountId, m);
  applyChange(context, m, pos, {
    kind: "DECREASED",
    positionType: positionType(p.positionType),
    lotLNS: p.endLotLNS,
    depositCNS: p.endDepositCNS,
    deltaPnlCNS: p.deltaPnlCNS,
    fundingCNS: p.fundingCNS,
  });
});

indexer.onEvent({ contract: "Exchange", event: "PositionClosed" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const pos = await position(context, p.perpId, p.accountId, m);
  applyChange(context, m, pos, {
    kind: "CLOSED",
    positionType: positionType(p.positionType),
    lotLNS: 0n,
    depositCNS: 0n,
    pricePNS: p.pricePNS,
    deltaPnlCNS: p.deltaPnlCNS,
    fundingCNS: p.fundingCNS,
  });
});

indexer.onEvent({ contract: "Exchange", event: "PositionInverted" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const pos = await position(context, p.perpId, p.accountId, m);
  applyChange(context, m, pos, {
    kind: "INVERTED",
    positionType: positionType(p.positionType),
    lotLNS: p.endLotLNS,
    depositCNS: p.endDepositCNS,
    pricePNS: p.pricePNS,
    deltaPnlCNS: p.deltaPnlCNS,
    fundingCNS: p.fundingCNS,
    leverageHdths: p.leverageHdths,
  });
});

indexer.onEvent({ contract: "Exchange", event: "PositionLiquidated" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const pos = await position(context, p.perpId, p.posAccountId, m);
  const remaining = p.posLotLNS > p.liqLotLNS ? p.posLotLNS - p.liqLotLNS : 0n;
  applyChange(context, m, pos, {
    kind: "LIQUIDATED",
    positionType: positionType(p.positionType),
    lotLNS: remaining,
    depositCNS: remaining === 0n ? 0n : p.posDepositCNS,
    pricePNS: p.liqPricePNS,
    deltaPnlCNS: p.deltaPnlCNS,
    fundingCNS: p.fundingCNS,
  });
});

type Deleveraged = {
  perpId: bigint;
  accountId: bigint;
  positionType: bigint;
  endLotLNS: bigint;
  endDepositCNS: bigint;
  deleveragePricePNS: bigint;
  deltaPnlCNS: bigint;
  fundingCNS: bigint;
  balanceCNS: bigint;
};
const deleveraged = async (c: Ctx, m: Meta, p: Deleveraged) => {
  const pos = await position(c, p.perpId, p.accountId, m);
  applyChange(c, m, pos, {
    kind: "DELEVERAGED",
    positionType: positionType(p.positionType),
    lotLNS: p.endLotLNS,
    depositCNS: p.endDepositCNS,
    pricePNS: p.deleveragePricePNS,
    deltaPnlCNS: p.deltaPnlCNS,
    fundingCNS: p.fundingCNS,
  });
  await setBalance(c, p.accountId, p.balanceCNS, m);
};
indexer.onEvent({ contract: "Exchange", event: "PositionDeleveraged" }, ({ event, context }) =>
  deleveraged(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "PositionDeleveragedV2" }, ({ event, context }) =>
  deleveraged(context, meta(event), event.params),
);

type Unwound = { perpId: bigint; accountId: bigint; positionType: bigint; pricePNS: bigint; balanceCNS?: bigint };
const unwound = async (c: Ctx, m: Meta, p: Unwound) => {
  const pos = await position(c, p.perpId, p.accountId, m);
  applyChange(c, m, pos, {
    kind: "UNWOUND",
    positionType: positionType(p.positionType),
    lotLNS: 0n,
    depositCNS: 0n,
    pricePNS: p.pricePNS,
  });
  if (p.balanceCNS !== undefined) await setBalance(c, p.accountId, p.balanceCNS, m);
};
indexer.onEvent({ contract: "Exchange", event: "PositionUnwound" }, ({ event, context }) =>
  unwound(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "PositionUnwoundV2" }, ({ event, context }) =>
  unwound(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "PositionUnwoundWithoutPayment" }, ({ event, context }) =>
  unwound(context, meta(event), event.params),
);
indexer.onEvent({ contract: "Exchange", event: "PositionUnwoundWithoutPaymentV2" }, ({ event, context }) =>
  unwound(context, meta(event), event.params),
);

indexer.onEvent({ contract: "Exchange", event: "IncreasePositionCollateral" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const pos = await position(context, p.perpId, p.accountId, m);
  applyChange(context, m, pos, {
    kind: "COLLATERAL_INCREASED",
    lotLNS: pos.lotLNS,
    depositCNS: p.positionDepositCNS,
  });
  await setBalance(context, p.accountId, p.balanceCNS, m);
});

indexer.onEvent({ contract: "Exchange", event: "PositionCollateralDecreased" }, async ({ event, context }) => {
  const m = meta(event);
  const p = event.params;
  const pos = await position(context, p.perpId, p.accountId, m);
  applyChange(context, m, pos, {
    kind: "COLLATERAL_DECREASED",
    positionType: positionType(p.positionType),
    lotLNS: pos.lotLNS,
    depositCNS: p.endDepositCNS,
  });
  await setBalance(context, p.accountId, p.balanceCNS, m);
});
