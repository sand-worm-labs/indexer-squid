import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeTransferPerpPosToProtocol {
    constructor(props?: Partial<ExchangeTransferPerpPosToProtocol>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_transfer_perp_pos_to_protocol_block_ac688788")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_transfer_perp_pos_to_protocol_block_time_d8c1fbf1")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_transfer_perp_pos_to_protocol_perp_id_0a386fd3")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    amountCNS!: bigint
}
