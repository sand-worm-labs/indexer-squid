import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCloseOrderPositionMismatch {
    constructor(props?: Partial<ExchangeCloseOrderPositionMismatch>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_close_order_position_mismatch_block_b3b32f90")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_close_order_position_mismatch_block_time_8a4ea0d1")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    orderType!: bigint
}
