import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeIncreasePositionCollateral {
    constructor(props?: Partial<ExchangeIncreasePositionCollateral>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_increase_position_collateral_block_ef24646d")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_increase_position_collateral_block_time_b8215c32")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_increase_position_collateral_perp_id_97b95de5")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_increase_position_collateral_account_id_b2b1581c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
