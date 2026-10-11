import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeContractPaused {
    constructor(props?: Partial<ExchangeContractPaused>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_contract_paused_block_ebe616d9")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_contract_paused_block_time_5c1c194a")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_contract_paused_perp_id_730afd1a")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BooleanColumn_({nullable: false})
    paused!: boolean
}
