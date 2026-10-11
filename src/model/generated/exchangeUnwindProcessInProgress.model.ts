import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindProcessInProgress {
    constructor(props?: Partial<ExchangeUnwindProcessInProgress>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_process_in_progress_block_c766784a")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_process_in_progress_block_time_0b6230ca")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_process_in_progress_perp_id_d3471e80")
    @BigIntColumn_({nullable: false})
    perpId!: bigint
}
