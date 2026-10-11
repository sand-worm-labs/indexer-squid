import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePriceMaxAgeUpdated {
    constructor(props?: Partial<ExchangePriceMaxAgeUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_price_max_age_updated_block_b7d2e363")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_price_max_age_updated_block_time_e967c607")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_price_max_age_updated_perp_id_eb5348c0")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    maxAgeSec!: bigint
}
