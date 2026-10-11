import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeDeleveragePositionListEmpty {
    constructor(props?: Partial<ExchangeDeleveragePositionListEmpty>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_deleverage_position_list_empty_block_62e74e29")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_deleverage_position_list_empty_block_time_b4469967")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_deleverage_position_list_empty_perp_id_0130a3bb")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_deleverage_position_list_empty_account_id_6b1c0ad3")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
