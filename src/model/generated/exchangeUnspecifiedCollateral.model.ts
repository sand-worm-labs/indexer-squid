import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnspecifiedCollateral {
    constructor(props?: Partial<ExchangeUnspecifiedCollateral>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unspecified_collateral_block_d72eee37")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unspecified_collateral_block_time_b95bd629")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number
}
