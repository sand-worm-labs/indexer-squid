import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindInsufficientBalance {
    constructor(props?: Partial<ExchangeUnwindInsufficientBalance>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_insufficient_balance_block_c7a070f1")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_insufficient_balance_block_time_c8ba45f3")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_insufficient_balance_perp_id_4b825235")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_unwind_insufficient_balance_account_id_97bfd2ca")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    perpPositionBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    paymentCNS!: bigint
}
