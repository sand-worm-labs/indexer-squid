import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeRecycleFeeUpdated {
    constructor(props?: Partial<ExchangeRecycleFeeUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_recycle_fee_updated_block_49bf9bc3")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_recycle_fee_updated_block_time_1786fbab")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    recycleFeeCNS!: bigint
}
