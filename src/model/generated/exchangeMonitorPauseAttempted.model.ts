import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMonitorPauseAttempted {
    constructor(props?: Partial<ExchangeMonitorPauseAttempted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_monitor_pause_attempted_block_f93f2491")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_monitor_pause_attempted_block_time_634db0a3")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_monitor_pause_attempted_perp_id_5b1975f3")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    actualStatus!: bigint

    @BooleanColumn_({nullable: false})
    transitioned!: boolean
}
