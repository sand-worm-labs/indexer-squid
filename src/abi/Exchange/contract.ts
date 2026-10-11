import { ContractBase } from '../abi.support.js'
import { addressBlocked, createAccount, execFwdPositionOps, execFwdPositionOpsV2, execOrder, execOrderV2, execOrders, execOrdersV2, forceClose, getAccountByAddr, getAccountById, getAccountFeeTier, getContractVersion, getDefaultPerpFeeSchedule, getExchangeInfo, getFeeScheduleById, getFundingInterval, getFundingSumAtBlock, getInsuranceProtocolSplit, getLiquidationInfo, getMakerFee, getMarginFractions, getMinAccountOpenCNS, getMinimumPostCNS, getMinimumSettleCNS, getNextPriceAboveWithOrders, getNextPriceBelowWithOrders, getOrder, getOrderIdIndex, getOrderLocks, getOrderV2, getOrdersAtPriceLevel, getOwner, getPermissionedCancelParams, getPerpFeeSchedule, getPerpOrderLocks, getPerpetualExistsBitmap, getPerpetualInfo, getPerpetualInfoV2, getPosition, getPositionIds, getPositionV2, getPositions, getPositionsV2, getPriceLevelOrderIds, getProtocolBalanceCNS, getRecycleBalanceCNS, getRecycleFeeCNS, getTakerFee, getUnwindInfo, getVolumeAtBookPrice, getWithdrawAllowanceData, isAdministrator, isHalted, isLiquidationBuyer, isPositionAdministrator, isPriceAdministrator, isToleranceAdministrator, numberOfAccounts, owner, pendingOwner, perpetualExists, proxiableUUID, whitelisted, whitelistingEnabled } from './functions.js'
import type { AddressBlockedParams, CreateAccountParams, ExecFwdPositionOpsParams, ExecFwdPositionOpsV2Params, ExecOrderParams, ExecOrderV2Params, ExecOrdersParams, ExecOrdersV2Params, ForceCloseParams, GetAccountByAddrParams, GetAccountByIdParams, GetAccountFeeTierParams, GetFeeScheduleByIdParams, GetFundingSumAtBlockParams, GetInsuranceProtocolSplitParams, GetLiquidationInfoParams, GetMakerFeeParams, GetMarginFractionsParams, GetNextPriceAboveWithOrdersParams, GetNextPriceBelowWithOrdersParams, GetOrderIdIndexParams, GetOrderLocksParams, GetOrderParams, GetOrderV2Params, GetOrdersAtPriceLevelParams, GetPermissionedCancelParamsParams, GetPerpFeeScheduleParams, GetPerpOrderLocksParams, GetPerpetualInfoParams, GetPerpetualInfoV2Params, GetPositionIdsParams, GetPositionParams, GetPositionV2Params, GetPositionsParams, GetPositionsV2Params, GetPriceLevelOrderIdsParams, GetTakerFeeParams, GetUnwindInfoParams, GetVolumeAtBookPriceParams, GetWithdrawAllowanceDataParams, IsAdministratorParams, IsLiquidationBuyerParams, IsPositionAdministratorParams, IsPriceAdministratorParams, IsToleranceAdministratorParams, PerpetualExistsParams, WhitelistedParams } from './functions.js'

export class Contract extends ContractBase {
    addressBlocked(_0: AddressBlockedParams["_0"]) {
        return this.eth_call(addressBlocked, {_0})
    }

    createAccount(amountCNS: CreateAccountParams["amountCNS"]) {
        return this.eth_call(createAccount, {amountCNS})
    }

    execFwdPositionOps(forwardedOrders: ExecFwdPositionOpsParams["forwardedOrders"]) {
        return this.eth_call(execFwdPositionOps, {forwardedOrders})
    }

    execFwdPositionOpsV2(forwardedOrders: ExecFwdPositionOpsV2Params["forwardedOrders"], extensions: ExecFwdPositionOpsV2Params["extensions"]) {
        return this.eth_call(execFwdPositionOpsV2, {forwardedOrders, extensions})
    }

    execOrder(orderDesc: ExecOrderParams["orderDesc"]) {
        return this.eth_call(execOrder, {orderDesc})
    }

    execOrderV2(orderDesc: ExecOrderV2Params["orderDesc"], extension: ExecOrderV2Params["extension"]) {
        return this.eth_call(execOrderV2, {orderDesc, extension})
    }

    execOrders(orderDescs: ExecOrdersParams["orderDescs"], revertOnFail: ExecOrdersParams["revertOnFail"]) {
        return this.eth_call(execOrders, {orderDescs, revertOnFail})
    }

    execOrdersV2(orderDescs: ExecOrdersV2Params["orderDescs"], revertOnFail: ExecOrdersV2Params["revertOnFail"], extensions: ExecOrdersV2Params["extensions"]) {
        return this.eth_call(execOrdersV2, {orderDescs, revertOnFail, extensions})
    }

