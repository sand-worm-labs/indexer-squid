import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOwnershipTransferStarted {
    constructor(props?: Partial<ExchangeOwnershipTransferStarted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_ownership_transfer_started_block_71f4b8eb")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_ownership_transfer_started_block_time_a2c7eb33")
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
