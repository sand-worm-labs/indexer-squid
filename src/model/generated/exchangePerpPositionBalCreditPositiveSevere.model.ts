import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePerpPositionBalCreditPositiveSevere {
    constructor(props?: Partial<ExchangePerpPositionBalCreditPositiveSevere>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_perp_position_bal_credit_positive_severe__5d8c569f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_perp_position_bal_credit_positive_severe__814e5197")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_perp_position_bal_credit_positive_severe__2960fad9")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_perp_position_bal_credit_positive_severe__3b74631f")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    realizedPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BooleanColumn_({nullable: false})
    userProceedsToPosition!: boolean

    @BooleanColumn_({nullable: false})
    buyToLiquidate!: boolean

    @BigIntColumn_({nullable: false})
    creditPerpBalCNS!: bigint
}
