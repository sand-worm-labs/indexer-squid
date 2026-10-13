import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_, OneToMany as OneToMany_, Relation as Relation_} from "@subsquid/typeorm-store"
import {Order} from "./order.model"
import {Position} from "./position.model"
import {Trade} from "./trade.model"
import {Funding} from "./funding.model"

@Entity_()
export class Market {
    constructor(props?: Partial<Market>) {
        Object.assign(this, props)
    }

    /**
     * perpId
     */
    @PrimaryColumn_()
    id!: string

    @Index_("idx_market_perp_id_5d3f5b47")
    @IntColumn_({nullable: false})
    perpId!: number

    @StringColumn_({nullable: false})
    name!: string

    @Index_("idx_market_symbol_0d4d70f6")
    @StringColumn_({nullable: false})
    symbol!: string

    @IntColumn_({nullable: false})
    status!: number

    @BooleanColumn_({nullable: false})
    paused!: boolean

    @BooleanColumn_({nullable: false})
    removed!: boolean

    @BigIntColumn_({nullable: false})
    basePricePNS!: bigint

    @IntColumn_({nullable: false})
    priceDecimals!: number

    @IntColumn_({nullable: false})
    lotDecimals!: number

    @BigIntColumn_({nullable: false})
    initMarginFracHdths!: bigint

    @BigIntColumn_({nullable: false})
    maintMarginFracHdths!: bigint

    @BigIntColumn_({nullable: false})
    maxOpenInterestLNS!: bigint

    /**
     * fee schedule (V2 markets); V1 markets use the flat rates below
     */
    @BigIntColumn_({nullable: true})
    feeScheduleId!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    takerFeePer100K!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    makerFeePer100K!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    markPricePNS!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    oraclePricePNS!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    oracleTimestamp!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    lastFundingRatePct100K!: bigint | undefined | null

    @IntColumn_({nullable: true})
    lastFundingBlock!: number | undefined | null

    @IntColumn_({nullable: false})
    createdBlock!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @IntColumn_({nullable: false})
    updatedBlock!: number

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @OneToMany_(() => Order, e => e.market)
    orders!: Relation_<Order[]>

    @OneToMany_(() => Position, e => e.market)
    positions!: Relation_<Position[]>

    @OneToMany_(() => Trade, e => e.market)
    trades!: Relation_<Trade[]>

    @OneToMany_(() => Funding, e => e.market)
    fundings!: Relation_<Funding[]>
}
