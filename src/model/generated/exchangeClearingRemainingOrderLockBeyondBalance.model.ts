import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeClearingRemainingOrderLockBeyondBalance {
    constructor(props?: Partial<ExchangeClearingRemainingOrderLockBeyondBalance>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_clearing_remaining_order_lock_beyond_bala_b729db33")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_clearing_remaining_order_lock_beyond_bala_b72c2fcc")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_clearing_remaining_order_lock_beyond_bala_b3a6e4a5")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_clearing_remaining_order_lock_beyond_bala_ae65188e")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    remainingLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    excessiveLockedBalCNS!: bigint

    @BigIntColumn_({nullable: false})
    recyclerAccountId!: bigint

    @BigIntColumn_({nullable: false})
    recyclerAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    recyclerBalanceCNS!: bigint
}
