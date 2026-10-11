import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBorrowMarginNotMetAfterDecCollateral {
    constructor(props?: Partial<ExchangeBorrowMarginNotMetAfterDecCollateral>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_borrow_margin_not_met_after_dec_collatera_8258d6d6")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_borrow_margin_not_met_after_dec_collatera_ee557a10")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_borrow_margin_not_met_after_dec_collatera_ad901f17")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_borrow_margin_not_met_after_dec_collatera_b44d08c4")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    bmrCNS!: bigint

    @BigIntColumn_({nullable: false})
    fmvAfterCNS!: bigint
}
