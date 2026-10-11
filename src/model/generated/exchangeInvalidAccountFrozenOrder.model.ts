import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInvalidAccountFrozenOrder {
    constructor(props?: Partial<ExchangeInvalidAccountFrozenOrder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_invalid_account_frozen_order_block_93d7f8f2")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_invalid_account_frozen_order_block_time_ec6ba4b8")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    orderType!: bigint

    @BooleanColumn_({nullable: false})
    immediateOrCancel!: boolean
}
