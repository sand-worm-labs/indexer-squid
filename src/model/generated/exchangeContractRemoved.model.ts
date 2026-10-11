import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeContractRemoved {
    constructor(props?: Partial<ExchangeContractRemoved>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_contract_removed_block_b9a34539")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_contract_removed_block_time_d8b281fe")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_contract_removed_perp_id_b25c8772")
    @BigIntColumn_({nullable: false})
    perpId!: bigint
}
