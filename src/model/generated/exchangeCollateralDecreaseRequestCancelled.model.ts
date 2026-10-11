import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCollateralDecreaseRequestCancelled {
    constructor(props?: Partial<ExchangeCollateralDecreaseRequestCancelled>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_collateral_decrease_request_cancelled_blo_cc266b2c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_collateral_decrease_request_cancelled_blo_bc14b568")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_collateral_decrease_request_cancelled_per_304fea8b")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_collateral_decrease_request_cancelled_acc_670ef3f0")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
