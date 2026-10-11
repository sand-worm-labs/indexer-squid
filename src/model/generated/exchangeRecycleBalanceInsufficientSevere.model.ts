import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeRecycleBalanceInsufficientSevere {
    constructor(props?: Partial<ExchangeRecycleBalanceInsufficientSevere>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_recycle_balance_insufficient_severe_block_c2437d59")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_recycle_balance_insufficient_severe_block_beeec99b")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_recycle_balance_insufficient_severe_accou_50cd0cad")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @Index_("idx_exchange_recycle_balance_insufficient_severe_perp__6e744866")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    recycleFeeCNS!: bigint

    @BigIntColumn_({nullable: false})
    recycleBalanceCNS!: bigint
}
