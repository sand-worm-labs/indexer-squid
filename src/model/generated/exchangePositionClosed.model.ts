import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionClosed {
    constructor(props?: Partial<ExchangePositionClosed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_closed_block_43341456")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_closed_block_time_f6b5d16d")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_closed_perp_id_6bbd6f94")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_closed_account_id_89ddf836")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    deltaPnlCNS!: bigint

    @BigIntColumn_({nullable: false})
    fundingCNS!: bigint
}
