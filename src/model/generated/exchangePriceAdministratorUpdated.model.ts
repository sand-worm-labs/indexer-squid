import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangePriceAdministratorUpdated {
    constructor(props?: Partial<ExchangePriceAdministratorUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_price_administrator_updated_block_05f69122")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_price_administrator_updated_block_time_e2fb1196")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    priceAdministrator!: string

    @BooleanColumn_({nullable: false})
    added!: boolean
}
