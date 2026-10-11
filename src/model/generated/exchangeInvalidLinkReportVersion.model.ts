import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInvalidLinkReportVersion {
    constructor(props?: Partial<ExchangeInvalidLinkReportVersion>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_invalid_link_report_version_block_fed2d683")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_invalid_link_report_version_block_time_d3e5c695")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_invalid_link_report_version_perp_id_ebd88986")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    reportVersion!: bigint
}
