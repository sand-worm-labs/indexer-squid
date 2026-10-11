import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePermissonedCancelParamsUpdated {
    constructor(props?: Partial<ExchangePermissonedCancelParamsUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_permissoned_cancel_params_updated_block_3a86c8ab")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_permissoned_cancel_params_updated_block_t_15ce6bd8")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    cancelMinOrders!: bigint

    @BigIntColumn_({nullable: false})
    cancelSegment!: bigint
}
