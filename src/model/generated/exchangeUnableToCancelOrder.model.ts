import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnableToCancelOrder {
    constructor(props?: Partial<ExchangeUnableToCancelOrder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unable_to_cancel_order_block_34abe317")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unable_to_cancel_order_block_time_8de35e57")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unable_to_cancel_order_perp_id_aec5d29d")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint
}
