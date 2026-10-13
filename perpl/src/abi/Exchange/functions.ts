import { address, array, bool, bytes, bytes32, fixedSizeArray, int16, int256, int48, string, struct, uint16, uint24, uint256, uint32, uint40, uint8, uint80 } from '@subsquid/evm-codec'
import { func } from '../abi.support.js'
import type { FunctionArguments, FunctionReturn } from '../abi.support.js'

/** acceptOwnership() */
export const acceptOwnership = func('0x79ba5097', {})
export type AcceptOwnershipParams = FunctionArguments<typeof acceptOwnership>
export type AcceptOwnershipReturn = FunctionReturn<typeof acceptOwnership>

/** addContract(string,string,uint256,uint256,uint256,uint256,uint256,uint256) */
export const addContract = func('0xe63f8e2f', {
    name: string,
    symbol: string,
    perpId: uint256,
    basePricePNS: uint256,
    priceDecimals: uint256,
    lotDecimals: uint256,
    initMarginFracHdths: uint256,
    maintMarginFracHdths: uint256,
})
export type AddContractParams = FunctionArguments<typeof addContract>
export type AddContractReturn = FunctionReturn<typeof addContract>

/** addressBlocked(address) */
export const addressBlocked = func('0x3bf45a2f', {
    _0: address,
}, bool)
export type AddressBlockedParams = FunctionArguments<typeof addressBlocked>
export type AddressBlockedReturn = FunctionReturn<typeof addressBlocked>

/** adminCancelOrders((uint256,uint256)[]) */
export const adminCancelOrders = func('0xe548bb57', {
    signatures: array(struct({
        perpId: uint256,
        orderId: uint256,
    })),
})
export type AdminCancelOrdersParams = FunctionArguments<typeof adminCancelOrders>
export type AdminCancelOrdersReturn = FunctionReturn<typeof adminCancelOrders>

/** allowOrderForwarding(bool) */
export const allowOrderForwarding = func('0x7962f910', {
    allow: bool,
})
export type AllowOrderForwardingParams = FunctionArguments<typeof allowOrderForwarding>
export type AllowOrderForwardingReturn = FunctionReturn<typeof allowOrderForwarding>

/** autoDeleverage((uint256,uint256,uint256[])[],bool) */
export const autoDeleverage = func('0x43559bbf', {
    adlDescs: array(struct({
        perpId: uint256,
        posAccountId: uint256,
        sortedPositionIds: array(uint256),
    })),
    revertOnFail: bool,
})
export type AutoDeleverageParams = FunctionArguments<typeof autoDeleverage>
export type AutoDeleverageReturn = FunctionReturn<typeof autoDeleverage>

/** buyLiquidations((uint256,uint256,uint256,uint256,uint256,uint256)[],bool) */
export const buyLiquidations = func('0xbbac6c95', {
    liquidationDescs: array(struct({
        perpId: uint256,
        posAccountId: uint256,
        lotLNS: uint256,
        leverageHdths: uint256,
        limitPricePNS: uint256,
        maxNegPnlCollatBPS: uint256,
    })),
    revertOnFail: bool,
})
export type BuyLiquidationsParams = FunctionArguments<typeof buyLiquidations>
export type BuyLiquidationsReturn = FunctionReturn<typeof buyLiquidations>

/** cancelDecreaseCollateralRequest(uint256) */
export const cancelDecreaseCollateralRequest = func('0xebcf1656', {
    perpId: uint256,
})
export type CancelDecreaseCollateralRequestParams = FunctionArguments<typeof cancelDecreaseCollateralRequest>
export type CancelDecreaseCollateralRequestReturn = FunctionReturn<typeof cancelDecreaseCollateralRequest>

/** clearInitUnwindContract(uint256) */
export const clearInitUnwindContract = func('0x075367f6', {
    perpId: uint256,
})
export type ClearInitUnwindContractParams = FunctionArguments<typeof clearInitUnwindContract>
export type ClearInitUnwindContractReturn = FunctionReturn<typeof clearInitUnwindContract>

/** clearOrderSlots(uint256,uint256[]) */
export const clearOrderSlots = func('0xd541abc1', {
    perpId: uint256,
    orderIds: array(uint256),
})
export type ClearOrderSlotsParams = FunctionArguments<typeof clearOrderSlots>
export type ClearOrderSlotsReturn = FunctionReturn<typeof clearOrderSlots>

/** clearPrepareUnwindContract(uint256) */
export const clearPrepareUnwindContract = func('0xb5cd004e', {
    perpId: uint256,
})
export type ClearPrepareUnwindContractParams = FunctionArguments<typeof clearPrepareUnwindContract>
export type ClearPrepareUnwindContractReturn = FunctionReturn<typeof clearPrepareUnwindContract>

/** clearPricePointerSlots(uint256,uint256[]) */
export const clearPricePointerSlots = func('0x20c801d2', {
    perpId: uint256,
    pricesONS: array(uint256),
})
export type ClearPricePointerSlotsParams = FunctionArguments<typeof clearPricePointerSlots>
export type ClearPricePointerSlotsReturn = FunctionReturn<typeof clearPricePointerSlots>

/** createAccount(uint256) */
export const createAccount = func('0xcab13915', {
    amountCNS: uint256,
}, uint256)
export type CreateAccountParams = FunctionArguments<typeof createAccount>
export type CreateAccountReturn = FunctionReturn<typeof createAccount>

/** declineDecreaseCollateralRequest(uint256,uint256,string) */
export const declineDecreaseCollateralRequest = func('0xecdff22e', {
    perpId: uint256,
    accountId: uint256,
    reason: string,
})
export type DeclineDecreaseCollateralRequestParams = FunctionArguments<typeof declineDecreaseCollateralRequest>
export type DeclineDecreaseCollateralRequestReturn = FunctionReturn<typeof declineDecreaseCollateralRequest>

/** decreasePositionCollateral(uint256,uint256,uint32,uint16,uint8) */
export const decreasePositionCollateral = func('0x5495086a', {
    perpId: uint256,
    accountId: uint256,
    impactAdjPricePNS: uint32,
    borrowMarginFracHdths: uint16,
    positionType: uint8,
})
export type DecreasePositionCollateralParams = FunctionArguments<typeof decreasePositionCollateral>
export type DecreasePositionCollateralReturn = FunctionReturn<typeof decreasePositionCollateral>

/** depositCollateral(uint256) */
export const depositCollateral = func('0xbad4a01f', {
    amountCNS: uint256,
})
export type DepositCollateralParams = FunctionArguments<typeof depositCollateral>
export type DepositCollateralReturn = FunctionReturn<typeof depositCollateral>

/** depositToProtocol(uint256) */
export const depositToProtocol = func('0x54056119', {
    amountCNS: uint256,
})
export type DepositToProtocolParams = FunctionArguments<typeof depositToProtocol>
export type DepositToProtocolReturn = FunctionReturn<typeof depositToProtocol>

/** execFwdPositionOps((uint256,uint256,(uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256),bool,uint256,uint8,uint256,uint256)[]) */
export const execFwdPositionOps = func('0x0f6795d9', {
    forwardedOrders: array(struct({
        accountId: uint256,
        feePer100K: uint256,
        orderDesc: struct({
            orderDescId: uint256,
            perpId: uint256,
            orderType: uint8,
            orderId: uint256,
            pricePNS: uint256,
            lotLNS: uint256,
            expiryBlock: uint256,
            postOnly: bool,
            fillOrKill: bool,
            immediateOrCancel: bool,
            maxMatches: uint256,
            leverageHdths: uint256,
            lastExecutionBlock: uint256,
            amountCNS: uint256,
            maxNegPnlCollatBPS: uint256,
        }),
        execTriggerOrder: bool,
        triggerPricePNS: uint256,
        triggerPriceCondition: uint8,
        triggerRequestId: uint256,
        triggerPositionId: uint256,
    })),
}, array(struct({
    perpId: uint256,
    orderId: uint256,
})))
export type ExecFwdPositionOpsParams = FunctionArguments<typeof execFwdPositionOps>
export type ExecFwdPositionOpsReturn = FunctionReturn<typeof execFwdPositionOps>

/** execFwdPositionOpsV2((uint256,uint256,(uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256),bool,uint256,uint8,uint256,uint256)[],bytes[]) */
export const execFwdPositionOpsV2 = func('0xcffefd2e', {
    forwardedOrders: array(struct({
        accountId: uint256,
        feePer100K: uint256,
        orderDesc: struct({
            orderDescId: uint256,
            perpId: uint256,
            orderType: uint8,
            orderId: uint256,
            pricePNS: uint256,
            lotLNS: uint256,
            expiryBlock: uint256,
            postOnly: bool,
            fillOrKill: bool,
            immediateOrCancel: bool,
            maxMatches: uint256,
            leverageHdths: uint256,
            lastExecutionBlock: uint256,
            amountCNS: uint256,
            maxNegPnlCollatBPS: uint256,
        }),
        execTriggerOrder: bool,
        triggerPricePNS: uint256,
        triggerPriceCondition: uint8,
        triggerRequestId: uint256,
        triggerPositionId: uint256,
    })),
    extensions: array(bytes),
}, array(struct({
    perpId: uint256,
    orderId: uint256,
})))
export type ExecFwdPositionOpsV2Params = FunctionArguments<typeof execFwdPositionOpsV2>
export type ExecFwdPositionOpsV2Return = FunctionReturn<typeof execFwdPositionOpsV2>

