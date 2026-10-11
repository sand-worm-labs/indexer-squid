import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionDecreased {
    constructor(props?: Partial<ExchangePositionDecreased>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_decreased_block_18479ac4")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_decreased_block_time_4ca982df")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_decreased_perp_id_99dbd9ce")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_decreased_account_id_c2a2c6a6")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    startDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    endDepositCNS!: bigint

    @BigIntColumn_({nullable: false})
    startLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    endLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    deltaPnlCNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingCNS!: bigint
}
