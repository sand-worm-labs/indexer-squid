import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeContractLinkFeedUpdated {
    constructor(props?: Partial<ExchangeContractLinkFeedUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_contract_link_feed_updated_block_b5a6bb7b")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_contract_link_feed_updated_block_time_33d7fda7")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_contract_link_feed_updated_perp_id_0b517cbe")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @StringColumn_({nullable: false})
    feedId!: string
}
