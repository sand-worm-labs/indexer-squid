import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeContractAdded {
    constructor(props?: Partial<ExchangeContractAdded>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_contract_added_block_485676f6")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_contract_added_block_time_4f71659c")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_contract_added_perp_id_60e700a9")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @StringColumn_({nullable: false})
    name!: string

    @StringColumn_({nullable: false})
    symbol!: string

    @BigIntColumn_({nullable: false})
    status!: bigint

    @BigIntColumn_({nullable: false})
    basePricePNS!: bigint

    @BigIntColumn_({nullable: false})
    priceDecimals!: bigint

    @BigIntColumn_({nullable: false})
    lotDecimals!: bigint

    @BigIntColumn_({nullable: false})
    takerFeePer100K!: bigint

    @BigIntColumn_({nullable: false})
    makerFeePer100K!: bigint

    @BigIntColumn_({nullable: false})
    initMarginFracHdths!: bigint

    @BigIntColumn_({nullable: false})
    maintMarginFracHdths!: bigint

    @BigIntColumn_({nullable: false})
    maxOpenInterestLNS!: bigint

    @BigIntColumn_({nullable: false})
    unityDescentThreshHdths!: bigint

    @BigIntColumn_({nullable: false})
    overColDescentThreshHdths!: bigint

    @BigIntColumn_({nullable: false})
    dcpBorrowThreshHdths!: bigint

    @BigIntColumn_({nullable: false})
    priceTolPer100K!: bigint

    @BigIntColumn_({nullable: false})
    marginTol!: bigint

    @BigIntColumn_({nullable: false})
    marginTolDecimals!: bigint

    @BigIntColumn_({nullable: false})
    refPriceMaxAgeSec!: bigint

    @BigIntColumn_({nullable: false})
    absFundingClampPctPer100K!: bigint

    @BigIntColumn_({nullable: false})
    permCancelMinOrders!: bigint

    @BigIntColumn_({nullable: false})
    permCancelSegment!: bigint

    @BigIntColumn_({nullable: false})
    insAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    liqInsAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    liqUserAmtPer100K!: bigint

    @BooleanColumn_({nullable: false})
    btlRestrictBuyers!: boolean

    @BigIntColumn_({nullable: false})
    btlPriceThreshPer100K!: bigint

    @BigIntColumn_({nullable: false})
    btlInsAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    btlUserAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    btlBuyerAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    numPerpetuals!: bigint
}
