import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFundingClampPctUpdated {
    constructor(props?: Partial<ExchangeFundingClampPctUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_funding_clamp_pct_updated_block_4f9e6ca6")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_funding_clamp_pct_updated_block_time_d066fff6")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_funding_clamp_pct_updated_perp_id_12c5f88f")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    clampPctPer100k!: bigint
}
