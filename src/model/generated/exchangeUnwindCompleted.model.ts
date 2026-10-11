import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindCompleted {
    constructor(props?: Partial<ExchangeUnwindCompleted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_completed_block_5ea02266")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_completed_block_time_10fe2037")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_completed_perp_id_a7c85c6a")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    positionsUnwound!: bigint

    @BigIntColumn_({nullable: false})
    perpPositionBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    insuranceBalanceCNS!: bigint
}
