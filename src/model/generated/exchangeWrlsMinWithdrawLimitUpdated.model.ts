import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeWRLSMinWithdrawLimitUpdated {
    constructor(props?: Partial<ExchangeWRLSMinWithdrawLimitUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_wrls_min_withdraw_limit_updated_block_6213b041")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_wrls_min_withdraw_limit_updated_block_tim_2dfc4f06")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    limitCNS!: bigint
}
