import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLinkDatastreamConfigured {
    constructor(props?: Partial<ExchangeLinkDatastreamConfigured>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_link_datastream_configured_block_cedfea78")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_link_datastream_configured_block_time_fef0fe0f")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    verifierProxy!: string
}
