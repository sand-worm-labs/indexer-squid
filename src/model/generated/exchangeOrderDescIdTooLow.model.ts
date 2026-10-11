import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderDescIdTooLow {
    constructor(props?: Partial<ExchangeOrderDescIdTooLow>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_desc_id_too_low_block_6888c6b7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_desc_id_too_low_block_time_6802386e")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    lastOrderDescId!: bigint
}
