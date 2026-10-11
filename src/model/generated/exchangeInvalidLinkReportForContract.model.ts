import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInvalidLinkReportForContract {
    constructor(props?: Partial<ExchangeInvalidLinkReportForContract>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_invalid_link_report_for_contract_block_bd1a0ce6")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_invalid_link_report_for_contract_block_ti_d1e2ba1b")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_invalid_link_report_for_contract_perp_id_c239a185")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @StringColumn_({nullable: false})
    perpFeedId!: string

    @StringColumn_({nullable: false})
    reportFeedId!: string
}
