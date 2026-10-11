import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeAdministratorUpdated {
    constructor(props?: Partial<ExchangeAdministratorUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_administrator_updated_block_de120bf7")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_administrator_updated_block_time_1c477ae0")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    administrator!: string

    @BooleanColumn_({nullable: false})
    added!: boolean
}
