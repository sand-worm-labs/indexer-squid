import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionCollateralDecreased {
    constructor(props?: Partial<ExchangePositionCollateralDecreased>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_collateral_decreased_block_8b3f46b3")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_collateral_decreased_block_time_f495bb62")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_collateral_decreased_perp_id_76a65d50")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_collateral_decreased_account_id_2ab3a507")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    impactAdjPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    startDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    endDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    startEntryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    endEntryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    effBmfHdths!: bigint

    @BigIntColumn_({nullable: false})
    decreaseCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
