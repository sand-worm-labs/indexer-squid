import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTriggerDescIdTooLow {
    constructor(props?: Partial<ExchangeTriggerDescIdTooLow>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_trigger_desc_id_too_low_block_ed8abe31")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_trigger_desc_id_too_low_block_time_75eaf7da")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    lastTriggerDescId!: bigint
}
