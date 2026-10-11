import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeRecycleFeeToProtocol {
    constructor(props?: Partial<ExchangeRecycleFeeToProtocol>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_recycle_fee_to_protocol_block_177151ad")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_recycle_fee_to_protocol_block_time_74da60ae")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_recycle_fee_to_protocol_perp_id_e9cc5a14")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    orderId!: bigint

    @BigIntColumn_({nullable: false})
    recycleFeeCNS!: bigint

    @BigIntColumn_({nullable: false})
    recycleBalanceCNS!: bigint
}
