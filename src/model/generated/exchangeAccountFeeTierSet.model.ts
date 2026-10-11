import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeAccountFeeTierSet {
    constructor(props?: Partial<ExchangeAccountFeeTierSet>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_account_fee_tier_set_block_abc919ca")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_account_fee_tier_set_block_time_efeca4c5")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_account_fee_tier_set_account_id_9bc6e33e")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    tier!: bigint
}
