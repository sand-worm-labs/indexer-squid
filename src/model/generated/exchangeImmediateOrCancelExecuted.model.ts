import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeImmediateOrCancelExecuted {
    constructor(props?: Partial<ExchangeImmediateOrCancelExecuted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_immediate_or_cancel_executed_block_33b4f244")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_immediate_or_cancel_executed_block_time_3cdb5bfa")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    unmatchedLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    totalLotLNS!: bigint
}
