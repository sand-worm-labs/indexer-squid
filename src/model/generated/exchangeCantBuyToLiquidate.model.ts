import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCantBuyToLiquidate {
    constructor(props?: Partial<ExchangeCantBuyToLiquidate>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_cant_buy_to_liquidate_block_fe7cbdc0")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_cant_buy_to_liquidate_block_time_865e57ed")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_cant_buy_to_liquidate_perp_id_e60cdc3b")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    posAccountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    bsLiqPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    liqPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    bkptPricePNS!: bigint
}
