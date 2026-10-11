import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderSizeExceedsAvailableSize {
    constructor(props?: Partial<ExchangeOrderSizeExceedsAvailableSize>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_size_exceeds_available_size_block_97e88d18")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_size_exceeds_available_size_block_t_ca78e6e7")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    orderLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    availableLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    positionLotLNS!: bigint
}
