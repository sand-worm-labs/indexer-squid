import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCannotAdjustEntryPriceToDecCollateral {
    constructor(props?: Partial<ExchangeCannotAdjustEntryPriceToDecCollateral>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_cannot_adjust_entry_price_to_dec_collater_23d0cb29")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_cannot_adjust_entry_price_to_dec_collater_f13e3057")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_cannot_adjust_entry_price_to_dec_collater_673eaabd")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_cannot_adjust_entry_price_to_dec_collater_84d19e21")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    adjustmentAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    entryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    adjustedEntryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint
}
