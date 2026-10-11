import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInsuficientFundsForRecycleFee {
    constructor(props?: Partial<ExchangeInsuficientFundsForRecycleFee>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_insuficient_funds_for_recycle_fee_block_8bce3e75")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_insuficient_funds_for_recycle_fee_block_t_c06ff670")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_insuficient_funds_for_recycle_fee_perp_id_d51cbbd1")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_insuficient_funds_for_recycle_fee_account_cf372473")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    lockedCNS!: bigint

    @BigIntColumn_({nullable: false})
    recycleFeeCNS!: bigint
}
