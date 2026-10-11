import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeExchangeHalted {
    constructor(props?: Partial<ExchangeExchangeHalted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_exchange_halted_block_a7e27b30")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_exchange_halted_block_time_bd48317e")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BooleanColumn_({nullable: false})
    halted!: boolean
}
