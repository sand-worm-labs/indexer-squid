import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Transfer {
    constructor(props?: Partial<Transfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_transfer_block_1ca50110")
    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @Index_("idx_transfer_from_3d310ced")
    @StringColumn_({nullable: false})
    from!: string

    @Index_("idx_transfer_to_b90faa67")
    @StringColumn_({nullable: false})
    to!: string

    @BigIntColumn_({nullable: false})
    value!: bigint
}
