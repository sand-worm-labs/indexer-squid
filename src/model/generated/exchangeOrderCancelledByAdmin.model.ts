import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderCancelledByAdmin {
    constructor(props?: Partial<ExchangeOrderCancelledByAdmin>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_cancelled_by_admin_block_4de280d8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_cancelled_by_admin_block_time_3b623641")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_cancelled_by_admin_perp_id_a7e80857")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_order_cancelled_by_admin_account_id_604df8ad")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint
}
