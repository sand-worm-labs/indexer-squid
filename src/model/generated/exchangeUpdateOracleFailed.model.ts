import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUpdateOracleFailed {
    constructor(props?: Partial<ExchangeUpdateOracleFailed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_update_oracle_failed_block_0e8d8331")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_update_oracle_failed_block_time_ab337cf7")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_update_oracle_failed_perp_id_b63ffc30")
    @BigIntColumn_({nullable: false})
    perpId!: bigint
}
