import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderForwardingUpdated {
    constructor(props?: Partial<ExchangeOrderForwardingUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_forwarding_updated_block_8b6626a2")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_forwarding_updated_block_time_61ccfd90")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_forwarding_updated_account_id_eada95e3")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BooleanColumn_({nullable: false})
    allowed!: boolean
}