/** execFznAccountPosOps((uint256,(uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256))[]) */
export const execFznAccountPosOps = func('0x768f6855', {
    fznAccountCloseOrders: array(struct({
        accountId: uint256,
        orderDesc: struct({
            orderDescId: uint256,
            perpId: uint256,
            orderType: uint8,
            orderId: uint256,
            pricePNS: uint256,
            lotLNS: uint256,
            expiryBlock: uint256,
            postOnly: bool,
            fillOrKill: bool,
            immediateOrCancel: bool,
            maxMatches: uint256,
            leverageHdths: uint256,
            lastExecutionBlock: uint256,
            amountCNS: uint256,
            maxNegPnlCollatBPS: uint256,
        }),
    })),
})
export type ExecFznAccountPosOpsParams = FunctionArguments<typeof execFznAccountPosOps>
export type ExecFznAccountPosOpsReturn = FunctionReturn<typeof execFznAccountPosOps>

/** execOrder((uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256)) */
export const execOrder = func('0x4d8dc985', {
    orderDesc: struct({
        orderDescId: uint256,
        perpId: uint256,
        orderType: uint8,
        orderId: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        expiryBlock: uint256,
        postOnly: bool,
        fillOrKill: bool,
        immediateOrCancel: bool,
        maxMatches: uint256,
        leverageHdths: uint256,
        lastExecutionBlock: uint256,
        amountCNS: uint256,
        maxNegPnlCollatBPS: uint256,
    }),
}, struct({
    perpId: uint256,
    orderId: uint256,
}))
export type ExecOrderParams = FunctionArguments<typeof execOrder>
export type ExecOrderReturn = FunctionReturn<typeof execOrder>

/** execOrderV2((uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256),bytes) */
export const execOrderV2 = func('0x28d18da3', {
    orderDesc: struct({
        orderDescId: uint256,
        perpId: uint256,
        orderType: uint8,
        orderId: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        expiryBlock: uint256,
        postOnly: bool,
        fillOrKill: bool,
        immediateOrCancel: bool,
        maxMatches: uint256,
        leverageHdths: uint256,
        lastExecutionBlock: uint256,
        amountCNS: uint256,
        maxNegPnlCollatBPS: uint256,
    }),
    extension: bytes,
}, struct({
    perpId: uint256,
    orderId: uint256,
}))
export type ExecOrderV2Params = FunctionArguments<typeof execOrderV2>
export type ExecOrderV2Return = FunctionReturn<typeof execOrderV2>

/** execOrders((uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256)[],bool) */
export const execOrders = func('0x39435dac', {
    orderDescs: array(struct({
        orderDescId: uint256,
        perpId: uint256,
        orderType: uint8,
        orderId: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        expiryBlock: uint256,
        postOnly: bool,
        fillOrKill: bool,
        immediateOrCancel: bool,
        maxMatches: uint256,
        leverageHdths: uint256,
        lastExecutionBlock: uint256,
        amountCNS: uint256,
        maxNegPnlCollatBPS: uint256,
    })),
    revertOnFail: bool,
}, array(struct({
    perpId: uint256,
    orderId: uint256,
})))
export type ExecOrdersParams = FunctionArguments<typeof execOrders>
export type ExecOrdersReturn = FunctionReturn<typeof execOrders>

/** execOrdersV2((uint256,uint256,uint8,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256)[],bool,bytes[]) */
export const execOrdersV2 = func('0x81e54cba', {
    orderDescs: array(struct({
        orderDescId: uint256,
        perpId: uint256,
        orderType: uint8,
        orderId: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        expiryBlock: uint256,
        postOnly: bool,
        fillOrKill: bool,
        immediateOrCancel: bool,
        maxMatches: uint256,
        leverageHdths: uint256,
        lastExecutionBlock: uint256,
        amountCNS: uint256,
        maxNegPnlCollatBPS: uint256,
    })),
    revertOnFail: bool,
    extensions: array(bytes),
}, array(struct({
    perpId: uint256,
    orderId: uint256,
})))
export type ExecOrdersV2Params = FunctionArguments<typeof execOrdersV2>
export type ExecOrdersV2Return = FunctionReturn<typeof execOrdersV2>

/** execPerpOps((uint256,uint256,uint8,uint32,int256,bool,bytes)[]) */
export const execPerpOps = func('0x5bf9264c', {
    operations: array(struct({
        opDescId: uint256,
        perpId: uint256,
        opType: uint8,
        pricePNS: uint32,
        fundingRatePct100k: int256,
        allowOverwrite: bool,
        unverifiedReport: bytes,
    })),
})
export type ExecPerpOpsParams = FunctionArguments<typeof execPerpOps>
export type ExecPerpOpsReturn = FunctionReturn<typeof execPerpOps>

/** forceClose(uint256,uint256,uint256[],bool) */
export const forceClose = func('0xb216d0d2', {
    perpId: uint256,
    posAccountId: uint256,
    sortedPositionIds: array(uint256),
    revertOnFail: bool,
}, bool)
export type ForceCloseParams = FunctionArguments<typeof forceClose>
export type ForceCloseReturn = FunctionReturn<typeof forceClose>

/** forceResetWithdrawRateLimit() */
export const forceResetWithdrawRateLimit = func('0xbed97b71', {})
export type ForceResetWithdrawRateLimitParams = FunctionArguments<typeof forceResetWithdrawRateLimit>
export type ForceResetWithdrawRateLimitReturn = FunctionReturn<typeof forceResetWithdrawRateLimit>

/** getAccountByAddr(address) */
export const getAccountByAddr = func('0x12e8eb2c', {
    accountAddress: address,
}, struct({
    accountId: uint256,
    balanceCNS: uint256,
    lockedBalanceCNS: uint256,
    frozen: uint8,
    accountAddr: address,
    positions: struct({
        bank1: uint256,
        bank2: uint256,
        bank3: uint256,
        bank4: uint256,
    }),
}))
export type GetAccountByAddrParams = FunctionArguments<typeof getAccountByAddr>
export type GetAccountByAddrReturn = FunctionReturn<typeof getAccountByAddr>

/** getAccountById(uint256) */
export const getAccountById = func('0x05aca141', {
    accountId: uint256,
}, struct({
    accountId: uint256,
    balanceCNS: uint256,
    lockedBalanceCNS: uint256,
    frozen: uint8,
    accountAddr: address,
    positions: struct({
        bank1: uint256,
        bank2: uint256,
        bank3: uint256,
        bank4: uint256,
    }),
}))
export type GetAccountByIdParams = FunctionArguments<typeof getAccountById>
export type GetAccountByIdReturn = FunctionReturn<typeof getAccountById>

/** getAccountFeeTier(uint256) */
export const getAccountFeeTier = func('0x64155a54', {
    accountId: uint256,
}, uint256)
export type GetAccountFeeTierParams = FunctionArguments<typeof getAccountFeeTier>
export type GetAccountFeeTierReturn = FunctionReturn<typeof getAccountFeeTier>

/** getContractVersion() */
export const getContractVersion = func('0x8aa10435', {}, struct({
    major: uint256,
    minor: uint256,
    patch: uint256,
}))
export type GetContractVersionParams = FunctionArguments<typeof getContractVersion>
export type GetContractVersionReturn = FunctionReturn<typeof getContractVersion>

/** getDefaultPerpFeeSchedule() */
export const getDefaultPerpFeeSchedule = func('0xaa383fe6', {}, struct({
    takerFeesPer100K: fixedSizeArray(uint256, 8),
    makerFeesPer100K: fixedSizeArray(uint256, 8),
}))
export type GetDefaultPerpFeeScheduleParams = FunctionArguments<typeof getDefaultPerpFeeSchedule>
export type GetDefaultPerpFeeScheduleReturn = FunctionReturn<typeof getDefaultPerpFeeSchedule>

/** getExchangeInfo() */
export const getExchangeInfo = func('0x8bc5b3c5', {}, struct({
    balanceCNS: uint256,
    protocolBalanceCNS: uint256,
    recycleBalanceCNS: uint256,
    collateralDecimals: uint256,
    collateralToken: address,
    verifierProxy: address,
}))
export type GetExchangeInfoParams = FunctionArguments<typeof getExchangeInfo>
export type GetExchangeInfoReturn = FunctionReturn<typeof getExchangeInfo>

/** getFeeScheduleById(uint256) */
export const getFeeScheduleById = func('0x332c75a5', {
    feeSchedId: uint256,
}, struct({
    takerFeesPer100K: fixedSizeArray(uint256, 8),
    makerFeesPer100K: fixedSizeArray(uint256, 8),
}))
export type GetFeeScheduleByIdParams = FunctionArguments<typeof getFeeScheduleById>
export type GetFeeScheduleByIdReturn = FunctionReturn<typeof getFeeScheduleById>

