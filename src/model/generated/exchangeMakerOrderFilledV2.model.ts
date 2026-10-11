import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMakerOrderFilledV2 {
    constructor(props?: Partial<ExchangeMakerOrderFilledV2>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_maker_order_filled_v2_block_45bc2fb5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_maker_order_filled_v2_block_time_adf088db")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_maker_order_filled_v2_perp_id_deca8b89")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_maker_order_filled_v2_account_id_c62ac9e9")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    feeCNS!: bigint

    @BigIntColumn_({nullable: false})
    lockedBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    builderId!: bigint

    @BigIntColumn_({nullable: false})
    builderFeeCNS!: bigint
}
