import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBuyToLiquidateStarted {
    constructor(props?: Partial<ExchangeBuyToLiquidateStarted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_buy_to_liquidate_started_block_995c4fe8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_buy_to_liquidate_started_block_time_8c287be9")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_buy_to_liquidate_started_perp_id_026e3a67")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    posAccountId!: bigint

    @BigIntColumn_({nullable: false})
    liquidatorId!: bigint

    @BigIntColumn_({nullable: false})
    requestedLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    leverageHdths!: bigint

    @BigIntColumn_({nullable: false})
    limitPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    maxNegPnlCollatBPS!: bigint
}
