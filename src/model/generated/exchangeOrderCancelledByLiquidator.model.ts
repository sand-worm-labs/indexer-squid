import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderCancelledByLiquidator {
    constructor(props?: Partial<ExchangeOrderCancelledByLiquidator>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_cancelled_by_liquidator_block_53960e7c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_cancelled_by_liquidator_block_time_76e20acc")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_cancelled_by_liquidator_perp_id_0237f582")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_order_cancelled_by_liquidator_account_id_2af83e9d")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint
}
