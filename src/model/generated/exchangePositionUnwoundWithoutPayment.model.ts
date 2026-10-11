import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePositionUnwoundWithoutPayment {
    constructor(props?: Partial<ExchangePositionUnwoundWithoutPayment>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_position_unwound_without_payment_block_451ebfe7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_position_unwound_without_payment_block_ti_cb7edc06")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_position_unwound_without_payment_perp_id_215362ba")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @Index_("idx_exchange_position_unwound_without_payment_account__c4083b76")
    @BigIntColumn_({nullable: false})
    accountId!: bigint

    @BigIntColumn_({nullable: false})
    markPricePNS!: bigint

    @BigIntColumn_({nullable: false})
    positionType!: bigint

    @BigIntColumn_({nullable: false})
    pricePNS!: bigint

    @BigIntColumn_({nullable: false})
    lotLNS!: bigint

    @BigIntColumn_({nullable: false})
    depositCNS!: bigint

    @BigIntColumn_({nullable: false})
    positionFmvCNS!: bigint

    @BigIntColumn_({nullable: false})
    amountOwedCNS!: bigint
}
