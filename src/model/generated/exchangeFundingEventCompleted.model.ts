import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFundingEventCompleted {
    constructor(props?: Partial<ExchangeFundingEventCompleted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_funding_event_completed_block_273c20f8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_funding_event_completed_block_time_939d1484")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_funding_event_completed_perp_id_a6042019")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    fundingEventBlock!: bigint

    @BigIntColumn_({nullable: false})
    specifiedRatePct100k!: bigint

    @BigIntColumn_({nullable: false})
    actualRatePct100k!: bigint

    @BigIntColumn_({nullable: false})
    fundingPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingPaymentPNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingSumPNS!: bigint

    @BooleanColumn_({nullable: false})
    allowOverwrite!: boolean
}
