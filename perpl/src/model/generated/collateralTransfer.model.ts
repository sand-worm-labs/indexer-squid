import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, Relation as Relation_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {Account} from "./account.model"
import {TransferKind} from "./_transferKind"

@Entity_()
export class CollateralTransfer {
    constructor(props?: Partial<CollateralTransfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_collateral_transfer_account_497efd87")
    @ManyToOne_(() => Account, {nullable: true})
    account!: Relation_<Account>

    @Column_("varchar", {length: 10, nullable: false})
    kind!: TransferKind

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @Index_("idx_collateral_transfer_block_7f884ee3")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_collateral_transfer_block_time_34258219")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string
}
