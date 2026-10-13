import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, Relation as Relation_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"

@Entity_()
export class Funding {
    constructor(props?: Partial<Funding>) {
        Object.assign(this, props)
    }

    /**
     * perpId-fundingBlock
     */
    @PrimaryColumn_()
    id!: string

    @Index_("idx_funding_market_e7b2f57b")
    @ManyToOne_(() => Market, {nullable: true})
    market!: Relation_<Market>

    @Index_("idx_funding_funding_block_661e04f1")
    @IntColumn_({nullable: false})
    fundingBlock!: number

    @BigIntColumn_({nullable: false})
    specifiedRatePct100K!: bigint

    @BigIntColumn_({nullable: false})
    actualRatePct100K!: bigint

    @BigIntColumn_({nullable: false})
    fundingPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingPaymentPNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingSumPNS!: bigint

    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string
}
