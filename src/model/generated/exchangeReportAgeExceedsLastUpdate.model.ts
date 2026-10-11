import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeReportAgeExceedsLastUpdate {
    constructor(props?: Partial<ExchangeReportAgeExceedsLastUpdate>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_report_age_exceeds_last_update_block_b08d80ab")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_report_age_exceeds_last_update_block_time_b84acaf0")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_report_age_exceeds_last_update_perp_id_304dcb0b")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    lastUpdateTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    reportValidFromTimestamp!: bigint
}
