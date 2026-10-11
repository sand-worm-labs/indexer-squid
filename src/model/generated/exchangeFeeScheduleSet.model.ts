import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFeeScheduleSet {
    constructor(props?: Partial<ExchangeFeeScheduleSet>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_fee_schedule_set_block_b637d329")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_fee_schedule_set_block_time_045dc3c1")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    feeSchedId!: bigint

    @StringColumn_({array: true, nullable: false})
    takerFeesPer100K!: (string)[]

    @StringColumn_({array: true, nullable: false})
    makerFeesPer100K!: (string)[]
}