/** getFundingInterval() */
export const getFundingInterval = func('0x0d3e87a7', {}, uint256)
export type GetFundingIntervalParams = FunctionArguments<typeof getFundingInterval>
export type GetFundingIntervalReturn = FunctionReturn<typeof getFundingInterval>

/** getFundingSumAtBlock(uint256,uint256) */
export const getFundingSumAtBlock = func('0x7dd7e759', {
    perpId: uint256,
    blockNumber: uint256,
}, struct({
    fundingSumPNS: int48,
    fundingEventBlock: uint256,
}))
export type GetFundingSumAtBlockParams = FunctionArguments<typeof getFundingSumAtBlock>
export type GetFundingSumAtBlockReturn = FunctionReturn<typeof getFundingSumAtBlock>

/** getInsuranceProtocolSplit(uint256) */
export const getInsuranceProtocolSplit = func('0x99899897', {
    perpId: uint256,
}, struct({
    insAmtPer100K: uint256,
    protAmtPer100K: uint256,
}))
export type GetInsuranceProtocolSplitParams = FunctionArguments<typeof getInsuranceProtocolSplit>
export type GetInsuranceProtocolSplitReturn = FunctionReturn<typeof getInsuranceProtocolSplit>

/** getLiquidationInfo(uint256) */
export const getLiquidationInfo = func('0x50ef5c35', {
    perpId: uint256,
}, struct({
    liqInsAmtPer100K: uint256,
    liqUserAmtPer100K: uint256,
    liqProtocolAmtPer100K: uint256,
    btlPriceThreshPer100K: uint256,
    btlInsAmtPer100K: uint256,
    btlUserAmtPer100K: uint256,
    btlBuyerAmtPer100K: uint256,
    btlProtocolAmtPer100K: uint256,
    btlRestrictBuyers: bool,
}))
export type GetLiquidationInfoParams = FunctionArguments<typeof getLiquidationInfo>
export type GetLiquidationInfoReturn = FunctionReturn<typeof getLiquidationInfo>

/** getMakerFee(uint256) */
export const getMakerFee = func('0x1275d14c', {
    perpId: uint256,
}, uint256)
export type GetMakerFeeParams = FunctionArguments<typeof getMakerFee>
export type GetMakerFeeReturn = FunctionReturn<typeof getMakerFee>

/** getMarginFractions(uint256,uint256) */
export const getMarginFractions = func('0x6825e9e5', {
    perpId: uint256,
    lotLNS: uint256,
}, struct({
    perpInitMarginFracHdths: uint256,
    perpMaintMarginFracHdths: uint256,
    dynamicInitMarginFracHdths: uint256,
    oiMaxLNS: uint256,
    unityDescentThreshHdths: uint256,
    overColDescentThreshHdths: uint256,
}))
export type GetMarginFractionsParams = FunctionArguments<typeof getMarginFractions>
export type GetMarginFractionsReturn = FunctionReturn<typeof getMarginFractions>

/** getMinAccountOpenCNS() */
export const getMinAccountOpenCNS = func('0xdec92b69', {}, uint256)
export type GetMinAccountOpenCNSParams = FunctionArguments<typeof getMinAccountOpenCNS>
export type GetMinAccountOpenCNSReturn = FunctionReturn<typeof getMinAccountOpenCNS>

/** getMinimumPostCNS() */
export const getMinimumPostCNS = func('0x9fffdfe2', {}, uint256)
export type GetMinimumPostCNSParams = FunctionArguments<typeof getMinimumPostCNS>
export type GetMinimumPostCNSReturn = FunctionReturn<typeof getMinimumPostCNS>

/** getMinimumSettleCNS() */
export const getMinimumSettleCNS = func('0x3a63dabe', {}, uint256)
export type GetMinimumSettleCNSParams = FunctionArguments<typeof getMinimumSettleCNS>
export type GetMinimumSettleCNSReturn = FunctionReturn<typeof getMinimumSettleCNS>

/** getNextPriceAboveWithOrders(uint256,uint256) */
export const getNextPriceAboveWithOrders = func('0x9b170bd1', {
    perpId: uint256,
    priceONS: uint256,
}, uint256)
export type GetNextPriceAboveWithOrdersParams = FunctionArguments<typeof getNextPriceAboveWithOrders>
export type GetNextPriceAboveWithOrdersReturn = FunctionReturn<typeof getNextPriceAboveWithOrders>

/** getNextPriceBelowWithOrders(uint256,uint256) */
export const getNextPriceBelowWithOrders = func('0xfb455f6b', {
    perpId: uint256,
    priceONS: uint256,
}, uint256)
export type GetNextPriceBelowWithOrdersParams = FunctionArguments<typeof getNextPriceBelowWithOrders>
export type GetNextPriceBelowWithOrdersReturn = FunctionReturn<typeof getNextPriceBelowWithOrders>

/** getOrder(uint256,uint256) */
export const getOrder = func('0x5e1a3573', {
    perpId: uint256,
    orderId: uint256,
}, struct({
    accountId: uint32,
    orderType: uint8,
    priceONS: uint24,
    lotLNS: uint40,
    recycleFeeRaw: uint16,
    expiryBlock: uint32,
    leverageHdths: uint16,
    orderId: uint16,
    prevOrderId: uint16,
    nextOrderId: uint16,
    maxNegPnlCollatBPS: uint16,
}))
export type GetOrderParams = FunctionArguments<typeof getOrder>
export type GetOrderReturn = FunctionReturn<typeof getOrder>

/** getOrderIdIndex(uint256) */
export const getOrderIdIndex = func('0x38ecd885', {
    perpId: uint256,
}, struct({
    root: uint256,
    leaves: array(uint256),
    numOrders: uint256,
}))
export type GetOrderIdIndexParams = FunctionArguments<typeof getOrderIdIndex>
export type GetOrderIdIndexReturn = FunctionReturn<typeof getOrderIdIndex>

/** getOrderLocks(uint256) */
export const getOrderLocks = func('0x8c1c2cef', {
    accountId: uint256,
}, array(struct({
    orderLockId: uint32,
    nextOrderLockId: uint32,
    prevOrderLockId: uint32,
    orderType: uint8,
    lotLNS: uint40,
    amountCNS: uint80,
})))
export type GetOrderLocksParams = FunctionArguments<typeof getOrderLocks>
export type GetOrderLocksReturn = FunctionReturn<typeof getOrderLocks>

/** getOrderV2(uint256,uint256) */
export const getOrderV2 = func('0xf1a03e2b', {
    perpId: uint256,
    orderId: uint256,
}, struct({
    accountId: uint32,
    orderType: uint8,
    priceONS: uint24,
    lotLNS: uint40,
    recycleFeeRaw: uint16,
    expiryBlock: uint32,
    leverageHdths: uint16,
    orderId: uint16,
    prevOrderId: uint16,
    nextOrderId: uint16,
    maxNegPnlCollatBPS: uint16,
    builderId: uint8,
    builderFeePer100K: uint16,
}))
export type GetOrderV2Params = FunctionArguments<typeof getOrderV2>
export type GetOrderV2Return = FunctionReturn<typeof getOrderV2>

/** getOrdersAtPriceLevel(uint256,uint256,uint256,uint256) */
export const getOrdersAtPriceLevel = func('0x4d3282b4', {
    perpId: uint256,
    priceONS: uint256,
    pageStartOrderId: uint256,
    ordersPerPage: uint256,
}, struct({
    ordersAtPriceLevel: array(struct({
        accountId: uint32,
        orderType: uint8,
        priceONS: uint24,
        lotLNS: uint40,
        recycleFeeRaw: uint16,
        expiryBlock: uint32,
        leverageHdths: uint16,
        orderId: uint16,
        prevOrderId: uint16,
        nextOrderId: uint16,
        maxNegPnlCollatBPS: uint16,
    })),
    numOrders: uint256,
}))
export type GetOrdersAtPriceLevelParams = FunctionArguments<typeof getOrdersAtPriceLevel>
export type GetOrdersAtPriceLevelReturn = FunctionReturn<typeof getOrdersAtPriceLevel>

/** getOwner() */
export const getOwner = func('0x893d20e8', {}, address)
export type GetOwnerParams = FunctionArguments<typeof getOwner>
export type GetOwnerReturn = FunctionReturn<typeof getOwner>

/** getPermissionedCancelParams(uint256) */
export const getPermissionedCancelParams = func('0x396d7e47', {
    perpId: uint256,
}, struct({
    permCancelMinOrders: uint256,
    permCancelSegment: uint256,
}))
export type GetPermissionedCancelParamsParams = FunctionArguments<typeof getPermissionedCancelParams>
export type GetPermissionedCancelParamsReturn = FunctionReturn<typeof getPermissionedCancelParams>

/** getPerpFeeSchedule(uint256) */
export const getPerpFeeSchedule = func('0x414bd869', {
    perpId: uint256,
}, struct({
    feeSchedId: uint256,
    takerFeesPer100K: fixedSizeArray(uint256, 8),
    makerFeesPer100K: fixedSizeArray(uint256, 8),
}))
export type GetPerpFeeScheduleParams = FunctionArguments<typeof getPerpFeeSchedule>
export type GetPerpFeeScheduleReturn = FunctionReturn<typeof getPerpFeeSchedule>