    forceClose(perpId: ForceCloseParams["perpId"], posAccountId: ForceCloseParams["posAccountId"], sortedPositionIds: ForceCloseParams["sortedPositionIds"], revertOnFail: ForceCloseParams["revertOnFail"]) {
        return this.eth_call(forceClose, {perpId, posAccountId, sortedPositionIds, revertOnFail})
    }

    getAccountByAddr(accountAddress: GetAccountByAddrParams["accountAddress"]) {
        return this.eth_call(getAccountByAddr, {accountAddress})
    }

    getAccountById(accountId: GetAccountByIdParams["accountId"]) {
        return this.eth_call(getAccountById, {accountId})
    }

    getAccountFeeTier(accountId: GetAccountFeeTierParams["accountId"]) {
        return this.eth_call(getAccountFeeTier, {accountId})
    }

    getContractVersion() {
        return this.eth_call(getContractVersion, {})
    }

    getDefaultPerpFeeSchedule() {
        return this.eth_call(getDefaultPerpFeeSchedule, {})
    }

    getExchangeInfo() {
        return this.eth_call(getExchangeInfo, {})
    }

    getFeeScheduleById(feeSchedId: GetFeeScheduleByIdParams["feeSchedId"]) {
        return this.eth_call(getFeeScheduleById, {feeSchedId})
    }

    getFundingInterval() {
        return this.eth_call(getFundingInterval, {})
    }

    getFundingSumAtBlock(perpId: GetFundingSumAtBlockParams["perpId"], blockNumber: GetFundingSumAtBlockParams["blockNumber"]) {
        return this.eth_call(getFundingSumAtBlock, {perpId, blockNumber})
    }

    getInsuranceProtocolSplit(perpId: GetInsuranceProtocolSplitParams["perpId"]) {
        return this.eth_call(getInsuranceProtocolSplit, {perpId})
    }

    getLiquidationInfo(perpId: GetLiquidationInfoParams["perpId"]) {
        return this.eth_call(getLiquidationInfo, {perpId})
    }

    getMakerFee(perpId: GetMakerFeeParams["perpId"]) {
        return this.eth_call(getMakerFee, {perpId})
    }

    getMarginFractions(perpId: GetMarginFractionsParams["perpId"], lotLNS: GetMarginFractionsParams["lotLNS"]) {
        return this.eth_call(getMarginFractions, {perpId, lotLNS})
    }

    getMinAccountOpenCNS() {
        return this.eth_call(getMinAccountOpenCNS, {})
    }

    getMinimumPostCNS() {
        return this.eth_call(getMinimumPostCNS, {})
    }

    getMinimumSettleCNS() {
        return this.eth_call(getMinimumSettleCNS, {})
    }

    getNextPriceAboveWithOrders(perpId: GetNextPriceAboveWithOrdersParams["perpId"], priceONS: GetNextPriceAboveWithOrdersParams["priceONS"]) {
        return this.eth_call(getNextPriceAboveWithOrders, {perpId, priceONS})
    }

    getNextPriceBelowWithOrders(perpId: GetNextPriceBelowWithOrdersParams["perpId"], priceONS: GetNextPriceBelowWithOrdersParams["priceONS"]) {
        return this.eth_call(getNextPriceBelowWithOrders, {perpId, priceONS})
    }

    getOrder(perpId: GetOrderParams["perpId"], orderId: GetOrderParams["orderId"]) {
        return this.eth_call(getOrder, {perpId, orderId})
    }

    getOrderIdIndex(perpId: GetOrderIdIndexParams["perpId"]) {
        return this.eth_call(getOrderIdIndex, {perpId})
    }

    getOrderLocks(accountId: GetOrderLocksParams["accountId"]) {
        return this.eth_call(getOrderLocks, {accountId})
    }

    getOrderV2(perpId: GetOrderV2Params["perpId"], orderId: GetOrderV2Params["orderId"]) {
        return this.eth_call(getOrderV2, {perpId, orderId})
    }

    getOrdersAtPriceLevel(perpId: GetOrdersAtPriceLevelParams["perpId"], priceONS: GetOrdersAtPriceLevelParams["priceONS"], pageStartOrderId: GetOrdersAtPriceLevelParams["pageStartOrderId"], ordersPerPage: GetOrdersAtPriceLevelParams["ordersPerPage"]) {
        return this.eth_call(getOrdersAtPriceLevel, {perpId, priceONS, pageStartOrderId, ordersPerPage})
    }

    getOwner() {
        return this.eth_call(getOwner, {})
    }

    getPermissionedCancelParams(perpId: GetPermissionedCancelParamsParams["perpId"]) {
        return this.eth_call(getPermissionedCancelParams, {perpId})
    }

    getPerpFeeSchedule(perpId: GetPerpFeeScheduleParams["perpId"]) {
        return this.eth_call(getPerpFeeSchedule, {perpId})
    }

