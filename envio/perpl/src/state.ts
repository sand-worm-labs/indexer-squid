// Entity helpers shared by the handlers. Ported from indexers/perpl/src/state.ts.
//
// The squid keeps a per-batch entity cache and flushes it at the end of the batch. HyperIndex already does
// that (entities live in memory for the batch and are written in one go), so these helpers only do the
// get-or-create part. Entities from context.X.get() are read-only, so every helper returns a mutable copy
// and the caller writes it back with context.X.set().
import type {
  Account,
  EvmOnEventContext,
  Market,
  Order,
  Position,
  TxOrderContext,
} from "envio";

export type Ctx = EvmOnEventContext;
export type Mut<T> = { -readonly [K in keyof T]: T[K] };

// Where a log came from.
export interface Meta {
  block: number;
  time: Date;
  txHash: string;
  logIndex: number;
}

export const meta = (event: {
  block: { number: number; timestamp: number };
  transaction: { hash: string };
  logIndex: number;
}): Meta => ({
  block: event.block.number,
  time: new Date(event.block.timestamp * 1000),
  txHash: event.transaction.hash,
  logIndex: event.logIndex,
});

// Same id the squid gives trades, position changes, transfers and orders.
export const logId = (m: Meta) => `${m.block}-${m.logIndex}`;

export const INT4_MAX = 2147483647n;

export const positionType = (n: bigint) => (n === 0n ? "LONG" : "SHORT") as Position["positionType"];

const ORDER_TYPES = ["OPEN_LONG", "OPEN_SHORT", "CLOSE_LONG", "CLOSE_SHORT"] as const;
export const orderType = (n: bigint): Order["orderType"] | undefined => ORDER_TYPES[Number(n)];

export function touch<T extends { updatedBlock: number; updatedAt: Date }>(e: Mut<T>, m: Meta) {
  e.updatedBlock = m.block;
  e.updatedAt = m.time;
}

/** The market, or a placeholder (saved right away) if an event arrives before its ContractAdded. */
export async function market(c: Ctx, perpId: bigint, m: Meta): Promise<Mut<Market>> {
  const id = perpId.toString();
  const found = await c.Market.get(id);
  if (found) return { ...found };
  const created: Market = {
    id,
    perpId: Number(perpId),
    name: `perp-${id}`,
    symbol: `perp-${id}`,
    status: 0,
    paused: false,
    removed: false,
    basePricePNS: 0n,
    priceDecimals: 0,
    lotDecimals: 0,
    initMarginFracHdths: 0n,
    maintMarginFracHdths: 0n,
    maxOpenInterestLNS: 0n,
    feeScheduleId: undefined,
    takerFeePer100K: undefined,
    makerFeePer100K: undefined,
    markPricePNS: undefined,
    oraclePricePNS: undefined,
    oracleTimestamp: undefined,
    lastFundingRatePct100K: undefined,
    lastFundingBlock: undefined,
    createdBlock: m.block,
    createdAt: m.time,
    updatedBlock: m.block,
    updatedAt: m.time,
  };
  c.Market.set(created);
  return { ...created };
}

/** The account, created (and saved) with a zero balance if it doesn't exist yet. */
export async function account(c: Ctx, accountId: bigint, m: Meta): Promise<Mut<Account>> {
  const id = accountId.toString();
  const found = await c.Account.get(id);
  if (found) return { ...found };
  const created: Account = {
    id,
    accountId,
    address: undefined,
    balanceCNS: 0n,
    totalDepositedCNS: 0n,
    totalWithdrawnCNS: 0n,
    frozenStatus: 0,
    createdBlock: m.block,
    createdAt: m.time,
    updatedBlock: m.block,
    updatedAt: m.time,
  };
  c.Account.set(created);
  return { ...created };
}

export async function setBalance(c: Ctx, accountId: bigint, balanceCNS: bigint, m: Meta) {
  const a = await account(c, accountId, m);
  a.balanceCNS = balanceCNS;
  touch(a, m);
  c.Account.set(a);
}

/** The position row for (market, account); a closed, empty one if it doesn't exist yet. The caller saves it. */
export async function position(c: Ctx, perpId: bigint, accountId: bigint, m: Meta): Promise<Mut<Position>> {
  const id = `${perpId}-${accountId}`;
  const found = await c.Position.get(id);
  if (found) return { ...found };
  const [mk, ac] = [await market(c, perpId, m), await account(c, accountId, m)];
  return {
    id,
    market_id: mk.id,
    account_id: ac.id,
    positionType: "LONG",
    status: "CLOSED",
    lotLNS: 0n,
    depositCNS: 0n,
    leverageHdths: undefined,
    openPricePNS: 0n,
    realizedPnlCNS: 0n,
    fundingCNS: 0n,
    openedBlock: m.block,
    openedAt: m.time,
    closedAt: undefined,
    updatedBlock: m.block,
    updatedAt: m.time,
  };
}

// ---------------------------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------------------------

const refId = (perpId: bigint | string, orderId: bigint | number) => `${perpId}-${orderId}`;

/** The OPEN order with this (perpId, orderId), if any. Order ids are reused, so this is never a plain id lookup. */
export async function openOrder(c: Ctx, perpId: bigint, orderId: bigint): Promise<Mut<Order> | undefined> {
  if (orderId > INT4_MAX) return undefined; // the squid's order_id column is int4; larger ids never match
  const ref = await c.OpenOrderRef.get(refId(perpId, orderId));
  if (!ref) return undefined;
  const order = await c.Order.get(ref.order_id);
  return order && order.status === "OPEN" ? { ...order } : undefined;
}

export function addOpenOrder(c: Ctx, order: Order) {
  c.Order.set(order);
  c.OpenOrderRef.set({ id: refId(order.market_id, order.orderId), order_id: order.id });
}

export function closeOrder(c: Ctx, order: Mut<Order>, status: Order["status"], m: Meta, reason?: string) {
  order.status = status;
  order.endReason = reason;
  order.updatedBlock = m.block;
  order.updatedAt = m.time;
  c.Order.set(order);
  c.OpenOrderRef.deleteUnsafe(refId(order.market_id, order.orderId));
}

// ---------------------------------------------------------------------------------------------
// Order context: the OrderRequest that started the current transaction
// ---------------------------------------------------------------------------------------------

const CONTEXT_ID = "current";

// During the preload phase handlers run concurrently and entity writes are skipped, so the stored context
// still holds the previous batch's value. This hint (the last OrderRequest seen in preload) only lets the
// preload phase load the right markets, accounts and orders; results always come from the stored context.
let preloadHint: TxOrderContext | undefined;

export function setOrderContext(c: Ctx, value: Omit<TxOrderContext, "id" | "active">) {
  const row: TxOrderContext = { id: CONTEXT_ID, active: true, ...value };
  if (c.isPreload) preloadHint = row;
  else c.TxOrderContext.set(row);
}

export async function clearOrderContext(c: Ctx) {
  if (c.isPreload) {
    preloadHint = undefined;
    return;
  }
  const cur = await c.TxOrderContext.get(CONTEXT_ID);
  if (cur?.active) c.TxOrderContext.set({ ...cur, active: false });
}

/** The context, only inside the transaction that produced it and before its OrderBatchCompleted. */
export async function orderContext(c: Ctx, m: Meta): Promise<TxOrderContext | undefined> {
  const cur = c.isPreload ? preloadHint : await c.TxOrderContext.get(CONTEXT_ID);
  return cur && cur.active && cur.txHash === m.txHash ? cur : undefined;
}
