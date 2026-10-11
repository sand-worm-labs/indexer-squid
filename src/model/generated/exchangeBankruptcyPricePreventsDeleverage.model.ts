import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBankruptcyPricePreventsDeleverage {
    constructor(props?: Partial<ExchangeBankruptcyPricePreventsDeleverage>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_bankruptcy_price_prevents_deleverage_bloc_2273b01e")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_bankruptcy_price_prevents_deleverage_bloc_e70dd49b")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_bankruptcy_price_prevents_deleverage_perp_b1152fa4")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_bankruptcy_price_prevents_deleverage_acco_2380006c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    bankruptcyPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint
}
