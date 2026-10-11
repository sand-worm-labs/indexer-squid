import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFeeScheduleMigrated {
    constructor(props?: Partial<ExchangeFeeScheduleMigrated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_fee_schedule_migrated_block_2c1a1b5b")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_fee_schedule_migrated_block_time_287fd483")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    feeSchedId!: bigint

    @StringColumn_({array: true, nullable: false})
    oldTakerFees!: (string)[]

    @StringColumn_({array: true, nullable: false})
    oldMakerFees!: (string)[]

    @StringColumn_({array: true, nullable: false})
    newTakerFees!: (string)[]

    @StringColumn_({array: true, nullable: false})
    newMakerFees!: (string)[]
}
