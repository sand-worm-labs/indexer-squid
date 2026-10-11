import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnityDescentThreshUpdated {
    constructor(props?: Partial<ExchangeUnityDescentThreshUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unity_descent_thresh_updated_block_0c2ad9f5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unity_descent_thresh_updated_block_time_2b29dbb8")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unity_descent_thresh_updated_perp_id_b74c797d")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    threshHdths!: bigint
}
