import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeClearingFrozenAccountOrder {
    constructor(props?: Partial<ExchangeClearingFrozenAccountOrder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_clearing_frozen_account_order_block_9f0b8940")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_clearing_frozen_account_order_block_time_143aa68a")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_clearing_frozen_account_order_perp_id_079de379")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_clearing_frozen_account_order_account_id_347f6f8e")
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
