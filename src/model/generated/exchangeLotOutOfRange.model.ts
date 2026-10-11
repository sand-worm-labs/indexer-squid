import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLotOutOfRange {
    constructor(props?: Partial<ExchangeLotOutOfRange>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_lot_out_of_range_block_6de7a93d")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_lot_out_of_range_block_time_9ce63c49")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    minLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    maxLotLNS!: bigint
}