/** getPerpOrderLocks(uint256,uint256) */
export const getPerpOrderLocks = func('0x2709b746', {
    accountId: uint256,
    perpId: uint256,
}, array(struct({
    orderLockId: uint32,
    nextOrderLockId: uint32,
    prevOrderLockId: uint32,
    orderType: uint8,
    lotLNS: uint40,
    amountCNS: uint80,
})))
export type GetPerpOrderLocksParams = FunctionArguments<typeof getPerpOrderLocks>
export type GetPerpOrderLocksReturn = FunctionReturn<typeof getPerpOrderLocks>

/** getPerpetualExistsBitmap() */
export const getPerpetualExistsBitmap = func('0x4349b379', {}, fixedSizeArray(uint256, 4))
export type GetPerpetualExistsBitmapParams = FunctionArguments<typeof getPerpetualExistsBitmap>
export type GetPerpetualExistsBitmapReturn = FunctionReturn<typeof getPerpetualExistsBitmap>

/** getPerpetualInfo(uint256) */
export const getPerpetualInfo = func('0x00092cce', {
    perpId: uint256,
}, struct({
    name: string,
    symbol: string,
    priceDecimals: uint256,
    lotDecimals: uint256,
    linkFeedId: bytes32,
    priceTolPer100K: uint256,
    marginTol: uint256,
    marginTolDecimals: uint256,
    refPriceMaxAgeSec: uint256,
    positionBalanceCNS: uint256,
    insuranceBalanceCNS: uint256,
    markPNS: uint256,
    markTimestamp: uint256,
    lastPNS: uint256,
    lastTimestamp: uint256,
    oraclePNS: uint256,
    oracleTimestampSec: uint256,
    longOpenInterestLNS: uint256,
    shortOpenInterestLNS: uint256,
    fundingStartBlock: uint256,
    fundingRatePct100k: int16,
    absFundingClampPctPer100K: uint256,
    status: uint8,
    basePricePNS: uint256,
    maxBidPriceONS: uint256,
    minBidPriceONS: uint256,
    maxAskPriceONS: uint256,
    minAskPriceONS: uint256,
    numOrders: uint256,
    ignOracle: bool,
}))
export type GetPerpetualInfoParams = FunctionArguments<typeof getPerpetualInfo>
export type GetPerpetualInfoReturn = FunctionReturn<typeof getPerpetualInfo>

/** getPerpetualInfoV2(uint256) */
export const getPerpetualInfoV2 = func('0x9b335b9e', {
    perpId: uint256,
}, struct({
    name: string,
    symbol: string,
    priceDecimals: uint256,
    lotDecimals: uint256,
    linkFeedId: bytes32,
    priceTolPer100K: uint256,
    marginTol: uint256,
    marginTolDecimals: uint256,
    refPriceMaxAgeSec: uint256,
    positionBalanceCNS: uint256,
    insuranceBalanceCNS: uint256,
    markPNS: uint256,
    markTimestamp: uint256,
    lastPNS: uint256,
    lastTimestamp: uint256,
    oraclePNS: uint256,
    oracleTimestampSec: uint256,
    longOpenInterestLNS: uint256,
    shortOpenInterestLNS: uint256,
    fundingStartBlock: uint256,
    fundingRatePct100k: int16,
    absFundingClampPctPer100K: uint256,
    status: uint8,
    basePricePNS: uint256,
    maxBidPriceONS: uint256,
    minBidPriceONS: uint256,
    maxAskPriceONS: uint256,
    minAskPriceONS: uint256,
    numOrders: uint256,
    ignOracle: bool,
    fundingSumScalingExp: uint256,
}))
export type GetPerpetualInfoV2Params = FunctionArguments<typeof getPerpetualInfoV2>
export type GetPerpetualInfoV2Return = FunctionReturn<typeof getPerpetualInfoV2>

/** getPosition(uint256,uint256) */
export const getPosition = func('0x751de421', {
    perpId: uint256,
    accountId: uint256,
}, struct({
    positionInfo: struct({
        accountId: uint256,
        nextNodeId: uint256,
        prevNodeId: uint256,
        positionType: uint8,
        depositCNS: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        entryBlock: uint256,
        pnlCNS: int256,
        deltaPnlCNS: int256,
        premiumPnlCNS: int256,
    }),
    markPricePNS: uint256,
    markPriceValid: bool,
}))
export type GetPositionParams = FunctionArguments<typeof getPosition>
export type GetPositionReturn = FunctionReturn<typeof getPosition>

/** getPositionIds(uint256) */
export const getPositionIds = func('0x1973c619', {
    perpId: uint256,
}, struct({
    startNodeId: uint256,
    endNodeId: uint256,
}))
export type GetPositionIdsParams = FunctionArguments<typeof getPositionIds>
export type GetPositionIdsReturn = FunctionReturn<typeof getPositionIds>

/** getPositionV2(uint256,uint256) */
export const getPositionV2 = func('0xea3196ec', {
    perpId: uint256,
    accountId: uint256,
}, struct({
    positionInfo: struct({
        accountId: uint256,
        nextNodeId: uint256,
        prevNodeId: uint256,
        positionType: uint8,
        depositCNS: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        entryBlock: uint256,
        pnlCNS: int256,
        deltaPnlCNS: int256,
        premiumPnlCNS: int256,
        priceResiduePNSQ16: uint256,
    }),
    markPricePNS: uint256,
    markPriceValid: bool,
}))
export type GetPositionV2Params = FunctionArguments<typeof getPositionV2>
export type GetPositionV2Return = FunctionReturn<typeof getPositionV2>

/** getPositions(uint256,uint256,uint256) */
export const getPositions = func('0x4a9a4158', {
    perpId: uint256,
    pageStartPositionId: uint256,
    positionsPerPage: uint256,
}, struct({
    positions: array(struct({
        accountId: uint256,
        nextNodeId: uint256,
        prevNodeId: uint256,
        positionType: uint8,
        depositCNS: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        entryBlock: uint256,
        pnlCNS: int256,
        deltaPnlCNS: int256,
        premiumPnlCNS: int256,
    })),
    numPositions: uint256,
    markPricePNS: uint256,
    markPriceValid: bool,
}))
export type GetPositionsParams = FunctionArguments<typeof getPositions>
export type GetPositionsReturn = FunctionReturn<typeof getPositions>

/** getPositionsV2(uint256,uint256,uint256) */
export const getPositionsV2 = func('0x92e19126', {
    perpId: uint256,
    pageStartPositionId: uint256,
    positionsPerPage: uint256,
}, struct({
    positions: array(struct({
        accountId: uint256,
        nextNodeId: uint256,
        prevNodeId: uint256,
        positionType: uint8,
        depositCNS: uint256,
        pricePNS: uint256,
        lotLNS: uint256,
        entryBlock: uint256,
        pnlCNS: int256,
        deltaPnlCNS: int256,
        premiumPnlCNS: int256,
        priceResiduePNSQ16: uint256,
    })),
    numPositions: uint256,
    markPricePNS: uint256,
    markPriceValid: bool,
}))
export type GetPositionsV2Params = FunctionArguments<typeof getPositionsV2>
export type GetPositionsV2Return = FunctionReturn<typeof getPositionsV2>

/** getPriceLevelOrderIds(uint256,uint256) */
export const getPriceLevelOrderIds = func('0x653a6bd7', {
    perpId: uint256,
    priceONS: uint256,
}, struct({
    startOrderId: uint256,
    endOrderId: uint256,
}))
export type GetPriceLevelOrderIdsParams = FunctionArguments<typeof getPriceLevelOrderIds>
export type GetPriceLevelOrderIdsReturn = FunctionReturn<typeof getPriceLevelOrderIds>

/** getProtocolBalanceCNS() */
export const getProtocolBalanceCNS = func('0xb5fcf762', {}, uint256)
export type GetProtocolBalanceCNSParams = FunctionArguments<typeof getProtocolBalanceCNS>
export type GetProtocolBalanceCNSReturn = FunctionReturn<typeof getProtocolBalanceCNS>

/** getRecycleBalanceCNS() */
export const getRecycleBalanceCNS = func('0xedb1314e', {}, uint256)
export type GetRecycleBalanceCNSParams = FunctionArguments<typeof getRecycleBalanceCNS>
export type GetRecycleBalanceCNSReturn = FunctionReturn<typeof getRecycleBalanceCNS>

/** getRecycleFeeCNS() */
export const getRecycleFeeCNS = func('0x16a483ea', {}, uint256)
export type GetRecycleFeeCNSParams = FunctionArguments<typeof getRecycleFeeCNS>
export type GetRecycleFeeCNSReturn = FunctionReturn<typeof getRecycleFeeCNS>

/** getTakerFee(uint256) */
export const getTakerFee = func('0x4119f930', {
    perpId: uint256,
}, uint256)
export type GetTakerFeeParams = FunctionArguments<typeof getTakerFee>
export type GetTakerFeeReturn = FunctionReturn<typeof getTakerFee>

