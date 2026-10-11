import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeResidueBalanceInsufficient {
    constructor(props?: Partial<ExchangeResidueBalanceInsufficient>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_residue_balance_insufficient_block_aab7edb3")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_residue_balance_insufficient_block_time_05feba48")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_residue_balance_insufficient_perp_id_516a22b6")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    requestedAmountCNS!: bigint

    @BigIntColumn_({nullable: false})
    positionBalanceCNS!: bigint
}
