import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLiquidationParamsUpdated {
    constructor(props?: Partial<ExchangeLiquidationParamsUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_liquidation_params_updated_block_d4fd5a2e")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_liquidation_params_updated_block_time_07b8e668")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_liquidation_params_updated_perp_id_efb1933a")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    insAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    liqAmtPer100K!: bigint

    @BigIntColumn_({nullable: false})
    userAmtPer100K!: bigint
}
