import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLinkDsErrorLowLevel {
    constructor(props?: Partial<ExchangeLinkDsErrorLowLevel>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_link_ds_error_low_level_block_1baee049")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_link_ds_error_low_level_block_time_537411a1")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_link_ds_error_low_level_perp_id_d0983616")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @StringColumn_({nullable: false})
    lowLevelData!: string
}
