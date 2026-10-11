import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePostOrderUnderMinimum {
    constructor(props?: Partial<ExchangePostOrderUnderMinimum>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_post_order_under_minimum_block_d696d037")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_post_order_under_minimum_block_time_cbb40bd7")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    orderAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    minAmountCNS!: bigint
}
