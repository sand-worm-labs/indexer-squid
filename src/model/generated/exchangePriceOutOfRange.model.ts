import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePriceOutOfRange {
    constructor(props?: Partial<ExchangePriceOutOfRange>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_price_out_of_range_block_544937f8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_price_out_of_range_block_time_6433606d")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    minPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    maxPricePNS!: bigint
}
