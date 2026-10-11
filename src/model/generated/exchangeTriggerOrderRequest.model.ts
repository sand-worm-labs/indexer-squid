import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTriggerOrderRequest {
    constructor(props?: Partial<ExchangeTriggerOrderRequest>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_trigger_order_request_block_f44c23ce")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_trigger_order_request_block_time_f2208a69")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    triggerPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    triggerPriceCondition!: bigint

    @BigIntColumn_({nullable: false})
    triggerRequestId!: bigint

    @BigIntColumn_({nullable: false})
    triggerPositionId!: bigint
}
