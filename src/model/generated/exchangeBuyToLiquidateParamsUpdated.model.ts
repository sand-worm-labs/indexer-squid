import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBuyToLiquidateParamsUpdated {
    constructor(props?: Partial<ExchangeBuyToLiquidateParamsUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_buy_to_liquidate_params_updated_block_c52c12a5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_buy_to_liquidate_params_updated_block_tim_473f525a")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_buy_to_liquidate_params_updated_perp_id_d9ed3354")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    insAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    userAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    buyerAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    protAmtPer100K!: bigint
}
