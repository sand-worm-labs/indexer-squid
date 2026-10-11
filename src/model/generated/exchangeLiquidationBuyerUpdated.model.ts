import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLiquidationBuyerUpdated {
    constructor(props?: Partial<ExchangeLiquidationBuyerUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_liquidation_buyer_updated_block_0d6e4bb9")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_liquidation_buyer_updated_block_time_938c56e1")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    liquidationBuyer!: string

    @Index_("idx_exchange_liquidation_buyer_updated_account_id_b6a46820")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BooleanColumn_({nullable: false})
    added!: boolean
}
