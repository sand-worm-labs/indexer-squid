import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, ManyToOne as ManyToOne_, Relation as Relation_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"
import {Account} from "./account.model"
import {OrderType} from "./_orderType"
import {OrderStatus} from "./_orderStatus"
import {Trade} from "./trade.model"

/**
 * Order ids are small and can be reused, so the entity id is the placing log, not the orderId.
 */
@Entity_()
export class Order {
    constructor(props?: Partial<Order>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_order_order_id_364d1a73")
    @IntColumn_({nullable: false})
    orderId!: number

    @Index_("idx_order_market_2bcf1d9f")
    @ManyToOne_(() => Market, {nullable: true})
    market!: Relation_<Market>

    @Index_("idx_order_account_c4969a7b")
    @ManyToOne_(() => Account, {nullable: true})
    account!: Relation_<Account>

    @Column_("varchar", {length: 11, nullable: false})
    orderType!: OrderType

    @Column_("varchar", {length: 9, nullable: false})
    status!: OrderStatus

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    /**
     * size asked for in the request
     */
    @BigIntColumn_({nullable: false})
    requestedLotLNS!: bigint

    /**
     * size still resting on the book
     */
    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    /**
     * size filled while resting (maker fills)
     */
    @BigIntColumn_({nullable: false})
    filledLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    expiryBlock!: bigint

    @BooleanColumn_({nullable: false})
    postOnly!: boolean

    @BooleanColumn_({nullable: false})
    fillOrKill!: boolean

    @BooleanColumn_({nullable: false})
    immediateOrCancel!: boolean

    @BigIntColumn_({nullable: false})
    leverageHdths!: bigint

    /**
     * set when status is CLEARED, e.g. CANCELLED_BY_ADMIN, CLEARING_EXPIRED_ORDER
     */
    @StringColumn_({nullable: true})
    endReason!: string | undefined | null

    @Index_("idx_order_created_block_331960b7")
    @IntColumn_({nullable: false})
    createdBlock!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @IntColumn_({nullable: false})
    updatedBlock!: number

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @OneToMany_(() => Trade, e => e.order)
    trades!: Relation_<Trade[]>
}
