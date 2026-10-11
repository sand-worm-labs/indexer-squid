import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeExchangeInitialized {
    constructor(props?: Partial<ExchangeExchangeInitialized>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_exchange_initialized_block_fad6b2f4")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_exchange_initialized_block_time_10bad57c")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    sender!: string

    @StringColumn_({nullable: false})
    collateralToken!: string

    @BigIntColumn_({nullable: false})
    collateralDecimals!: bigint

    @BigIntColumn_({nullable: false})
    minAccountOpenCNS!: bigint

    @BigIntColumn_({nullable: false})
    wrlsThousandthsTvl!: bigint

    @BigIntColumn_({nullable: false})
    wrlsMinWithdrawLimitCNS!: bigint

    @BigIntColumn_({nullable: false})
    recycleFeeCNS!: bigint

    @BooleanColumn_({nullable: false})
    whitelistingEnabled!: boolean
}