    getPerpOrderLocks(accountId: GetPerpOrderLocksParams["accountId"], perpId: GetPerpOrderLocksParams["perpId"]) {
        return this.eth_call(getPerpOrderLocks, {accountId, perpId})
    }

    getPerpetualExistsBitmap() {
        return this.eth_call(getPerpetualExistsBitmap, {})
    }

    getPerpetualInfo(perpId: GetPerpetualInfoParams["perpId"]) {
        return this.eth_call(getPerpetualInfo, {perpId})
    }

    getPerpetualInfoV2(perpId: GetPerpetualInfoV2Params["perpId"]) {
        return this.eth_call(getPerpetualInfoV2, {perpId})
    }

    getPosition(perpId: GetPositionParams["perpId"], accountId: GetPositionParams["accountId"]) {
        return this.eth_call(getPosition, {perpId, accountId})
    }

    getPositionIds(perpId: GetPositionIdsParams["perpId"]) {
        return this.eth_call(getPositionIds, {perpId})
    }

    getPositionV2(perpId: GetPositionV2Params["perpId"], accountId: GetPositionV2Params["accountId"]) {
        return this.eth_call(getPositionV2, {perpId, accountId})
    }

    getPositions(perpId: GetPositionsParams["perpId"], pageStartPositionId: GetPositionsParams["pageStartPositionId"], positionsPerPage: GetPositionsParams["positionsPerPage"]) {
        return this.eth_call(getPositions, {perpId, pageStartPositionId, positionsPerPage})
    }

    getPositionsV2(perpId: GetPositionsV2Params["perpId"], pageStartPositionId: GetPositionsV2Params["pageStartPositionId"], positionsPerPage: GetPositionsV2Params["positionsPerPage"]) {
        return this.eth_call(getPositionsV2, {perpId, pageStartPositionId, positionsPerPage})
    }

    getPriceLevelOrderIds(perpId: GetPriceLevelOrderIdsParams["perpId"], priceONS: GetPriceLevelOrderIdsParams["priceONS"]) {
        return this.eth_call(getPriceLevelOrderIds, {perpId, priceONS})
    }

    getProtocolBalanceCNS() {
        return this.eth_call(getProtocolBalanceCNS, {})
    }

    getRecycleBalanceCNS() {
        return this.eth_call(getRecycleBalanceCNS, {})
    }

    getRecycleFeeCNS() {
        return this.eth_call(getRecycleFeeCNS, {})
    }

    getTakerFee(perpId: GetTakerFeeParams["perpId"]) {
        return this.eth_call(getTakerFee, {perpId})
    }

    getUnwindInfo(perpId: GetUnwindInfoParams["perpId"]) {
        return this.eth_call(getUnwindInfo, {perpId})
    }

    getVolumeAtBookPrice(perpId: GetVolumeAtBookPriceParams["perpId"], priceONS: GetVolumeAtBookPriceParams["priceONS"]) {
        return this.eth_call(getVolumeAtBookPrice, {perpId, priceONS})
    }

    getWithdrawAllowanceData(blockNumber: GetWithdrawAllowanceDataParams["blockNumber"]) {
        return this.eth_call(getWithdrawAllowanceData, {blockNumber})
    }

    isAdministrator(anAddress: IsAdministratorParams["anAddress"]) {
        return this.eth_call(isAdministrator, {anAddress})
    }

    isHalted() {
        return this.eth_call(isHalted, {})
    }

    isLiquidationBuyer(anAddress: IsLiquidationBuyerParams["anAddress"]) {
        return this.eth_call(isLiquidationBuyer, {anAddress})
    }

    isPositionAdministrator(anAddress: IsPositionAdministratorParams["anAddress"]) {
        return this.eth_call(isPositionAdministrator, {anAddress})
    }

    isPriceAdministrator(anAddress: IsPriceAdministratorParams["anAddress"]) {
        return this.eth_call(isPriceAdministrator, {anAddress})
    }

    isToleranceAdministrator(anAddress: IsToleranceAdministratorParams["anAddress"]) {
        return this.eth_call(isToleranceAdministrator, {anAddress})
    }

    numberOfAccounts() {
        return this.eth_call(numberOfAccounts, {})
    }

    owner() {
        return this.eth_call(owner, {})
    }

    pendingOwner() {
        return this.eth_call(pendingOwner, {})
    }

    perpetualExists(perpId: PerpetualExistsParams["perpId"]) {
        return this.eth_call(perpetualExists, {perpId})
    }

    proxiableUUID() {
        return this.eth_call(proxiableUUID, {})
    }

    whitelisted(_0: WhitelistedParams["_0"]) {
        return this.eth_call(whitelisted, {_0})
    }

    whitelistingEnabled() {
        return this.eth_call(whitelistingEnabled, {})
    }
}
