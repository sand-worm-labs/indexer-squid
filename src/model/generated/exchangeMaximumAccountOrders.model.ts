import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMaximumAccountOrders {
    constructor(props?: Partial<ExchangeMaximumAccountOrders>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_maximum_account_orders_block_ca61089d")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_maximum_account_orders_block_time_bdc5c776")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_maximum_account_orders_perp_id_44c1af61")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_maximum_account_orders_account_id_de1d67ed")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
