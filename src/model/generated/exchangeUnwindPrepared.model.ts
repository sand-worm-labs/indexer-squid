import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindPrepared {
    constructor(props?: Partial<ExchangeUnwindPrepared>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_prepared_block_d2397cda")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_prepared_block_time_b180f245")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_prepared_perp_id_d5bed390")
    @BigIntColumn_({nullable: false})
    perpId!: bigint
}
