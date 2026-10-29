// Port of indexers/usdc/src/main.ts: every Transfer, plus a running balance and transfer counts per holder.
import { indexer } from "envio";
import type { EvmOnEventContext } from "envio";

const ZERO = "0x0000000000000000000000000000000000000000";

async function bump(context: EvmOnEventContext, address: string, delta: bigint, incoming: boolean) {
  const h = (await context.Holder.get(address)) ?? { id: address, balance: 0n, transfersIn: 0, transfersOut: 0 };
  context.Holder.set({
    ...h,
    balance: h.balance + delta,
    transfersIn: h.transfersIn + (incoming ? 1 : 0),
    transfersOut: h.transfersOut + (incoming ? 0 : 1),
  });
}

indexer.onEvent({ contract: "ERC20", event: "Transfer" }, async ({ event, context }) => {
  const from = event.params.from.toLowerCase();
  const to = event.params.to.toLowerCase();
  const value = event.params.value;
  context.Transfer.set({
    id: `${event.block.number}-${event.logIndex}`,
    block: event.block.number,
    blockTime: new Date(event.block.timestamp * 1000),
    txHash: event.transaction.hash,
    from,
    to,
    value,
  });
  if (from !== ZERO) await bump(context, from, -value, false);
  if (to !== ZERO) await bump(context, to, value, true);
});
