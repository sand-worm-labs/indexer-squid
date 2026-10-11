import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeProtocolBalanceDeposit {
    constructor(props?: Partial<ExchangeProtocolBalanceDeposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_protocol_balance_deposit_block_7913ea96")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_protocol_balance_deposit_block_time_45810110")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint
}
