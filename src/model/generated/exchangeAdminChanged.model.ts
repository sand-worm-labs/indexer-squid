import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeAdminChanged {
    constructor(props?: Partial<ExchangeAdminChanged>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_admin_changed_block_ad00a344")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_admin_changed_block_time_053ded81")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    previousAdmin!: string

    @StringColumn_({nullable: false})
    newAdmin!: string
}
