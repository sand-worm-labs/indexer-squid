import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeAccountLiquidationCredit {
    constructor(props?: Partial<ExchangeAccountLiquidationCredit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_account_liquidation_credit_block_ca87363a")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_account_liquidation_credit_block_time_972030ea")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_account_liquidation_credit_perp_id_efd079f5")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_account_liquidation_credit_account_id_e1b207e7")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    startBalanceCNS!: bigint

    @BigIntColumn_({nullable: false})
    endBalanceCNS!: bigint
}
