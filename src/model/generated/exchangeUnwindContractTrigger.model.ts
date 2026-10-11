import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeUnwindContractTrigger {
    constructor(props?: Partial<ExchangeUnwindContractTrigger>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_unwind_contract_trigger_block_e7bec9b5")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_unwind_contract_trigger_block_time_97ec0fda")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_unwind_contract_trigger_perp_id_e881a6fe")
    @BigIntColumn_({nullable: false})
    perpId!: bigint
}
