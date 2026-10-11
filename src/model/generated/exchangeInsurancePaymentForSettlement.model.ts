import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeInsurancePaymentForSettlement {
    constructor(props?: Partial<ExchangeInsurancePaymentForSettlement>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_insurance_payment_for_settlement_block_acd65136")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_insurance_payment_for_settlement_block_ti_c1f37cfa")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_insurance_payment_for_settlement_perp_id_8f9e670f")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_insurance_payment_for_settlement_account__897e0640")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    insPaymentCNS!: bigint
}
