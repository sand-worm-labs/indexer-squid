import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionUnwound {
    constructor(props?: Partial<ExchangePositionUnwound>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_unwound_block_13bb4920")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_unwound_block_time_dfd54c33")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_unwound_perp_id_6c0e95d4")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_unwound_account_id_07e64d5d")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: false})
    positionFmvCNS!: bigint

    @BigIntColumn_({nullable: false})
    paymentCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
