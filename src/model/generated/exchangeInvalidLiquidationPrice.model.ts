import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInvalidLiquidationPrice {
    constructor(props?: Partial<ExchangeInvalidLiquidationPrice>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_invalid_liquidation_price_block_577d3dc2")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_invalid_liquidation_price_block_time_12b2adb2")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_invalid_liquidation_price_perp_id_29eacdf6")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_invalid_liquidation_price_account_id_b53da6c3")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: false})
    posPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    liqLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    premiumPnlCNS!: bigint
}
