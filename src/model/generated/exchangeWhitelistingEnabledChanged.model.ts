import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeWhitelistingEnabledChanged {
    constructor(props?: Partial<ExchangeWhitelistingEnabledChanged>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_whitelisting_enabled_changed_block_2f7833e8")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_whitelisting_enabled_changed_block_time_056f7a5a")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BooleanColumn_({nullable: false})
    enabled!: boolean
}
