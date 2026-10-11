import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOverCollatDescentThreshUpdated {
    constructor(props?: Partial<ExchangeOverCollatDescentThreshUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_over_collat_descent_thresh_updated_block_42e9284e")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_over_collat_descent_thresh_updated_block__88f66442")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_over_collat_descent_thresh_updated_perp_i_bfca8af4")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    threshHdths!: bigint
}
