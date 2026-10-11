import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTakerOrderFilledV2 {
    constructor(props?: Partial<ExchangeTakerOrderFilledV2>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_taker_order_filled_v2_block_4548d3e8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_taker_order_filled_v2_block_time_ef50ebd3")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    entryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    collatPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    pnlPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    feeCNS!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    builderId!: bigint

    @BigIntColumn_({nullable: false})
    builderFeeCNS!: bigint
}
