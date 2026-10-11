import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeProtocolBalanceWithdraw {
    constructor(props?: Partial<ExchangeProtocolBalanceWithdraw>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_protocol_balance_withdraw_block_f86af996")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_protocol_balance_withdraw_block_time_810ba193")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint
}
