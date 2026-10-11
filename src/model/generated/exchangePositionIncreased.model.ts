import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionIncreased {
    constructor(props?: Partial<ExchangePositionIncreased>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_increased_block_91d4a616")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_increased_block_time_cb8107d2")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_increased_perp_id_be76edc8")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_increased_account_id_b6917c0c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    leverageHdths!: bigint

    @BigIntColumn_({nullable: false})
    startDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    endDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    pnlCollateralizedCNS!: bigint

    @BigIntColumn_({nullable: false})
    premiumPnlSettledCNS!: bigint

    @BigIntColumn_({nullable: false})
    maxNegPnlCollatBPS!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    startLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    endLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    insFeeCNS!: bigint

    @BigIntColumn_({nullable: false})
    protFeeCNS!: bigint
}
