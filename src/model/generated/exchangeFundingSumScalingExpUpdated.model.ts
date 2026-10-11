import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFundingSumScalingExpUpdated {
    constructor(props?: Partial<ExchangeFundingSumScalingExpUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_funding_sum_scaling_exp_updated_block_1c018a63")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_funding_sum_scaling_exp_updated_block_tim_b6796006")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_funding_sum_scaling_exp_updated_perp_id_c396a614")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    newExp!: bigint
}
