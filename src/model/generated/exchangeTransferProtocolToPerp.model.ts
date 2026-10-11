import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTransferProtocolToPerp {
    constructor(props?: Partial<ExchangeTransferProtocolToPerp>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_transfer_protocol_to_perp_block_d3c7fa02")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_transfer_protocol_to_perp_block_time_fcd536ac")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_transfer_protocol_to_perp_perp_id_ad911366")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint

    @BooleanColumn_({nullable: false})
    toInsuranceFund!: boolean
}
