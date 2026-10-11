import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOwnershipTransferred {
    constructor(props?: Partial<ExchangeOwnershipTransferred>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_ownership_transferred_block_192dfef9")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_ownership_transferred_block_time_6fce1167")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    previousOwner!: string

    @StringColumn_({nullable: false})
    newOwner!: string
}
