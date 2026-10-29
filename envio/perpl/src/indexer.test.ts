import { describe, it } from "vitest";
import { createTestIndexer } from "envio";

const TX_A = "0x" + "a".repeat(64);
const TX_B = "0x" + "b".repeat(64);

const request = (orderId: bigint, perpId = 16n, accountId = 7n) => ({
  contract: "Exchange" as const,
  event: "OrderRequestV2" as const,
  transaction: { hash: TX_A },
  params: {
    perpId,
    accountId,
    orderDescId: 1n,
    orderId,
    orderType: 0n,
    pricePNS: 1000n,
    lotLNS: 50n,
    expiryBlock: 0n,
    postOnly: false,
    fillOrKill: false,
    immediateOrCancel: false,
    maxMatches: 0n,
    leverageHdths: 500n,
    lastExecutionBlock: 0n,
    amountCNS: 0n,
    maxNegPnlCollatBPS: 0n,
    gasLeft: 0n,
    extension: "0x",
  },
});

describe("order lifecycle", () => {
  it("places, fills and reuses an order id", async (t) => {
    const indexer = createTestIndexer();
    await indexer.process({
      chains: {
        143: {
          simulate: [
            request(3n),
            {
              contract: "Exchange",
              event: "OrderPlaced",
              transaction: { hash: TX_A },
              params: { orderId: 3n, lotLNS: 50n, lockedBalanceCNS: 0n, amountCNS: 0n, balanceCNS: 900n },
            },
          ],
        },
      },
    });
    const orders = await indexer.Order.getAll();
    t.expect(orders).toHaveLength(1);
    const first = orders[0]!;
    t.expect(first.status).toBe("OPEN");
    t.expect(first.market_id).toBe("16");
    t.expect(first.account_id).toBe("7");
    t.expect(first.requestedLotLNS).toBe(50n);
    t.expect((await indexer.Account.getOrThrow("7")).balanceCNS).toBe(900n);
    // the market did not exist yet, so a placeholder was created
    t.expect((await indexer.Market.getOrThrow("16")).name).toBe("perp-16");

    // a maker fill in another transaction for the whole lot closes it
    await indexer.process({
      chains: {
        143: {
          simulate: [
            {
              contract: "Exchange",
              event: "MakerOrderFilledV2",
              transaction: { hash: TX_B },
              params: {
                perpId: 16n,
                accountId: 7n,
                orderId: 3n,
                pricePNS: 1000n,
                lotLNS: 50n,
                feeCNS: 1n,
                lockedBalanceCNS: 0n,
                amountCNS: 5n,
                balanceCNS: 800n,
                builderId: 0n,
                builderFeeCNS: 0n,
              },
            },
          ],
        },
      },
    });
    const filled = await indexer.Order.getOrThrow(first.id);
    t.expect(filled.status).toBe("FILLED");
    t.expect(filled.lotLNS).toBe(0n);
    t.expect(filled.filledLotLNS).toBe(50n);
    t.expect(await indexer.OpenOrderRef.get("16-3")).toBeUndefined();
    const trades = await indexer.Trade.getAll();
    t.expect(trades).toHaveLength(1);
    t.expect(trades[0]!.order_id).toBe(first.id);
    t.expect(trades[0]!.role).toBe("MAKER");

    // the id is reused by a new order, which gets its own row
    await indexer.process({
      chains: {
        143: {
          simulate: [
            request(3n),
            {
              contract: "Exchange",
              event: "OrderPlaced",
              transaction: { hash: TX_A },
              params: { orderId: 3n, lotLNS: 20n, lockedBalanceCNS: 0n, amountCNS: 0n, balanceCNS: 700n },
            },
          ],
        },
      },
    });
    const all = await indexer.Order.getAll();
    t.expect(all).toHaveLength(2);
    const second = all.find((o) => o.id !== first.id)!;
    t.expect(second.status).toBe("OPEN");
    t.expect((await indexer.OpenOrderRef.getOrThrow("16-3")).order_id).toBe(second.id);
  });

  it("ignores order events outside the requesting transaction", async (t) => {
    const indexer = createTestIndexer();
    await indexer.process({
      chains: {
        143: {
          simulate: [
            request(4n),
            {
              contract: "Exchange",
              event: "OrderPlaced",
              transaction: { hash: TX_B },
              params: { orderId: 4n, lotLNS: 50n, lockedBalanceCNS: 0n, amountCNS: 0n, balanceCNS: 900n },
            },
          ],
        },
      },
    });
    t.expect(await indexer.Order.getAll()).toHaveLength(0);
  });
});

describe("positions", () => {
  it("opens, inverts and closes a position", async (t) => {
    const indexer = createTestIndexer();
    const base = { perpId: 16n, accountId: 7n, pnlCollateralizedCNS: 0n, insFeeCNS: 0n, protFeeCNS: 0n };
    await indexer.process({
      chains: {
        143: {
          simulate: [
            {
              contract: "Exchange",
              event: "PositionOpenedV2",
              params: { ...base, positionType: 0n, leverageHdths: 200n, depositCNS: 100n, pricePNS: 10n, lotLNS: 5n, priceResiduePNSQ16: 0n },
            },
            {
              contract: "Exchange",
              event: "PositionInverted",
              params: {
                ...base,
                positionType: 1n,
                leverageHdths: 300n,
                startDepositCNS: 100n,
                endDepositCNS: 40n,
                pricePNS: 12n,
                startLotLNS: 5n,
                endLotLNS: 2n,
                deltaPnlCNS: 7n,
                fundingCNS: -1n,
              },
            },
            {
              contract: "Exchange",
              event: "PositionClosed",
              params: { perpId: 16n, accountId: 7n, positionType: 1n, pricePNS: 11n, deltaPnlCNS: 3n, fundingCNS: -2n },
            },
          ],
        },
      },
    });
    const pos = await indexer.Position.getOrThrow("16-7");
    t.expect(pos.status).toBe("CLOSED");
    t.expect(pos.positionType).toBe("SHORT");
    t.expect(pos.openPricePNS).toBe(12n);
    t.expect(pos.realizedPnlCNS).toBe(10n);
    t.expect(pos.fundingCNS).toBe(-3n);
    t.expect(pos.leverageHdths).toBe(300n);
    t.expect(pos.closedAt).toBeInstanceOf(Date);
    const changes = (await indexer.PositionChange.getAll()).map((c) => c.kind).sort();
    t.expect(changes).toEqual(["CLOSED", "INVERTED", "OPENED"]);
  });
});
