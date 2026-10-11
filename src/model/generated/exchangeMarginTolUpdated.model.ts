import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMarginTolUpdated {
    constructor(props?: Partial<ExchangeMarginTolUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_margin_tol_updated_block_26a3bd65")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_margin_tol_updated_block_time_b1e4ae2d")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_margin_tol_updated_perp_id_2e655c1d")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    tolerance!: bigint

    @BigIntColumn_({nullable: false})
    decimals!: bigint
}
