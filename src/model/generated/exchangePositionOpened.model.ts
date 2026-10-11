import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionOpened {
    constructor(props?: Partial<ExchangePositionOpened>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_opened_block_2f780d5b")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_opened_block_time_5b0bc0c0")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_opened_perp_id_8cbdc6da")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_opened_account_id_86b3cda0")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    leverageHdths!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: false})
    pnlCollateralizedCNS!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    insFeeCNS!: bigint

    @BigIntColumn_({nullable: false})
    protFeeCNS!: bigint
}
