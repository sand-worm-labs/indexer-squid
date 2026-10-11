import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeRecycleFeeToAccount {
    constructor(props?: Partial<ExchangeRecycleFeeToAccount>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_recycle_fee_to_account_block_62723dc0")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_recycle_fee_to_account_block_time_564917cb")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_recycle_fee_to_account_account_id_834722f2")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @Index_("idx_exchange_recycle_fee_to_account_perp_id_5a81d89a")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    recycleFeeCNS!: bigint

    @BigIntColumn_({nullable: false})
    recycleBalanceCNS!: bigint
}
