import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFeeUnitRedenominated {
    constructor(props?: Partial<ExchangeFeeUnitRedenominated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_fee_unit_redenominated_block_518ad3fa")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_fee_unit_redenominated_block_time_c6bfae92")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    oldDenominator!: bigint

    @BigIntColumn_({nullable: false})
    newDenominator!: bigint

    @BigIntColumn_({nullable: false})
    unitScale!: bigint

    @BigIntColumn_({nullable: false})
    rateDiv!: bigint

    @BigIntColumn_({nullable: false})
    migratedScheduleCount!: bigint
}
