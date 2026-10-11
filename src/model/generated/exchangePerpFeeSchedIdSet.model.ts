import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePerpFeeSchedIdSet {
    constructor(props?: Partial<ExchangePerpFeeSchedIdSet>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_perp_fee_sched_id_set_block_66a7a8c2")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_perp_fee_sched_id_set_block_time_73ec1627")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_perp_fee_sched_id_set_perp_id_20286448")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    feeSchedId!: bigint
}
