import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ExchangeWithdrawRateLimitForceReset {
    constructor(props?: Partial<ExchangeWithdrawRateLimitForceReset>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_("idx_exchange_withdraw_rate_limit_force_reset_block_4c0e330f")
    @IntColumn_({nullable: false})
    block!: number

    @Index_("idx_exchange_withdraw_rate_limit_force_reset_block_tim_533f91ef")
    @DateTimeColumn_({nullable: false})
    blockTime!: Date

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    newExpiryBlock!: bigint

    @BigIntColumn_({nullable: false})
    newLimitCNS!: bigint

    @BigIntColumn_({nullable: false})
    perBlockCNS!: bigint
}
