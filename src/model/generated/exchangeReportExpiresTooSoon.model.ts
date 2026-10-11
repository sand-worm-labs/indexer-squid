import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeReportExpiresTooSoon {
    constructor(props?: Partial<ExchangeReportExpiresTooSoon>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_report_expires_too_soon_block_1ef7b2b7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_report_expires_too_soon_block_time_93e6d54f")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_report_expires_too_soon_perp_id_f961027f")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    expiresAt!: bigint

    @BigIntColumn_({nullable: false})
    minRequired!: bigint
}
