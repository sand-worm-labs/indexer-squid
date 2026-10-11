import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeOracleAgeExceedsMax {
    constructor(props?: Partial<ExchangeOracleAgeExceedsMax>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_oracle_age_exceeds_max_block_bb3d186f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_oracle_age_exceeds_max_block_time_0738cdf3")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_oracle_age_exceeds_max_perp_id_9d6e73ad")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    oracleTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @BigIntColumn_({nullable: false})
    maxAgeSec!: bigint
}
