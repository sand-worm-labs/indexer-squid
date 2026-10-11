import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCollateralDecreaseDeclined {
    constructor(props?: Partial<ExchangeCollateralDecreaseDeclined>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_collateral_decrease_declined_block_c4437fda")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_collateral_decrease_declined_block_time_a9060327")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_collateral_decrease_declined_perp_id_2e923a9f")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_collateral_decrease_declined_account_id_1706b972")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @StringColumn_({nullable: false})
    reason!: string
}
