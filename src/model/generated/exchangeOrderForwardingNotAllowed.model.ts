import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderForwardingNotAllowed {
    constructor(props?: Partial<ExchangeOrderForwardingNotAllowed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_forwarding_not_allowed_block_3c376125")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_forwarding_not_allowed_block_time_288bb707")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number
}
