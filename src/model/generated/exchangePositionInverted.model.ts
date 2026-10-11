import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionInverted {
    constructor(props?: Partial<ExchangePositionInverted>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_inverted_block_31b8743f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_inverted_block_time_acc720cc")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_inverted_perp_id_a0f1d787")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_inverted_account_id_9515cdb8")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    leverageHdths!: bigint

    @BigIntColumn_({nullable: false})
    startDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    endDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    pnlCollateralizedCNS!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    startLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    endLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    deltaPnlCNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingCNS!: bigint

    @BigIntColumn_({nullable: false})
    insFeeCNS!: bigint

    @BigIntColumn_({nullable: false})
    protFeeCNS!: bigint
}
