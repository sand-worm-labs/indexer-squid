import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeContractVersionSet {
    constructor(props?: Partial<ExchangeContractVersionSet>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_contract_version_set_block_5e3b0918")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_contract_version_set_block_time_69c806ba")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    major!: bigint

    @BigIntColumn_({nullable: false})
    minor!: bigint

    @BigIntColumn_({nullable: false})
    patch!: bigint
}
