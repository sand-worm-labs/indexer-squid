import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeResidueTransferred {
    constructor(props?: Partial<ExchangeResidueTransferred>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_residue_transferred_block_473083c7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_residue_transferred_block_time_e1164636")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_residue_transferred_perp_id_8aae4664")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    residueAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    positionBalanceCNS!: bigint
}
