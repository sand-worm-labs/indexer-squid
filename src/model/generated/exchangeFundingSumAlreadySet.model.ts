import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeFundingSumAlreadySet {
    constructor(props?: Partial<ExchangeFundingSumAlreadySet>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_funding_sum_already_set_block_f162739c")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_funding_sum_already_set_block_time_adef623a")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_funding_sum_already_set_perp_id_a82ee73f")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    fundingEventBlock!: bigint

    @BigIntColumn_({nullable: false})
    storageIndex!: bigint

    @BigIntColumn_({nullable: false})
    fundingSumOffset!: bigint
}
