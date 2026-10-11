import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeToleranceAdministratorUpdated {
    constructor(props?: Partial<ExchangeToleranceAdministratorUpdated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_tolerance_administrator_updated_block_77a4f237")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_tolerance_administrator_updated_block_tim_f2a309ea")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @StringColumn_({nullable: false})
    toleranceAdministrator!: string

    @BooleanColumn_({nullable: false})
    added!: boolean
}
