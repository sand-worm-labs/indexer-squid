import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBuyToLiquidateRestrictionUpdated {
    constructor(props?: Partial<ExchangeBuyToLiquidateRestrictionUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_buy_to_liquidate_restriction_updated_bloc_c1d5bfc8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_buy_to_liquidate_restriction_updated_bloc_ba21e7d9")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_buy_to_liquidate_restriction_updated_perp_ea00f099")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BooleanColumn_({nullable: false})
    restrictBuyers!: boolean
}
