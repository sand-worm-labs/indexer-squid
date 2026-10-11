import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeDcpBorrowThreshUpdated {
    constructor(props?: Partial<ExchangeDcpBorrowThreshUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_dcp_borrow_thresh_updated_block_4c8417ad")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_dcp_borrow_thresh_updated_block_time_686cadc4")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @Index_("idx_exchange_dcp_borrow_thresh_updated_perp_id_1d5acfdd")
    @BigIntColumn_({nullable: false})
    perpId!: bigint

    @BigIntColumn_({nullable: false})
    threshHdths!: bigint
}
