import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCollateralDecreaseRequested {
    constructor(props?: Partial<ExchangeCollateralDecreaseRequested>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_collateral_decrease_requested_block_1deca2ac")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_collateral_decrease_requested_block_time_9a80e23f")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_collateral_decrease_requested_perp_id_460961e5")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_collateral_decrease_requested_account_id_37c1c57c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    expiryTS!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BooleanColumn_({nullable: false})
    clampToMaximum!: boolean

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    entryPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint
}
