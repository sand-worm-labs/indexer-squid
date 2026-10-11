import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderChanged {
    constructor(props?: Partial<ExchangeOrderChanged>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_changed_block_dd645b6c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_changed_block_time_dded3066")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    expiryBlock!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
