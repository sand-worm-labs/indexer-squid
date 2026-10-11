import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeWrongAccountForOrder {
    constructor(props?: Partial<ExchangeWrongAccountForOrder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_wrong_account_for_order_block_85087554")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_wrong_account_for_order_block_time_1ff31480")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_wrong_account_for_order_perp_id_60d0dcd7")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @Index_("idx_exchange_wrong_account_for_order_account_id_02654091")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
