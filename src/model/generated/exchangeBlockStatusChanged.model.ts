import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBlockStatusChanged {
    constructor(props?: Partial<ExchangeBlockStatusChanged>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_block_status_changed_block_1628ab99")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_block_status_changed_block_time_4d91fa7e")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    addr!: string

    @BooleanColumn_({nullable: false})
    blocked!: boolean
}
