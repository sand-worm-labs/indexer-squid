import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderExtensionRejected {
    constructor(props?: Partial<ExchangeOrderExtensionRejected>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_extension_rejected_block_a5b2f358")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_extension_rejected_block_time_f021e504")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_extension_rejected_perp_id_85d4252f")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_order_extension_rejected_account_id_89ee80b7")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
