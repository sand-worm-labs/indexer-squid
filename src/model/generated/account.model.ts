import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, StringColumn as StringColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, OneToMany as OneToMany_, Relation as Relation_} from "@subsquid/typeorm-store"
import {Position} from "./position.model"
import {Order} from "./order.model"
import {Trade} from "./trade.model"
import {CollateralTransfer} from "./collateralTransfer.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * accountId
     */
    @PrimaryColumn_()
    id!: string

    @Index_("idx_account_account_id_07de5e26")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    /**
     * owner address
     */
    @Index_("idx_account_address_ff91688a")
    @StringColumn_({nullable: true})
    address!: string | undefined | null

    /**
     * last balance seen in an event
     */
    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    totalDepositedCNS!: bigint

    @BigIntColumn_({nullable: false})
    totalWithdrawnCNS!: bigint

    @IntColumn_({nullable: false})
    frozenStatus!: number

    @IntColumn_({nullable: false})
    createdBlock!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @IntColumn_({nullable: false})
    updatedBlock!: number

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @OneToMany_(() => Position, e => e.account)
    positions!: Relation_<Position[]>

    @OneToMany_(() => Order, e => e.account)
    orders!: Relation_<Order[]>

    @OneToMany_(() => Trade, e => e.account)
    trades!: Relation_<Trade[]>

    @OneToMany_(() => CollateralTransfer, e => e.account)
    transfers!: Relation_<CollateralTransfer[]>
}