/** getUnwindInfo(uint256) */
export const getUnwindInfo = func('0x6728641b', {
    perpId: uint256,
}, struct({
    status: uint8,
    unwindSumPositiveFmvCNS: uint256,
    unwindInitPosBalCNS: uint256,
}))
export type GetUnwindInfoParams = FunctionArguments<typeof getUnwindInfo>
export type GetUnwindInfoReturn = FunctionReturn<typeof getUnwindInfo>

/** getVolumeAtBookPrice(uint256,uint256) */
export const getVolumeAtBookPrice = func('0xfe37fe12', {
    perpId: uint256,
    priceONS: uint256,
}, struct({
    bids: uint256,
    expBids: uint256,
    asks: uint256,
    expAsks: uint256,
}))
export type GetVolumeAtBookPriceParams = FunctionArguments<typeof getVolumeAtBookPrice>
export type GetVolumeAtBookPriceReturn = FunctionReturn<typeof getVolumeAtBookPrice>

/** getWithdrawAllowanceData(uint256) */
export const getWithdrawAllowanceData = func('0x8bcf1b27', {
    blockNumber: uint256,
}, struct({
    allowanceCNS: uint256,
    expiryBlock: uint256,
    lastAllowanceBlock: uint256,
    cnsPerBlock: uint256,
}))
export type GetWithdrawAllowanceDataParams = FunctionArguments<typeof getWithdrawAllowanceData>
export type GetWithdrawAllowanceDataReturn = FunctionReturn<typeof getWithdrawAllowanceData>

/** increasePositionCollateral(uint256,uint256) */
export const increasePositionCollateral = func('0xf769f0d3', {
    perpId: uint256,
    amountCNS: uint256,
})
export type IncreasePositionCollateralParams = FunctionArguments<typeof increasePositionCollateral>
export type IncreasePositionCollateralReturn = FunctionReturn<typeof increasePositionCollateral>

/** initUnwindContract(uint256,uint256) */
export const initUnwindContract = func('0xa5e9c411', {
    perpId: uint256,
    sumPositiveFmvCNS: uint256,
})
export type InitUnwindContractParams = FunctionArguments<typeof initUnwindContract>
export type InitUnwindContractReturn = FunctionReturn<typeof initUnwindContract>

/** initialize(address) */
export const initialize = func('0xc4d66de8', {
    collateralToken: address,
})
export type InitializeParams = FunctionArguments<typeof initialize>
export type InitializeReturn = FunctionReturn<typeof initialize>

/** initializeV2((uint256,uint256)[],(uint256,uint256)[]) */
export const initializeV2 = func('0x065db330', {
    configs: array(struct({
        perpId: uint256,
        fundingSumScalingExp: uint256,
    })),
    residueTransfers: array(struct({
        perpId: uint256,
        residueAmountCNS: uint256,
    })),
})
export type InitializeV2Params = FunctionArguments<typeof initializeV2>
export type InitializeV2Return = FunctionReturn<typeof initializeV2>

/** initializeV3(uint256[8],uint256[8],uint256[8],uint256[8],uint256[]) */
export const initializeV3 = func('0x63139803', {
    defaultTakerFeesPer100K: fixedSizeArray(uint256, 8),
    defaultMakerFeesPer100K: fixedSizeArray(uint256, 8),
    rwaTakerFeesPer100K: fixedSizeArray(uint256, 8),
    rwaMakerFeesPer100K: fixedSizeArray(uint256, 8),
    existingPerpIds: array(uint256),
})
export type InitializeV3Params = FunctionArguments<typeof initializeV3>
export type InitializeV3Return = FunctionReturn<typeof initializeV3>

/** initializeV4(uint256[8],uint256[8],uint256) */
export const initializeV4 = func('0xaaeef8c0', {
    expectedOldTakerFees: fixedSizeArray(uint256, 8),
    expectedOldMakerFees: fixedSizeArray(uint256, 8),
    expectedNonZeroSchedCount: uint256,
})
export type InitializeV4Params = FunctionArguments<typeof initializeV4>
export type InitializeV4Return = FunctionReturn<typeof initializeV4>

/** isAdministrator(address) */
export const isAdministrator = func('0x0a2eb301', {
    anAddress: address,
}, bool)
export type IsAdministratorParams = FunctionArguments<typeof isAdministrator>
export type IsAdministratorReturn = FunctionReturn<typeof isAdministrator>

/** isHalted() */
export const isHalted = func('0xc7ff1584', {}, bool)
export type IsHaltedParams = FunctionArguments<typeof isHalted>
export type IsHaltedReturn = FunctionReturn<typeof isHalted>

/** isLiquidationBuyer(address) */
export const isLiquidationBuyer = func('0xae0d4442', {
    anAddress: address,
}, bool)
export type IsLiquidationBuyerParams = FunctionArguments<typeof isLiquidationBuyer>
export type IsLiquidationBuyerReturn = FunctionReturn<typeof isLiquidationBuyer>

/** isPositionAdministrator(address) */
export const isPositionAdministrator = func('0xdbfbf7e8', {
    anAddress: address,
}, bool)
export type IsPositionAdministratorParams = FunctionArguments<typeof isPositionAdministrator>
export type IsPositionAdministratorReturn = FunctionReturn<typeof isPositionAdministrator>

/** isPriceAdministrator(address) */
export const isPriceAdministrator = func('0xd8b44268', {
    anAddress: address,
}, bool)
export type IsPriceAdministratorParams = FunctionArguments<typeof isPriceAdministrator>
export type IsPriceAdministratorReturn = FunctionReturn<typeof isPriceAdministrator>

/** isToleranceAdministrator(address) */
export const isToleranceAdministrator = func('0xa87041d1', {
    anAddress: address,
}, bool)
export type IsToleranceAdministratorParams = FunctionArguments<typeof isToleranceAdministrator>
export type IsToleranceAdministratorReturn = FunctionReturn<typeof isToleranceAdministrator>

/** liquidation((uint256,uint256,uint256,bool)) */
export const liquidation = func('0xbbf979ac', {
    liquidationDesc: struct({
        perpId: uint256,
        posAccountId: uint256,
        lotLNS: uint256,
        userProceedsToPosition: bool,
    }),
})
export type LiquidationParams = FunctionArguments<typeof liquidation>
export type LiquidationReturn = FunctionReturn<typeof liquidation>

/** liquidations((uint256,uint256,uint256,bool)[],bool) */
export const liquidations = func('0xd3b8c49d', {
    liquidationDescs: array(struct({
        perpId: uint256,
        posAccountId: uint256,
        lotLNS: uint256,
        userProceedsToPosition: bool,
    })),
    revertOnFail: bool,
})
export type LiquidationsParams = FunctionArguments<typeof liquidations>
export type LiquidationsReturn = FunctionReturn<typeof liquidations>

/** numberOfAccounts() */
export const numberOfAccounts = func('0x0f03e4c3', {}, uint256)
export type NumberOfAccountsParams = FunctionArguments<typeof numberOfAccounts>
export type NumberOfAccountsReturn = FunctionReturn<typeof numberOfAccounts>

/** owner() */
export const owner = func('0x8da5cb5b', {}, address)
export type OwnerParams = FunctionArguments<typeof owner>
export type OwnerReturn = FunctionReturn<typeof owner>

/** pauseContract(uint256) */
export const pauseContract = func('0xc2852f38', {
    perpId: uint256,
})
export type PauseContractParams = FunctionArguments<typeof pauseContract>
export type PauseContractReturn = FunctionReturn<typeof pauseContract>

/** pauseContractByMonitor(uint256) */
export const pauseContractByMonitor = func('0xec4cba83', {
    perpId: uint256,
})
export type PauseContractByMonitorParams = FunctionArguments<typeof pauseContractByMonitor>
export type PauseContractByMonitorReturn = FunctionReturn<typeof pauseContractByMonitor>

/** pendingOwner() */
export const pendingOwner = func('0xe30c3978', {}, address)
export type PendingOwnerParams = FunctionArguments<typeof pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof pendingOwner>

/** perpetualExists(uint256) */
export const perpetualExists = func('0x5b8371ae', {
    perpId: uint256,
}, bool)
export type PerpetualExistsParams = FunctionArguments<typeof perpetualExists>
export type PerpetualExistsReturn = FunctionReturn<typeof perpetualExists>

/** prepareUnwindContract(uint256) */
export const prepareUnwindContract = func('0xe5631c9e', {
    perpId: uint256,
})
export type PrepareUnwindContractParams = FunctionArguments<typeof prepareUnwindContract>
export type PrepareUnwindContractReturn = FunctionReturn<typeof prepareUnwindContract>

/** proxiableUUID() */
export const proxiableUUID = func('0x52d1902d', {}, bytes32)
export type ProxiableUUIDParams = FunctionArguments<typeof proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof proxiableUUID>

/** removeContract(uint256) */
export const removeContract = func('0x7cca3b06', {
    perpId: uint256,
})
export type RemoveContractParams = FunctionArguments<typeof removeContract>
export type RemoveContractReturn = FunctionReturn<typeof removeContract>

