import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInvalidExpiryBlock {
    constructor(props?: Partial<ExchangeInvalidExpiryBlock>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_invalid_expiry_block_block_fe0b3534")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_invalid_expiry_block_block_time_e7947219")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    expiryBlock!: bigint

    @BigIntColumn_({nullable: false})
    blockNumber!: bigint
}
