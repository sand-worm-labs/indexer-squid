import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindInitialized {
    constructor(props?: Partial<ExchangeUnwindInitialized>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_initialized_block_5b6637d5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_initialized_block_time_9a3f772b")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_initialized_perp_id_60666674")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    sumPositiveFmvCNS!: bigint
}
