import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, Relation as Relation_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {Position} from "./position.model"
import {Market} from "./market.model"
import {Account} from "./account.model"
import {PositionChangeKind} from "./_positionChangeKind"
import {PositionType} from "./_positionType"

@Entity_()
export class PositionChange {
    constructor(props?: Partial<PositionChange>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_position_change_position_c565ac62")
    @ManyToOne_(() => Position, {nullable: true})
    position!: Relation_<Position>

    @Index_("idx_position_change_market_a7430e52")
    @ManyToOne_(() => Market, {nullable: true})
    market!: Relation_<Market>

    @Index_("idx_position_change_account_0e8026dc")
    @ManyToOne_(() => Account, {nullable: true})
    account!: Relation_<Account>

    @Column_("varchar", {length: 20, nullable: false})
    kind!: PositionChangeKind

    @Column_("varchar", {length: 5, nullable: false})
    positionType!: PositionType

    @BigIntColumn_({nullable: true})
    pricePNS!: bigint | undefined | null

    @BigIntColumn_({nullable: false})
    lotBeforeLNS!: bigint

    @BigIntColumn_({nullable: false})
    lotAfterLNS!: bigint

    @BigIntColumn_({nullable: false})
    depositBeforeCNS!: bigint

    @BigIntColumn_({nullable: false})
    depositAfterCNS!: bigint

    @BigIntColumn_({nullable: true})
    deltaPnlCNS!: bigint | undefined | null

    @BigIntColumn_({nullable: true})
    fundingCNS!: bigint | undefined | null

    @Index_("idx_position_change_block_3c57bde0")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_position_change_block_time_501087ea")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string
}
