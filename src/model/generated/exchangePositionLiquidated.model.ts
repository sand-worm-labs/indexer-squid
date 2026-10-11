import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionLiquidated {
    constructor(props?: Partial<ExchangePositionLiquidated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_liquidated_block_9aee989a")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_liquidated_block_time_4b4f855c")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_liquidated_perp_id_23d15987")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    posAccountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    liqPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    liqLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    posLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    deltaPnlCNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingCNS!: bigint

    @BigIntColumn_({nullable: false})
    posAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    posDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    accAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    accBalanceCNS!: bigint

    @BooleanColumn_({nullable: false})
    onOrderBook!: boolean
}
