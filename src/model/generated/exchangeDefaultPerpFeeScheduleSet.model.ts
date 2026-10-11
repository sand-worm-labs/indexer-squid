import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeDefaultPerpFeeScheduleSet {
    constructor(props?: Partial<ExchangeDefaultPerpFeeScheduleSet>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_default_perp_fee_schedule_set_block_da01516d")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_default_perp_fee_schedule_set_block_time_575c561e")
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
