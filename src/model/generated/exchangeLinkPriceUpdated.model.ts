import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLinkPriceUpdated {
    constructor(props?: Partial<ExchangeLinkPriceUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_link_price_updated_block_08e5416c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_link_price_updated_block_time_41afb1cc")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_link_price_updated_perp_id_9cd1adf4")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    oraclePricePNS!: bigint

    @BigIntColumn_({nullable: false})
    timestamp!: bigint
}
