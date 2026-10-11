import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInsufficientFundsToDecCollateral {
    constructor(props?: Partial<ExchangeInsufficientFundsToDecCollateral>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_insufficient_funds_to_dec_collateral_bloc_71f83966")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_insufficient_funds_to_dec_collateral_bloc_76c365bb")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_insufficient_funds_to_dec_collateral_perp_2f3d9b80")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_insufficient_funds_to_dec_collateral_acco_2ba68d4c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    withdrawMaxCNS!: bigint
}
