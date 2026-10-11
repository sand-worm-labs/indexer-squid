import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCollateralDeposit {
    constructor(props?: Partial<ExchangeCollateralDeposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_collateral_deposit_block_7a1bb076")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_collateral_deposit_block_time_c3a78881")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_collateral_deposit_account_id_2d3dcf16")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
