import { describe, it } from "vitest";
import { createTestIndexer } from "envio";

const A = "0x00000000000000000000000000000000000000aa";
const B = "0x00000000000000000000000000000000000000bb";
const ZERO = "0x0000000000000000000000000000000000000000";

describe("ERC20 transfers", () => {
  it("records transfers and running balances; mints and burns skip the zero address", async (t) => {
    const indexer = createTestIndexer();
    const transfer = (from: string, to: string, value: bigint) => ({
      contract: "ERC20" as const,
      event: "Transfer" as const,
      params: { from: from as `0x${string}`, to: to as `0x${string}`, value },
    });
    await indexer.process({
      chains: { 143: { simulate: [transfer(ZERO, A, 100n), transfer(A, B, 30n), transfer(B, ZERO, 5n)] } },
    });
    t.expect(await indexer.Transfer.getAll()).toHaveLength(3);
    t.expect(await indexer.Holder.get(ZERO)).toBeUndefined();
    t.expect(await indexer.Holder.getOrThrow(A)).toMatchObject({ id: A, balance: 70n, transfersIn: 1, transfersOut: 1 });
    t.expect(await indexer.Holder.getOrThrow(B)).toMatchObject({ id: B, balance: 25n, transfersIn: 1, transfersOut: 1 });
  });
});
