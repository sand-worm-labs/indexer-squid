import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMaxOpenInterestUpdated {
    constructor(props?: Partial<ExchangeMaxOpenInterestUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_max_open_interest_updated_block_886748f0")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_max_open_interest_updated_block_time_6e39057d")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_max_open_interest_updated_perp_id_dc29d3f8")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    maxOpenInterestLNS!: bigint
}
