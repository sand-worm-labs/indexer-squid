import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCantDeleverageAgainstOpposingPositions {
    constructor(props?: Partial<ExchangeCantDeleverageAgainstOpposingPositions>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_cant_deleverage_against_opposing_position_05d240a4")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_cant_deleverage_against_opposing_position_dd05c282")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_cant_deleverage_against_opposing_position_67b3a8af")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_cant_deleverage_against_opposing_position_79cd00ef")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BooleanColumn_({nullable: false})
    forceClose!: boolean

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    deleveragePricePNS!: bigint

    @StringColumn_({array: true, nullable: false})
    sortedPositionIds!: (string)[]
}
