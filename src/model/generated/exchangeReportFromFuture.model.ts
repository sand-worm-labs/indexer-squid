import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeReportFromFuture {
    constructor(props?: Partial<ExchangeReportFromFuture>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_report_from_future_block_d0cd819c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_report_from_future_block_time_98d14e97")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_report_from_future_perp_id_1baf9068")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    reportTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    blockTimestamp!: bigint
}
