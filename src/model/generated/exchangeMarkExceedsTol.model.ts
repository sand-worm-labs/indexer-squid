import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeMarkExceedsTol {
    constructor(props?: Partial<ExchangeMarkExceedsTol>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_mark_exceeds_tol_block_d9444b8e")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_mark_exceeds_tol_block_time_5b47bb50")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_mark_exceeds_tol_perp_id_18fe9703")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    markPNS!: bigint

    @BigIntColumn_({nullable: false})
    spotOraclePricePNS!: bigint

    @BigIntColumn_({nullable: false})
    tolerancePer100k!: bigint
}