/** renounceOwnership() */
export const renounceOwnership = func('0x715018a6', {})
export type RenounceOwnershipParams = FunctionArguments<typeof renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof renounceOwnership>

/** requestDecreasePositionCollateral(uint256,uint256,bool) */
export const requestDecreasePositionCollateral = func('0x171a5b81', {
    perpId: uint256,
    amountCNS: uint256,
    clampToMaximum: bool,
})
export type RequestDecreasePositionCollateralParams = FunctionArguments<typeof requestDecreasePositionCollateral>
export type RequestDecreasePositionCollateralReturn = FunctionReturn<typeof requestDecreasePositionCollateral>

/** setAccountFeeTiers((uint256,uint256)[]) */
export const setAccountFeeTiers = func('0x09a6beb9', {
    accountFeeTiers: array(struct({
        accountId: uint256,
        tier: uint256,
    })),
})
export type SetAccountFeeTiersParams = FunctionArguments<typeof setAccountFeeTiers>
export type SetAccountFeeTiersReturn = FunctionReturn<typeof setAccountFeeTiers>

/** setAddressBlockStatus(address[],bool) */
export const setAddressBlockStatus = func('0xb1082486', {
    addresses: array(address),
    blocked: bool,
})
export type SetAddressBlockStatusParams = FunctionArguments<typeof setAddressBlockStatus>
export type SetAddressBlockStatusReturn = FunctionReturn<typeof setAddressBlockStatus>

/** setAddressWhitelisted(address[],bool) */
export const setAddressWhitelisted = func('0xbe70473d', {
    addresses: array(address),
    whitelisted_: bool,
})
export type SetAddressWhitelistedParams = FunctionArguments<typeof setAddressWhitelisted>
export type SetAddressWhitelistedReturn = FunctionReturn<typeof setAddressWhitelisted>

/** setAdministrator(address,bool) */
export const setAdministrator = func('0x87c95058', {
    administrator: address,
    add: bool,
})
export type SetAdministratorParams = FunctionArguments<typeof setAdministrator>
export type SetAdministratorReturn = FunctionReturn<typeof setAdministrator>

/** setBuyToLiquidateBuyerRestriction(uint256,bool) */
export const setBuyToLiquidateBuyerRestriction = func('0x32b9203b', {
    perpId: uint256,
    restrictBuyers: bool,
})
export type SetBuyToLiquidateBuyerRestrictionParams = FunctionArguments<typeof setBuyToLiquidateBuyerRestriction>
export type SetBuyToLiquidateBuyerRestrictionReturn = FunctionReturn<typeof setBuyToLiquidateBuyerRestriction>

/** setBuyToLiquidateParams(uint256,uint256,uint256,uint256) */
export const setBuyToLiquidateParams = func('0x5180d5a8', {
    perpId: uint256,
    insAmtPer100K: uint256,
    userAmtPer100K: uint256,
    buyerAmtPer100K: uint256,
})
export type SetBuyToLiquidateParamsParams = FunctionArguments<typeof setBuyToLiquidateParams>
export type SetBuyToLiquidateParamsReturn = FunctionReturn<typeof setBuyToLiquidateParams>

/** setBuyToLiquidatePriceThreshold(uint256,uint256) */
export const setBuyToLiquidatePriceThreshold = func('0x45c8c924', {
    perpId: uint256,
    thresholdPer100K: uint256,
})
export type SetBuyToLiquidatePriceThresholdParams = FunctionArguments<typeof setBuyToLiquidatePriceThreshold>
export type SetBuyToLiquidatePriceThresholdReturn = FunctionReturn<typeof setBuyToLiquidatePriceThreshold>

/** setContractPaused(uint256,bool) */
export const setContractPaused = func('0x9e430eda', {
    perpId: uint256,
    paused: bool,
})
export type SetContractPausedParams = FunctionArguments<typeof setContractPaused>
export type SetContractPausedReturn = FunctionReturn<typeof setContractPaused>

/** setDcpBorrowThreshold(uint256,uint256) */
export const setDcpBorrowThreshold = func('0xaf37c07d', {
    perpId: uint256,
    threshHdths: uint256,
})
export type SetDcpBorrowThresholdParams = FunctionArguments<typeof setDcpBorrowThreshold>
export type SetDcpBorrowThresholdReturn = FunctionReturn<typeof setDcpBorrowThreshold>

/** setDefaultPerpFeeSchedValues(uint256[8],uint256[8]) */
export const setDefaultPerpFeeSchedValues = func('0x3113985b', {
    takerFeesPPM: fixedSizeArray(uint256, 8),
    makerFeesPPM: fixedSizeArray(uint256, 8),
})
export type SetDefaultPerpFeeSchedValuesParams = FunctionArguments<typeof setDefaultPerpFeeSchedValues>
export type SetDefaultPerpFeeSchedValuesReturn = FunctionReturn<typeof setDefaultPerpFeeSchedValues>

/** setDefaultRwaFeeSchedValues(uint256[8],uint256[8]) */
export const setDefaultRwaFeeSchedValues = func('0xcf87ee6d', {
    takerFeesPPM: fixedSizeArray(uint256, 8),
    makerFeesPPM: fixedSizeArray(uint256, 8),
})
export type SetDefaultRwaFeeSchedValuesParams = FunctionArguments<typeof setDefaultRwaFeeSchedValues>
export type SetDefaultRwaFeeSchedValuesReturn = FunctionReturn<typeof setDefaultRwaFeeSchedValues>

/** setExchangeHalted(bool) */
export const setExchangeHalted = func('0x58087a74', {
    halted: bool,
})
export type SetExchangeHaltedParams = FunctionArguments<typeof setExchangeHalted>
export type SetExchangeHaltedReturn = FunctionReturn<typeof setExchangeHalted>

/** setFeeParams(uint256,uint256) */
export const setFeeParams = func('0x9d2ec188', {
    perpId: uint256,
    insAmtPer100K: uint256,
})
export type SetFeeParamsParams = FunctionArguments<typeof setFeeParams>
export type SetFeeParamsReturn = FunctionReturn<typeof setFeeParams>

/** setFeeSchedValues(uint256,uint256[8],uint256[8]) */
export const setFeeSchedValues = func('0xccebd088', {
    feeSchedId: uint256,
    takerFeesPPM: fixedSizeArray(uint256, 8),
    makerFeesPPM: fixedSizeArray(uint256, 8),
})
export type SetFeeSchedValuesParams = FunctionArguments<typeof setFeeSchedValues>
export type SetFeeSchedValuesReturn = FunctionReturn<typeof setFeeSchedValues>

/** setFreezeStatus(address,uint8) */
export const setFreezeStatus = func('0x182b01f2', {
    account: address,
    status: uint8,
})
export type SetFreezeStatusParams = FunctionArguments<typeof setFreezeStatus>
export type SetFreezeStatusReturn = FunctionReturn<typeof setFreezeStatus>

/** setFrozen(address,uint8) */
export const setFrozen = func('0x4b8344fb', {
    account: address,
    status: uint8,
})
export type SetFrozenParams = FunctionArguments<typeof setFrozen>
export type SetFrozenReturn = FunctionReturn<typeof setFrozen>

/** setFundingClampPct(uint256,uint256) */
export const setFundingClampPct = func('0x16a06593', {
    perpId: uint256,
    absFundingClampPctPer100K: uint256,
})
export type SetFundingClampPctParams = FunctionArguments<typeof setFundingClampPct>
export type SetFundingClampPctReturn = FunctionReturn<typeof setFundingClampPct>

/** setFundingSum(uint256,int256,uint32,bool,bool) */
export const setFundingSum = func('0x9fc8afd7', {
    perpId: uint256,
    fundingRatePct100k: int256,
    pricePNS: uint32,
    allowOverwrite: bool,
    revertOnFail: bool,
})
export type SetFundingSumParams = FunctionArguments<typeof setFundingSum>
export type SetFundingSumReturn = FunctionReturn<typeof setFundingSum>

/** setFundingSumScalingExp(uint256,uint256) */
export const setFundingSumScalingExp = func('0xc0a44efc', {
    perpId: uint256,
    fundingSumScalingExp: uint256,
})
export type SetFundingSumScalingExpParams = FunctionArguments<typeof setFundingSumScalingExp>
export type SetFundingSumScalingExpReturn = FunctionReturn<typeof setFundingSumScalingExp>

/** setIgnOracle(uint256,bool) */
export const setIgnOracle = func('0x69752159', {
    perpId: uint256,
    ignOracle: bool,
})
export type SetIgnOracleParams = FunctionArguments<typeof setIgnOracle>
export type SetIgnOracleReturn = FunctionReturn<typeof setIgnOracle>

/** setInitialMarginFraction(uint256,uint256) */
export const setInitialMarginFraction = func('0xe2e1cb57', {
    perpId: uint256,
    initMarginFracHdths: uint256,
})
export type SetInitialMarginFractionParams = FunctionArguments<typeof setInitialMarginFraction>
export type SetInitialMarginFractionReturn = FunctionReturn<typeof setInitialMarginFraction>

