import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBuyToLiquidateSettled {
    constructor(props?: Partial<ExchangeBuyToLiquidateSettled>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_buy_to_liquidate_settled_block_fe3c340d")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_buy_to_liquidate_settled_block_time_e6d6f2f9")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_buy_to_liquidate_settled_perp_id_c85c6ce5")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_buy_to_liquidate_settled_account_id_6a6e05c1")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderType!: bigint

    @BigIntColumn_({nullable: false})
    realizedPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
