import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderDoesNotExist {
    constructor(props?: Partial<ExchangeOrderDoesNotExist>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_does_not_exist_block_1aae7ae3")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_does_not_exist_block_time_4d08c8c7")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_does_not_exist_perp_id_49a8e9c1")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint
}
