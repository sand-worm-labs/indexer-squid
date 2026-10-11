import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindPreparationCleared {
    constructor(props?: Partial<ExchangeUnwindPreparationCleared>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_preparation_cleared_block_49991492")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_preparation_cleared_block_time_cb9d32ac")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_preparation_cleared_perp_id_cabd6895")
    @BigIntColumn_({nullable: false})
    perpId!: bigint
}
