import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionDeleveragedV2 {
    constructor(props?: Partial<ExchangePositionDeleveragedV2>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_deleveraged_v2_block_90b39472")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_deleveraged_v2_block_time_98babc75")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_deleveraged_v2_perp_id_e2b9c5a6")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_deleveraged_v2_account_id_1e341534")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BooleanColumn_({nullable: false})
    forceClose!: boolean

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    entryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    deleveragePricePNS!: bigint

    @BigIntColumn_({nullable: false})
    deltaPnlCNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingCNS!: bigint

    @BigIntColumn_({nullable: false})
    startDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    endDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    startLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    endLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    priceResiduePNSQ16!: bigint
}
