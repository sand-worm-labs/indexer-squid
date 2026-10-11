import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeCancelExistingInvalidCloseOrders {
    constructor(props?: Partial<ExchangeCancelExistingInvalidCloseOrders>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_cancel_existing_invalid_close_orders_bloc_af41703e")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_cancel_existing_invalid_close_orders_bloc_49c8d9f2")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    lockedLotLNS!: bigint

    @BigIntColumn_({nullable: false})
    lockedPositionType!: bigint

    @BigIntColumn_({nullable: false})
    newPositionType!: bigint
}
