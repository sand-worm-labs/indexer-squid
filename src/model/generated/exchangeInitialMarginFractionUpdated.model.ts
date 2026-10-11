import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInitialMarginFractionUpdated {
    constructor(props?: Partial<ExchangeInitialMarginFractionUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_initial_margin_fraction_updated_block_222169c1")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_initial_margin_fraction_updated_block_tim_fca35a07")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_initial_margin_fraction_updated_perp_id_7f70a7b4")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    initMarginFracHdths!: bigint
}
