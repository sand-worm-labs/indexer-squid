import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionIncreasedV2 {
    constructor(props?: Partial<ExchangePositionIncreasedV2>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_increased_v2_block_4051b92f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_increased_v2_block_time_146c4c88")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_increased_v2_perp_id_8fc4e51d")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_increased_v2_account_id_d722f755")
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

    @BigIntColumn_({nullable: false})
    priceResiduePNSQ16!: bigint
}
