import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeLastForwardedDescIdReset {
    constructor(props?: Partial<ExchangeLastForwardedDescIdReset>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_last_forwarded_desc_id_reset_block_03e168a5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_last_forwarded_desc_id_reset_block_time_406c58cb")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_last_forwarded_desc_id_reset_account_id_708deac3")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    newDescId!: bigint
}
