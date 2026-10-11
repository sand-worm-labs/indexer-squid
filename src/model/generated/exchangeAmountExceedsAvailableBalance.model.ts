import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeAmountExceedsAvailableBalance {
    constructor(props?: Partial<ExchangeAmountExceedsAvailableBalance>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_amount_exceeds_available_balance_block_f5a83238")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_amount_exceeds_available_balance_block_ti_04d29199")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BigIntColumn_({nullable: false})
    availableBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    balanceCNS!: bigint
}
