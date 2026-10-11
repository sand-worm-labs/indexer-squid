import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeBeaconUpgraded {
    constructor(props?: Partial<ExchangeBeaconUpgraded>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_beacon_upgraded_block_3b277bcf")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_beacon_upgraded_block_time_f9c6431b")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    beacon!: string
}
