import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTriggerOrderExecution {
    constructor(props?: Partial<ExchangeTriggerOrderExecution>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_trigger_order_execution_block_da9b5182")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_trigger_order_execution_block_time_fe9b6c36")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number
}
