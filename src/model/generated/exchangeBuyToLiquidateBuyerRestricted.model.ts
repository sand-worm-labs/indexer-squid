import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBuyToLiquidateBuyerRestricted {
    constructor(props?: Partial<ExchangeBuyToLiquidateBuyerRestricted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_buy_to_liquidate_buyer_restricted_block_313a0e07")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_buy_to_liquidate_buyer_restricted_block_t_79073b2d")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_buy_to_liquidate_buyer_restricted_perp_id_e1c705de")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @StringColumn_({nullable: false})
    buyer!: string
}