/** setLastForwardedDescId(uint256,uint256) */
export const setLastForwardedDescId = func('0xba53027d', {
    accountId: uint256,
    newDescId: uint256,
})
export type SetLastForwardedDescIdParams = FunctionArguments<typeof setLastForwardedDescId>
export type SetLastForwardedDescIdReturn = FunctionReturn<typeof setLastForwardedDescId>

/** setLastForwardedDescIdAsOwner(uint256,uint256) */
export const setLastForwardedDescIdAsOwner = func('0xeaadbbef', {
    accountId: uint256,
    newDescId: uint256,
})
export type SetLastForwardedDescIdAsOwnerParams = FunctionArguments<typeof setLastForwardedDescIdAsOwner>
export type SetLastForwardedDescIdAsOwnerReturn = FunctionReturn<typeof setLastForwardedDescIdAsOwner>

/** setLastTriggeredDescId(uint256,uint256) */
export const setLastTriggeredDescId = func('0x1217be67', {
    accountId: uint256,
    newDescId: uint256,
})
export type SetLastTriggeredDescIdParams = FunctionArguments<typeof setLastTriggeredDescId>
export type SetLastTriggeredDescIdReturn = FunctionReturn<typeof setLastTriggeredDescId>

/** setLastTriggeredDescIdAsOwner(uint256,uint256) */
export const setLastTriggeredDescIdAsOwner = func('0xa971b6d4', {
    accountId: uint256,
    newDescId: uint256,
})
export type SetLastTriggeredDescIdAsOwnerParams = FunctionArguments<typeof setLastTriggeredDescIdAsOwner>
export type SetLastTriggeredDescIdAsOwnerReturn = FunctionReturn<typeof setLastTriggeredDescIdAsOwner>

/** setLinkDsVerifier(address) */
export const setLinkDsVerifier = func('0xd360dd31', {
    verifierProxy: address,
})
export type SetLinkDsVerifierParams = FunctionArguments<typeof setLinkDsVerifier>
export type SetLinkDsVerifierReturn = FunctionReturn<typeof setLinkDsVerifier>

/** setLiquidationBuyer(address,bool) */
export const setLiquidationBuyer = func('0x7ddbdc2a', {
    liquidationBuyer: address,
    add: bool,
})
export type SetLiquidationBuyerParams = FunctionArguments<typeof setLiquidationBuyer>
export type SetLiquidationBuyerReturn = FunctionReturn<typeof setLiquidationBuyer>

/** setLiquidationParams(uint256,uint256,uint256) */
export const setLiquidationParams = func('0x60ad17fd', {
    perpId: uint256,
    insAmtPer100K: uint256,
    userAmtPer100K: uint256,
})
export type SetLiquidationParamsParams = FunctionArguments<typeof setLiquidationParams>
export type SetLiquidationParamsReturn = FunctionReturn<typeof setLiquidationParams>

/** setMaintenanceMarginFraction(uint256,uint256) */
export const setMaintenanceMarginFraction = func('0x8c031164', {
    perpId: uint256,
    maintMarginFracHdths: uint256,
})
export type SetMaintenanceMarginFractionParams = FunctionArguments<typeof setMaintenanceMarginFraction>
export type SetMaintenanceMarginFractionReturn = FunctionReturn<typeof setMaintenanceMarginFraction>

/** setMarginTol(uint256,uint256,uint256) */
export const setMarginTol = func('0x79609c11', {
    perpId: uint256,
    tolerance: uint256,
    decimals: uint256,
})
export type SetMarginTolParams = FunctionArguments<typeof setMarginTol>
export type SetMarginTolReturn = FunctionReturn<typeof setMarginTol>

/** setMaxOpenInterest(uint256,uint256) */
export const setMaxOpenInterest = func('0x9a6d7630', {
    perpId: uint256,
    maxOpenInterestLNS: uint256,
})
export type SetMaxOpenInterestParams = FunctionArguments<typeof setMaxOpenInterest>
export type SetMaxOpenInterestReturn = FunctionReturn<typeof setMaxOpenInterest>

/** setMinAccountOpenAmount(uint256) */
export const setMinAccountOpenAmount = func('0xd6f34bd6', {
    amountCNS: uint256,
})
export type SetMinAccountOpenAmountParams = FunctionArguments<typeof setMinAccountOpenAmount>
export type SetMinAccountOpenAmountReturn = FunctionReturn<typeof setMinAccountOpenAmount>

/** setMinPost(uint256) */
export const setMinPost = func('0x279289e9', {
    minPostCNS: uint256,
})
export type SetMinPostParams = FunctionArguments<typeof setMinPost>
export type SetMinPostReturn = FunctionReturn<typeof setMinPost>

/** setMinSettle(uint256) */
export const setMinSettle = func('0xf28b98f3', {
    minSettleCNS: uint256,
})
export type SetMinSettleParams = FunctionArguments<typeof setMinSettle>
export type SetMinSettleReturn = FunctionReturn<typeof setMinSettle>

/** setMinWithdrawLimit(uint256) */
export const setMinWithdrawLimit = func('0x4d574c56', {
    limitCNS: uint256,
})
export type SetMinWithdrawLimitParams = FunctionArguments<typeof setMinWithdrawLimit>
export type SetMinWithdrawLimitReturn = FunctionReturn<typeof setMinWithdrawLimit>

/** setMonitorAdministrator(address,bool) */
export const setMonitorAdministrator = func('0xc6efcd43', {
    monitorAdministrator: address,
    add: bool,
})
export type SetMonitorAdministratorParams = FunctionArguments<typeof setMonitorAdministrator>
export type SetMonitorAdministratorReturn = FunctionReturn<typeof setMonitorAdministrator>

/** setOverCollatDescentThreshold(uint256,uint256) */
export const setOverCollatDescentThreshold = func('0xed6760fe', {
    perpId: uint256,
    threshHdths: uint256,
})
export type SetOverCollatDescentThresholdParams = FunctionArguments<typeof setOverCollatDescentThreshold>
export type SetOverCollatDescentThresholdReturn = FunctionReturn<typeof setOverCollatDescentThreshold>

/** setPermissionedCancelParams(uint256,uint256,uint256) */
export const setPermissionedCancelParams = func('0xefb62904', {
    perpId: uint256,
    permCancelMinOrders: uint256,
    permCancelSegment: uint256,
})
export type SetPermissionedCancelParamsParams = FunctionArguments<typeof setPermissionedCancelParams>
export type SetPermissionedCancelParamsReturn = FunctionReturn<typeof setPermissionedCancelParams>

/** setPerpLinkDsFeedId(uint256,bytes32) */
export const setPerpLinkDsFeedId = func('0x03cfe83c', {
    perpId: uint256,
    feedId: bytes32,
})
export type SetPerpLinkDsFeedIdParams = FunctionArguments<typeof setPerpLinkDsFeedId>
export type SetPerpLinkDsFeedIdReturn = FunctionReturn<typeof setPerpLinkDsFeedId>

/** setPerpToDefaultPerpFeeSched(uint256) */
export const setPerpToDefaultPerpFeeSched = func('0x1ac1fb36', {
    perpId: uint256,
})
export type SetPerpToDefaultPerpFeeSchedParams = FunctionArguments<typeof setPerpToDefaultPerpFeeSched>
export type SetPerpToDefaultPerpFeeSchedReturn = FunctionReturn<typeof setPerpToDefaultPerpFeeSched>

/** setPerpToDefaultRwaFeeSched(uint256) */
export const setPerpToDefaultRwaFeeSched = func('0xd7d7e366', {
    perpId: uint256,
})
export type SetPerpToDefaultRwaFeeSchedParams = FunctionArguments<typeof setPerpToDefaultRwaFeeSched>
export type SetPerpToDefaultRwaFeeSchedReturn = FunctionReturn<typeof setPerpToDefaultRwaFeeSched>

/** setPerpToFeeSchedule(uint256,uint256) */
export const setPerpToFeeSchedule = func('0xe212ad2d', {
    perpId: uint256,
    feeSchedId: uint256,
})
export type SetPerpToFeeScheduleParams = FunctionArguments<typeof setPerpToFeeSchedule>
export type SetPerpToFeeScheduleReturn = FunctionReturn<typeof setPerpToFeeSchedule>

/** setPositionAdministrator(address,bool) */
export const setPositionAdministrator = func('0x12014156', {
    positionAdministrator: address,
    add: bool,
})
export type SetPositionAdministratorParams = FunctionArguments<typeof setPositionAdministrator>
export type SetPositionAdministratorReturn = FunctionReturn<typeof setPositionAdministrator>

/** setPriceAdministrator(address,bool) */
export const setPriceAdministrator = func('0xa9bd5cee', {
    priceAdministrator: address,
    add: bool,
})
export type SetPriceAdministratorParams = FunctionArguments<typeof setPriceAdministrator>
export type SetPriceAdministratorReturn = FunctionReturn<typeof setPriceAdministrator>

/** setPriceMaxAge(uint256,uint256) */
export const setPriceMaxAge = func('0x0e517f41', {
    perpId: uint256,
    maxAgeSec: uint256,
})
export type SetPriceMaxAgeParams = FunctionArguments<typeof setPriceMaxAge>
export type SetPriceMaxAgeReturn = FunctionReturn<typeof setPriceMaxAge>

