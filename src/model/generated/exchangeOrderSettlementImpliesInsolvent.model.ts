import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOrderSettlementImpliesInsolvent {
    constructor(props?: Partial<ExchangeOrderSettlementImpliesInsolvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_order_settlement_implies_insolvent_block_3feb1f40")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_order_settlement_implies_insolvent_block__4ea2e519")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_order_settlement_implies_insolvent_perp_i_7a658e63")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_order_settlement_implies_insolvent_accoun_422851bf")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    orderType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    perpPositionBalCNS!: bigint

    @BigIntColumn_({nullable: false})
    perpInsuranceBalCNS!: bigint

    @BigIntColumn_({nullable: false})
    addedPosCollatReqCNS!: bigint

    @BigIntColumn_({nullable: false})
    requestedAmountCNS!: bigint
}
