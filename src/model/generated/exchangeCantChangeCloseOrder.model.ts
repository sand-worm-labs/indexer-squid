import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCantChangeCloseOrder {
    constructor(props?: Partial<ExchangeCantChangeCloseOrder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_cant_change_close_order_block_6aa3ec18")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_cant_change_close_order_block_time_1c0fac9e")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_cant_change_close_order_perp_id_0996f473")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @Index_("idx_exchange_cant_change_close_order_account_id_e559a153")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
