import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderRequest {
    constructor(props?: Partial<ExchangeOrderRequest>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_request_block_cdae2f0e")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_request_block_time_78503589")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_request_perp_id_b0d5185b")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_order_request_account_id_455a844c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderDescId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    orderType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    expiryBlock!: bigint

    @BooleanColumn_({nullable: false})
    postOnly!: boolean

    @BooleanColumn_({nullable: false})
    fillOrKill!: boolean

    @BooleanColumn_({nullable: false})
    immediateOrCancel!: boolean

    @BigIntColumn_({nullable: false})
    maxMatches!: bigint

    @BigIntColumn_({nullable: false})
    leverageHdths!: bigint

    @BigIntColumn_({nullable: false})
    lastExecutionBlock!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    maxNegPnlCollatBPS!: bigint

    @BigIntColumn_({nullable: false})
    gasLeft!: bigint
}
