import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionDoesNotExist {
    constructor(props?: Partial<ExchangePositionDoesNotExist>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_does_not_exist_block_539bda2f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_does_not_exist_block_time_6e19fd9c")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_does_not_exist_perp_id_4d57d160")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_does_not_exist_account_id_9bdc6c8c")
    @BigIntColumn_({nullable: false})
    accountId!: bigint
}
