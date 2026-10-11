import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFundingPriceExceedsTol {
    constructor(props?: Partial<ExchangeFundingPriceExceedsTol>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_funding_price_exceeds_tol_block_b44e9b8a")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_funding_price_exceeds_tol_block_time_74461e95")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_funding_price_exceeds_tol_perp_id_6e88f1f4")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    fundingPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    oraclePNS!: bigint

    @BigIntColumn_({nullable: false})
    tolerancePer100k!: bigint
}
