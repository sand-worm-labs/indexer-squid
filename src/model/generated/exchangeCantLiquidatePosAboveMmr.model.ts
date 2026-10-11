import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCantLiquidatePosAboveMMR {
    constructor(props?: Partial<ExchangeCantLiquidatePosAboveMMR>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_cant_liquidate_pos_above_mmr_block_eabca3b8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_cant_liquidate_pos_above_mmr_block_time_51554ad0")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_cant_liquidate_pos_above_mmr_perp_id_c2f0dce1")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    posAccountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    liqPricePNS!: bigint
}
