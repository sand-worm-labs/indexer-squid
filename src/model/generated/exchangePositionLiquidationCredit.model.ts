import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionLiquidationCredit {
    constructor(props?: Partial<ExchangePositionLiquidationCredit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_liquidation_credit_block_8307bd02")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_liquidation_credit_block_time_639fe1ef")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_liquidation_credit_perp_id_06ceff83")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_liquidation_credit_account_id_10ed2f94")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    startDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    endDepositCNS!: bigint
}
