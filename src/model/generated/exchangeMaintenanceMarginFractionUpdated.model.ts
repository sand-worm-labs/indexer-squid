import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMaintenanceMarginFractionUpdated {
    constructor(props?: Partial<ExchangeMaintenanceMarginFractionUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_maintenance_margin_fraction_updated_block_f88e6692")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_maintenance_margin_fraction_updated_block_b97aa3e3")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_maintenance_margin_fraction_updated_perp__2ed0ec00")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    maintMarginFracHdths!: bigint
}
