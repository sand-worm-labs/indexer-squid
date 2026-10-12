import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, Relation as Relation_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"
import {Account} from "./account.model"
import {PositionType} from "./_positionType"
import {PositionStatus} from "./_positionStatus"
import {PositionChange} from "./positionChange.model"

/**
 * One row per (market, account); reused when the position is reopened.
 */
@Entity_()
export class Position {
    constructor(props?: Partial<Position>) {
        Object.assign(this, props)
    }

    /**
     * perpId-accountId
     */
    @PrimaryColumn_()
    id!: string

    @Index_("idx_position_market_12a906db")
    @ManyToOne_(() => Market, {nullable: true})
    market!: Relation_<Market>

    @Index_("idx_position_account_eac32fc5")
    @ManyToOne_(() => Account, {nullable: true})
    account!: Relation_<Account>

    @Column_("varchar", {length: 5, nullable: false})
    positionType!: PositionType

    @Index_("idx_position_status_7b324f7e")
    @Column_("varchar", {length: 6, nullable: false})
    status!: PositionStatus

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: true})
    leverageHdths!: bigint | undefined | null

    /**
     * price of the fill that opened (or inverted) the current position
     */
    @BigIntColumn_({nullable: false})
    openPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    realizedPnlCNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingCNS!: bigint

    @IntColumn_({nullable: false})
    openedBlock!: number

    @DateTimeColumn_({nullable: false})
    openedAt!: Date

    @DateTimeColumn_({nullable: true})
    closedAt!: Date | undefined | null

    @IntColumn_({nullable: false})
    updatedBlock!: number

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @OneToMany_(() => PositionChange, e => e.position)
    changes!: Relation_<PositionChange[]>
}
