import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeWRLSThousandthsTvlUpdated {
    constructor(props?: Partial<ExchangeWRLSThousandthsTvlUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_wrls_thousandths_tvl_updated_block_f91d4bc7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_wrls_thousandths_tvl_updated_block_time_19653906")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    thousandthsTvl!: bigint
}
