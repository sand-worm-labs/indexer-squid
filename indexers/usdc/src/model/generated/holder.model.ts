import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Holder {
    constructor(props?: Partial<Holder>) {
        Object.assign(this, props)
    }

    /**
     * address
     */
    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    balance!: bigint

    @IntColumn_({nullable: false})
    transfersIn!: number

    @IntColumn_({nullable: false})
    transfersOut!: number
}
