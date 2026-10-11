import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeClearingSelfMatchingOrder {
    constructor(props?: Partial<ExchangeClearingSelfMatchingOrder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_clearing_self_matching_order_block_5cc4362f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_clearing_self_matching_order_block_time_24eeb4ac")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_clearing_self_matching_order_perp_id_cf4edb74")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_clearing_self_matching_order_account_id_a64af779")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    recyclerAccountId!: bigint

    @BigIntColumn_({nullable: false})
    recyclerAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    recyclerBalanceCNS!: bigint
}
