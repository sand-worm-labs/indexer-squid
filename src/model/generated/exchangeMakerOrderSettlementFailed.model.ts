import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMakerOrderSettlementFailed {
    constructor(props?: Partial<ExchangeMakerOrderSettlementFailed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_maker_order_settlement_failed_block_c4b41a4c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_maker_order_settlement_failed_block_time_a9477015")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_maker_order_settlement_failed_perp_id_ddac5d6e")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_maker_order_settlement_failed_account_id_3271d75e")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    orderType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    maxNegPnlCollatBPS!: bigint

    @BigIntColumn_({nullable: false})
    reason!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    recyclerAccountId!: bigint

    @BigIntColumn_({nullable: false})
    recyclerAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    recyclerBalanceCNS!: bigint
}
