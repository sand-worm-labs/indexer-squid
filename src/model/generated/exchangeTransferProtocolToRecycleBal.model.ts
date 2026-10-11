import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTransferProtocolToRecycleBal {
    constructor(props?: Partial<ExchangeTransferProtocolToRecycleBal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_transfer_protocol_to_recycle_bal_block_1d9a49e6")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_transfer_protocol_to_recycle_bal_block_ti_b9d49919")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint
}
