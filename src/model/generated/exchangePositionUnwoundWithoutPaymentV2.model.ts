import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionUnwoundWithoutPaymentV2 {
    constructor(props?: Partial<ExchangePositionUnwoundWithoutPaymentV2>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_unwound_without_payment_v2_block_f10cc3a7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_unwound_without_payment_v2_block_ae860211")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_unwound_without_payment_v2_perp__1d17f913")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_unwound_without_payment_v2_accou_8c876f7d")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: false})
    positionFmvCNS!: bigint

    @BigIntColumn_({nullable: false})
    amountOwedCNS!: bigint

    @BigIntColumn_({nullable: false})
    priceResiduePNSQ16!: bigint
}
