import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePriceSetDuringTriggerExec {
    constructor(props?: Partial<ExchangePriceSetDuringTriggerExec>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_price_set_during_trigger_exec_block_32ce9854")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_price_set_during_trigger_exec_block_time_74448aaa")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    triggerPricePNS!: bigint
}
