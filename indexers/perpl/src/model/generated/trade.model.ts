import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, Relation as Relation_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"
import {Account} from "./account.model"
import {Order} from "./order.model"
import {TradeRole} from "./_tradeRole"

@Entity_()
export class Trade {
    constructor(props?: Partial<Trade>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_trade_market_7d347656")
    @ManyToOne_(() => Market, {nullable: true})
    market!: Relation_<Market>

    @Index_("idx_trade_account_64961d47")
    @ManyToOne_(() => Account, {nullable: true})
    account!: Relation_<Account>

    /**
     * resting order that was filled (maker fills only)
     */
    @Index_("idx_trade_order_c4eb356b")
    @ManyToOne_(() => Order, {nullable: true})
    order!: Relation_<Order> | undefined | null

    @Column_("varchar", {length: 5, nullable: false})
    role!: TradeRole

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    feeCNS!: bigint

    /**
     * collateral change for the account
     */
    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @BigIntColumn_({nullable: true})
    builderId!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    builderFeeCNS!: bigint | undefined | null

    @Index_("idx_trade_block_983b8994")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_trade_block_time_ce291d11")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string
}
