import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInvalidBankruptcyPrice {
    constructor(props?: Partial<ExchangeInvalidBankruptcyPrice>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_invalid_bankruptcy_price_block_35aba2e5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_invalid_bankruptcy_price_block_time_fada70a0")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_invalid_bankruptcy_price_perp_id_b8983a56")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_invalid_bankruptcy_price_account_id_a79d1c37")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: false})
    posPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    liqLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    premiumPnlCNS!: bigint
}
