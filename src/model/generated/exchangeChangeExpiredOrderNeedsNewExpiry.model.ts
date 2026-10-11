import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeChangeExpiredOrderNeedsNewExpiry {
    constructor(props?: Partial<ExchangeChangeExpiredOrderNeedsNewExpiry>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_change_expired_order_needs_new_expiry_blo_94aa49cc")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_change_expired_order_needs_new_expiry_blo_9cf82a6e")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_change_expired_order_needs_new_expiry_per_f42206d5")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @Index_("idx_exchange_change_expired_order_needs_new_expiry_acc_49ca9de1")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    expiryBlock!: bigint
}
