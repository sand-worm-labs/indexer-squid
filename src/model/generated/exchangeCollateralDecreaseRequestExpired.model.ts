import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCollateralDecreaseRequestExpired {
    constructor(props?: Partial<ExchangeCollateralDecreaseRequestExpired>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_collateral_decrease_request_expired_block_62debf00")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_collateral_decrease_request_expired_block_1c88be02")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_collateral_decrease_request_expired_perp__6b4923d3")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_collateral_decrease_request_expired_accou_a0eb2bae")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    expiryTS!: bigint

    @BigIntColumn_({nullable: false})
    blockTS!: bigint
}
