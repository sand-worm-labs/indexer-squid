import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMarkPriceAgeExceedsMax {
    constructor(props?: Partial<ExchangeMarkPriceAgeExceedsMax>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_mark_price_age_exceeds_max_block_e2da4516")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_mark_price_age_exceeds_max_block_time_e1d417a5")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_mark_price_age_exceeds_max_perp_id_f410909c")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    markTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @BigIntColumn_({nullable: false})
    maxAgeSec!: bigint
}
