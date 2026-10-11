import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeIgnoreOracleUpdated {
    constructor(props?: Partial<ExchangeIgnoreOracleUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_ignore_oracle_updated_block_007b508b")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_ignore_oracle_updated_block_time_03a61f43")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_ignore_oracle_updated_perp_id_67cd36d7")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BooleanColumn_({nullable: false})
    ignOracle!: boolean
}
