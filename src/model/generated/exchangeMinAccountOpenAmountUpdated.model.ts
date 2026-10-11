import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMinAccountOpenAmountUpdated {
    constructor(props?: Partial<ExchangeMinAccountOpenAmountUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_min_account_open_amount_updated_block_41ef23c0")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_min_account_open_amount_updated_block_tim_c9e87f71")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    minAccountOpenCNS!: bigint
}
