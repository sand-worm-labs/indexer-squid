import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCloseOrderExceedsPosition {
    constructor(props?: Partial<ExchangeCloseOrderExceedsPosition>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_close_order_exceeds_position_block_3709a6a5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_close_order_exceeds_position_block_time_c713d6fc")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    posLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    orderLotLNS!: bigint
}
