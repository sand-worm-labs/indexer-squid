import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Example {
    constructor(props?: Partial<Example>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_example_block_7abf2575")
    @IntColumn_({nullable: false})
    block!: number

    @StringColumn_({nullable: false})
    txHash!: string
}
