import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeExceedsLastExecutionBlock {
    constructor(props?: Partial<ExchangeExceedsLastExecutionBlock>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_exceeds_last_execution_block_block_9be5a7b6")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_exceeds_last_execution_block_block_time_e8216686")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    lastExecutionBlock!: bigint
}
