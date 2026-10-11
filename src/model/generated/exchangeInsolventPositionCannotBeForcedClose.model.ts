import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInsolventPositionCannotBeForcedClose {
    constructor(props?: Partial<ExchangeInsolventPositionCannotBeForcedClose>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_insolvent_position_cannot_be_forced_close_77fdc26c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_insolvent_position_cannot_be_forced_close_6d16cf53")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_insolvent_position_cannot_be_forced_close_3707ae64")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    posAccountId!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    bankruptcyPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint
}
