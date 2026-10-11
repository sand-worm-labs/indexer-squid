import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeWhitelistAddress {
    constructor(props?: Partial<ExchangeWhitelistAddress>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_whitelist_address_block_0c6a9508")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_whitelist_address_block_time_57964dd7")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    addr!: string

    @BooleanColumn_({nullable: false})
    whitelisted!: boolean
}
