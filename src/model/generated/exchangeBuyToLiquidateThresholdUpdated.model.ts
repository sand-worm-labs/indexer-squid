import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBuyToLiquidateThresholdUpdated {
    constructor(props?: Partial<ExchangeBuyToLiquidateThresholdUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_buy_to_liquidate_threshold_updated_block_e61172cf")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_buy_to_liquidate_threshold_updated_block__23bbea7e")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_buy_to_liquidate_threshold_updated_perp_i_3f27f862")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    thresholdPer100K!: bigint
}