/** setPriceTolPer100K(uint256,uint256) */
export const setPriceTolPer100K = func('0x7d45678e', {
    perpId: uint256,
    tolerancePer100K: uint256,
})
export type SetPriceTolPer100KParams = FunctionArguments<typeof setPriceTolPer100K>
export type SetPriceTolPer100KReturn = FunctionReturn<typeof setPriceTolPer100K>

/** setPriceTolPer100KByOwner(uint256,uint256) */
export const setPriceTolPer100KByOwner = func('0xb839a8c4', {
    perpId: uint256,
    tolerancePer100K: uint256,
})
export type SetPriceTolPer100KByOwnerParams = FunctionArguments<typeof setPriceTolPer100KByOwner>
export type SetPriceTolPer100KByOwnerReturn = FunctionReturn<typeof setPriceTolPer100KByOwner>

/** setRecycleFee(uint256) */
export const setRecycleFee = func('0xbe0783f5', {
    recycleFeeCNS: uint256,
})
export type SetRecycleFeeParams = FunctionArguments<typeof setRecycleFee>
export type SetRecycleFeeReturn = FunctionReturn<typeof setRecycleFee>

/** setThousandthsTvlWRLS(uint256) */
export const setThousandthsTvlWRLS = func('0xd780ece8', {
    thousandthsTvl: uint256,
})
export type SetThousandthsTvlWRLSParams = FunctionArguments<typeof setThousandthsTvlWRLS>
export type SetThousandthsTvlWRLSReturn = FunctionReturn<typeof setThousandthsTvlWRLS>

/** setToleranceAdministrator(address,bool) */
export const setToleranceAdministrator = func('0xdd0a3e2b', {
    toleranceAdministrator: address,
    add: bool,
})
export type SetToleranceAdministratorParams = FunctionArguments<typeof setToleranceAdministrator>
export type SetToleranceAdministratorReturn = FunctionReturn<typeof setToleranceAdministrator>

/** setUnityDescentThreshold(uint256,uint256) */
export const setUnityDescentThreshold = func('0x2f32509b', {
    perpId: uint256,
    threshHdths: uint256,
})
export type SetUnityDescentThresholdParams = FunctionArguments<typeof setUnityDescentThreshold>
export type SetUnityDescentThresholdReturn = FunctionReturn<typeof setUnityDescentThreshold>

/** setWhitelistingEnabled(bool) */
export const setWhitelistingEnabled = func('0x5f40c1f7', {
    enabled: bool,
})
export type SetWhitelistingEnabledParams = FunctionArguments<typeof setWhitelistingEnabled>
export type SetWhitelistingEnabledReturn = FunctionReturn<typeof setWhitelistingEnabled>

/** setWithdrawBypass(address,bool) */
export const setWithdrawBypass = func('0x252c3594', {
    addr: address,
    enabled: bool,
})
export type SetWithdrawBypassParams = FunctionArguments<typeof setWithdrawBypass>
export type SetWithdrawBypassReturn = FunctionReturn<typeof setWithdrawBypass>

/** transferOwnership(address) */
export const transferOwnership = func('0xf2fde38b', {
    newOwner: address,
})
export type TransferOwnershipParams = FunctionArguments<typeof transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof transferOwnership>

/** triggerUnwindContract(uint256) */
export const triggerUnwindContract = func('0x0189a2b7', {
    perpId: uint256,
})
export type TriggerUnwindContractParams = FunctionArguments<typeof triggerUnwindContract>
export type TriggerUnwindContractReturn = FunctionReturn<typeof triggerUnwindContract>

/** unwindContract(uint256,uint256,bool) */
export const unwindContract = func('0xfb05acb7', {
    perpId: uint256,
    maxPosToUnwind: uint256,
    allowWithoutPayment: bool,
})
export type UnwindContractParams = FunctionArguments<typeof unwindContract>
export type UnwindContractReturn = FunctionReturn<typeof unwindContract>

/** unwindContractByOwner(uint256,uint256,bool) */
export const unwindContractByOwner = func('0xddac1cde', {
    perpId: uint256,
    maxPosToUnwind: uint256,
    allowWithoutPayment: bool,
})
export type UnwindContractByOwnerParams = FunctionArguments<typeof unwindContractByOwner>
export type UnwindContractByOwnerReturn = FunctionReturn<typeof unwindContractByOwner>

/** updateMarkPricePNS(uint256,uint32) */
export const updateMarkPricePNS = func('0x541b04e9', {
    perpId: uint256,
    markPricePNS: uint32,
})
export type UpdateMarkPricePNSParams = FunctionArguments<typeof updateMarkPricePNS>
export type UpdateMarkPricePNSReturn = FunctionReturn<typeof updateMarkPricePNS>

/** updateMarkPricePNSByOwner(uint256,uint32) */
export const updateMarkPricePNSByOwner = func('0x0a039fbd', {
    perpId: uint256,
    markPricePNS: uint32,
})
export type UpdateMarkPricePNSByOwnerParams = FunctionArguments<typeof updateMarkPricePNSByOwner>
export type UpdateMarkPricePNSByOwnerReturn = FunctionReturn<typeof updateMarkPricePNSByOwner>

/** updateOraclePrice(uint256,bytes) */
export const updateOraclePrice = func('0x8f3ffc85', {
    perpId: uint256,
    unverifiedReport: bytes,
})
export type UpdateOraclePriceParams = FunctionArguments<typeof updateOraclePrice>
export type UpdateOraclePriceReturn = FunctionReturn<typeof updateOraclePrice>

/** upgradeTo(address) */
export const upgradeTo = func('0x3659cfe6', {
    newImplementation: address,
})
export type UpgradeToParams = FunctionArguments<typeof upgradeTo>
export type UpgradeToReturn = FunctionReturn<typeof upgradeTo>

/** upgradeToAndCall(address,bytes) */
export const upgradeToAndCall = func('0x4f1ef286', {
    newImplementation: address,
    data: bytes,
})
export type UpgradeToAndCallParams = FunctionArguments<typeof upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof upgradeToAndCall>

/** whitelisted(address) */
export const whitelisted = func('0xd936547e', {
    _0: address,
}, bool)
export type WhitelistedParams = FunctionArguments<typeof whitelisted>
export type WhitelistedReturn = FunctionReturn<typeof whitelisted>

/** whitelistingEnabled() */
export const whitelistingEnabled = func('0x5b0c29eb', {}, bool)
export type WhitelistingEnabledParams = FunctionArguments<typeof whitelistingEnabled>
export type WhitelistingEnabledReturn = FunctionReturn<typeof whitelistingEnabled>

/** withdrawCollateral(uint256) */
export const withdrawCollateral = func('0x6112fe2e', {
    amountCNS: uint256,
})
export type WithdrawCollateralParams = FunctionArguments<typeof withdrawCollateral>
export type WithdrawCollateralReturn = FunctionReturn<typeof withdrawCollateral>

/** withdrawFromProtocol(uint256) */
export const withdrawFromProtocol = func('0x8a924640', {
    amountCNS: uint256,
})
export type WithdrawFromProtocolParams = FunctionArguments<typeof withdrawFromProtocol>
export type WithdrawFromProtocolReturn = FunctionReturn<typeof withdrawFromProtocol>

/** xferAcctToProtocol(uint256) */
export const xferAcctToProtocol = func('0x61bd6f44', {
    amountCNS: uint256,
})
export type XferAcctToProtocolParams = FunctionArguments<typeof xferAcctToProtocol>
export type XferAcctToProtocolReturn = FunctionReturn<typeof xferAcctToProtocol>

/** xferPerpInsToProtocol(uint256,uint256) */
export const xferPerpInsToProtocol = func('0x586d92ca', {
    perpId: uint256,
    amountCNS: uint256,
})
export type XferPerpInsToProtocolParams = FunctionArguments<typeof xferPerpInsToProtocol>
export type XferPerpInsToProtocolReturn = FunctionReturn<typeof xferPerpInsToProtocol>

/** xferProtocolToAcct(uint256,uint256) */
export const xferProtocolToAcct = func('0x229c2492', {
    accountId: uint256,
    amountCNS: uint256,
})
export type XferProtocolToAcctParams = FunctionArguments<typeof xferProtocolToAcct>
export type XferProtocolToAcctReturn = FunctionReturn<typeof xferProtocolToAcct>

/** xferProtocolToPerp(uint256,uint256,bool) */
export const xferProtocolToPerp = func('0xe68073c3', {
    perpId: uint256,
    amountCNS: uint256,
    insurance: bool,
})
export type XferProtocolToPerpParams = FunctionArguments<typeof xferProtocolToPerp>
export type XferProtocolToPerpReturn = FunctionReturn<typeof xferProtocolToPerp>

/** xferProtocolToRecycleBal(uint256) */
export const xferProtocolToRecycleBal = func('0x1df87ade', {
    amountCNS: uint256,
})
export type XferProtocolToRecycleBalParams = FunctionArguments<typeof xferProtocolToRecycleBal>
export type XferProtocolToRecycleBalReturn = FunctionReturn<typeof xferProtocolToRecycleBal>
