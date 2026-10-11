import { address, array, bool, bytes, bytes32, fixedSizeArray, int256, int48, string, uint256, uint8 } from '@subsquid/evm-codec'
import { event, indexed } from '../abi.support.js'
import type { EventParams as EParams } from '../abi.support.js'

/** AccountCreated(address,uint256) */
export const AccountCreated = event('0x7325fb14450d3e5eb288c620b4ff1d6b43a41b33b4a4f143ae88cd4c12f99ea3', {
    account: address,
    id: uint256,
})
export type AccountCreatedEventArgs = EParams<typeof AccountCreated>

/** AccountFeeTierSet(uint256,uint256) */
export const AccountFeeTierSet = event('0xaf08b29036d56b946c77480e5e0b8c387156c91342e2bb61aab08f5cc5425767', {
    accountId: indexed(uint256),
    tier: uint256,
})
export type AccountFeeTierSetEventArgs = EParams<typeof AccountFeeTierSet>

/** AccountFreeze(uint256,uint8) */
export const AccountFreeze = event('0x287a1a0be47186fe812cf10628edc8c56638095124099fea05c3e3f59e3a0dc6', {
    accountId: uint256,
    status: uint8,
})
export type AccountFreezeEventArgs = EParams<typeof AccountFreeze>

/** AccountFrozen(uint8) */
export const AccountFrozen = event('0xe0860e5ff8578b025fc8a7f42c449c575b7a19600e8d2b3fd6ab0ae6e2e08403', {
    status: uint8,
})
export type AccountFrozenEventArgs = EParams<typeof AccountFrozen>

/** AccountLiquidationCredit(uint256,uint256,uint256,uint256) */
export const AccountLiquidationCredit = event('0x66c4fd8d726a62e549cbf66bc9a8e005cb6e30b73e027b3d86c4df1388d2b16f', {
    perpId: uint256,
    accountId: uint256,
    startBalanceCNS: uint256,
    endBalanceCNS: uint256,
})
export type AccountLiquidationCreditEventArgs = EParams<typeof AccountLiquidationCredit>

/** AdminChanged(address,address) */
export const AdminChanged = event('0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f', {
    previousAdmin: address,
    newAdmin: address,
})
export type AdminChangedEventArgs = EParams<typeof AdminChanged>

/** AdministratorUpdated(address,bool) */
export const AdministratorUpdated = event('0x184fbff1cd7a3d3af1fd538263d79328e135402c70c68de9b795ee4fcc0440bc', {
    administrator: address,
    added: bool,
})
export type AdministratorUpdatedEventArgs = EParams<typeof AdministratorUpdated>

/** AmountExceedsAvailableBalance(uint256,uint256,uint256) */
export const AmountExceedsAvailableBalance = event('0xb853e5846ad52919c794f709695100094681c458cd1864d5217c6c897b6858b1', {
    amountCNS: uint256,
    availableBalanceCNS: uint256,
    balanceCNS: uint256,
})
export type AmountExceedsAvailableBalanceEventArgs = EParams<typeof AmountExceedsAvailableBalance>

/** BankruptcyPricePreventsDeleverage(uint256,uint256,uint8,uint256,uint256) */
export const BankruptcyPricePreventsDeleverage = event('0xb2f4de9c8b5c718fbc129fd73f1f19ba5c646e821e39464c1c0bdb4014b4ed6e', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    bankruptcyPricePNS: uint256,
    markPricePNS: uint256,
})
export type BankruptcyPricePreventsDeleverageEventArgs = EParams<typeof BankruptcyPricePreventsDeleverage>

/** BeaconUpgraded(address) */
export const BeaconUpgraded = event('0x1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e', {
    beacon: indexed(address),
})
export type BeaconUpgradedEventArgs = EParams<typeof BeaconUpgraded>

/** BlockStatusChanged(address,bool) */
export const BlockStatusChanged = event('0x78ba4d4e021eac2ff3a6a2337dc61ca2b49986705a2438b5764b9c18bd1c25fd', {
    addr: indexed(address),
    blocked: bool,
})
export type BlockStatusChangedEventArgs = EParams<typeof BlockStatusChanged>

/** BorrowMarginNotMetAfterDecCollateral(uint256,uint256,int256,int256) */
export const BorrowMarginNotMetAfterDecCollateral = event('0xa3cd1f19e02df00e3aa13cca19961f43eeedbfb5f34c064e278a6e2554a45088', {
    perpId: uint256,
    accountId: uint256,
    bmrCNS: int256,
    fmvAfterCNS: int256,
})
export type BorrowMarginNotMetAfterDecCollateralEventArgs = EParams<typeof BorrowMarginNotMetAfterDecCollateral>

/** BuyToLiquidateBuyerRestricted(uint256,address) */
export const BuyToLiquidateBuyerRestricted = event('0x4cd1188857d86056fa3ff56966c92f1f952217fe7328696137d42b1043a5d91c', {
    perpId: uint256,
    buyer: address,
})
export type BuyToLiquidateBuyerRestrictedEventArgs = EParams<typeof BuyToLiquidateBuyerRestricted>

/** BuyToLiquidateParamsUpdated(uint256,uint256,uint256,uint256,uint256) */
export const BuyToLiquidateParamsUpdated = event('0x58735d184c71d18d22f8f2eb43be3e299cad7d465faac909163477072a58f9e9', {
    perpId: uint256,
    insAmtPer100K: uint256,
    userAmtPer100K: uint256,
    buyerAmtPer100K: uint256,
    protAmtPer100K: uint256,
})
export type BuyToLiquidateParamsUpdatedEventArgs = EParams<typeof BuyToLiquidateParamsUpdated>

/** BuyToLiquidateRestrictionUpdated(uint256,bool) */
export const BuyToLiquidateRestrictionUpdated = event('0xfff8b0b240abf69d0ca9160bd7dcc49339068496d45e0bf7aab7468fc6a6c2c7', {
    perpId: uint256,
    restrictBuyers: bool,
})
export type BuyToLiquidateRestrictionUpdatedEventArgs = EParams<typeof BuyToLiquidateRestrictionUpdated>

/** BuyToLiquidateSettled(uint256,uint256,uint8,uint256,uint256,int256,uint256) */
export const BuyToLiquidateSettled = event('0x8bb45343b586b0a2e25de387c177d53762fbbb2da1e8324cdcb3157dd401249a', {
    perpId: uint256,
    accountId: uint256,
    orderType: uint8,
    realizedPricePNS: uint256,
    lotLNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
})
export type BuyToLiquidateSettledEventArgs = EParams<typeof BuyToLiquidateSettled>

/** BuyToLiquidateSlippageExceeded(uint256,uint256,uint8,uint256,uint256) */
export const BuyToLiquidateSlippageExceeded = event('0x1f008bb4cf7968d3043531816710a52872a7cd65b725fdf40176bbe0ff821597', {
    perpId: uint256,
    posAccountId: uint256,
    positionType: uint8,
    markPricePNS: uint256,
    limitPricePNS: uint256,
})
export type BuyToLiquidateSlippageExceededEventArgs = EParams<typeof BuyToLiquidateSlippageExceeded>

/** BuyToLiquidateStarted(uint256,uint256,uint256,uint256,uint256,uint256,uint256) */
export const BuyToLiquidateStarted = event('0xa77d65693716101939aad03e17516ac9015bd4d1d7baab6959d9395fc609dc49', {
    perpId: uint256,
    posAccountId: uint256,
    liquidatorId: uint256,
    requestedLotLNS: uint256,
    leverageHdths: uint256,
    limitPricePNS: uint256,
    maxNegPnlCollatBPS: uint256,
})
export type BuyToLiquidateStartedEventArgs = EParams<typeof BuyToLiquidateStarted>

/** BuyToLiquidateThresholdUpdated(uint256,uint256) */
export const BuyToLiquidateThresholdUpdated = event('0x82af0435eb6aa1e7cd302eaf1f32e10e8d7bb8e96d1f724a6006fbaa4571890f', {
    perpId: uint256,
    thresholdPer100K: uint256,
})
export type BuyToLiquidateThresholdUpdatedEventArgs = EParams<typeof BuyToLiquidateThresholdUpdated>

/** CancelExistingInvalidCloseOrders(uint256,uint8,uint8) */
export const CancelExistingInvalidCloseOrders = event('0x04d93c80531ebbd61ebd9906714391b8431ec4437abe44969d252210244128de', {
    lockedLotLNS: uint256,
    lockedPositionType: uint8,
    newPositionType: uint8,
})
export type CancelExistingInvalidCloseOrdersEventArgs = EParams<typeof CancelExistingInvalidCloseOrders>

/** CannotAdjustEntryPriceToDecCollateral(uint256,uint256,uint256,uint256,uint256,int256,uint8) */
export const CannotAdjustEntryPriceToDecCollateral = event('0x5af9ac97cf247d243434484869b838e2197714f1588e5d33e67505161e003687', {
    perpId: uint256,
    accountId: uint256,
    amountCNS: uint256,
    adjustmentAmountCNS: uint256,
    entryPricePNS: uint256,
    adjustedEntryPricePNS: int256,
    positionType: uint8,
})
export type CannotAdjustEntryPriceToDecCollateralEventArgs = EParams<typeof CannotAdjustEntryPriceToDecCollateral>

/** CantBuyToLiquidate(uint256,uint256,uint8,uint256,uint256,uint256,uint256) */
export const CantBuyToLiquidate = event('0x244c695d1e05b510329d2a418fcf7f40a78e7e06283e8422153ba676d7dc8f9d', {
    perpId: uint256,
    posAccountId: uint256,
    positionType: uint8,
    markPricePNS: uint256,
    bsLiqPricePNS: uint256,
    liqPricePNS: uint256,
    bkptPricePNS: uint256,
})
export type CantBuyToLiquidateEventArgs = EParams<typeof CantBuyToLiquidate>

/** CantChangeCloseOrder(uint256,uint256,uint256) */
export const CantChangeCloseOrder = event('0xe03d6e5b9ada2bee571a0faed84b4da12ba5afc5c10f1c29d8fbbb6dcd7519d8', {
    perpId: uint256,
    orderId: uint256,
    accountId: uint256,
})
export type CantChangeCloseOrderEventArgs = EParams<typeof CantChangeCloseOrder>

/** CantDeleverageAgainstOpposingPositions(uint256,uint256,bool,uint8,uint256,uint256[]) */
export const CantDeleverageAgainstOpposingPositions = event('0xaad1caf83451874ebc06a35849e4a295d8bfa856d05d1fbac2876702c7d50743', {
    perpId: uint256,
    accountId: uint256,
    forceClose: bool,
    positionType: uint8,
    deleveragePricePNS: uint256,
    sortedPositionIds: array(uint256),
})
export type CantDeleverageAgainstOpposingPositionsEventArgs = EParams<typeof CantDeleverageAgainstOpposingPositions>

/** CantLiquidatePosAboveMMR(uint256,uint256,uint8,uint256,uint256) */
export const CantLiquidatePosAboveMMR = event('0x2822c66c89ce366f8d2961ecb44375cdaf6fd59a220e83b68f12498108778f84', {
    perpId: uint256,
    posAccountId: uint256,
    positionType: uint8,
    markPricePNS: uint256,
    liqPricePNS: uint256,
})
export type CantLiquidatePosAboveMMREventArgs = EParams<typeof CantLiquidatePosAboveMMR>

/** ChangeExpiredOrderNeedsNewExpiry(uint256,uint256,uint256,uint256) */
export const ChangeExpiredOrderNeedsNewExpiry = event('0xef9c486e607431362e32f87055ecc54107d0bde504cfbca8d6a59a6108b99ead', {
    perpId: uint256,
    orderId: uint256,
    accountId: uint256,
    expiryBlock: uint256,
})
export type ChangeExpiredOrderNeedsNewExpiryEventArgs = EParams<typeof ChangeExpiredOrderNeedsNewExpiry>

/** ClearingExpiredOrder(uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const ClearingExpiredOrder = event('0xb95e250f9f017dcb1bb1806916771df0c04a269e5f46d5db7519382a0f7bb477', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    lockedBalanceCNS: uint256,
    recyclerAccountId: uint256,
    recyclerAmountCNS: int256,
    recyclerBalanceCNS: uint256,
})
export type ClearingExpiredOrderEventArgs = EParams<typeof ClearingExpiredOrder>

/** ClearingFrozenAccountOrder(uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const ClearingFrozenAccountOrder = event('0x86ad99b48b2565c9720e33335db58e8c7468d6af03a5e6238b20d4a562f5b8b4', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    lockedBalanceCNS: uint256,
    recyclerAccountId: uint256,
    recyclerAmountCNS: int256,
    recyclerBalanceCNS: uint256,
})
export type ClearingFrozenAccountOrderEventArgs = EParams<typeof ClearingFrozenAccountOrder>

/** ClearingInvalidCloseOrder(uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const ClearingInvalidCloseOrder = event('0xae6369c6e529c86dd87431d10e0db70657c834daa75356e1efd7c0ac79f934b7', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    lockedBalanceCNS: uint256,
    recyclerAccountId: uint256,
    recyclerAmountCNS: int256,
    recyclerBalanceCNS: uint256,
})
export type ClearingInvalidCloseOrderEventArgs = EParams<typeof ClearingInvalidCloseOrder>

/** ClearingRemainingOrderLockBeyondBalance(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const ClearingRemainingOrderLockBeyondBalance = event('0x6d6191eb9e6651b10a6b278ab4d021e3c8b8810a0290234d29d74556915d5dcf', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    pricePNS: uint256,
    remainingLotLNS: uint256,
    lockedBalanceCNS: uint256,
    excessiveLockedBalCNS: uint256,
    recyclerAccountId: uint256,
    recyclerAmountCNS: int256,
    recyclerBalanceCNS: uint256,
})
export type ClearingRemainingOrderLockBeyondBalanceEventArgs = EParams<typeof ClearingRemainingOrderLockBeyondBalance>

/** ClearingSelfMatchingOrder(uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const ClearingSelfMatchingOrder = event('0x52d5291dc7b477ebda965d0693c67e6ccec5b3667b530305685465384756d3fd', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    lockedBalanceCNS: uint256,
    recyclerAccountId: uint256,
    recyclerAmountCNS: int256,
    recyclerBalanceCNS: uint256,
})
export type ClearingSelfMatchingOrderEventArgs = EParams<typeof ClearingSelfMatchingOrder>

/** CloseOrderExceedsPosition(uint256,uint256) */
export const CloseOrderExceedsPosition = event('0x604559a5e01ca154dad1c02a9ef408530f8fa41f3506e6a57f7d2ac727e14822', {
    posLotLNS: uint256,
    orderLotLNS: uint256,
})
export type CloseOrderExceedsPositionEventArgs = EParams<typeof CloseOrderExceedsPosition>

/** CloseOrderPositionMismatch(uint8,uint8) */
export const CloseOrderPositionMismatch = event('0x189a4ff828fb1a93c81a2248c39ac499b67bf632ade3d5f89935821e8d1ec998', {
    positionType: uint8,
    orderType: uint8,
})
export type CloseOrderPositionMismatchEventArgs = EParams<typeof CloseOrderPositionMismatch>

/** CollateralDecreaseDeclined(uint256,uint256,string) */
export const CollateralDecreaseDeclined = event('0x8197894e93a93f60bb4024782ca25f3402b91b549a53da47eae6287ce13d7073', {
    perpId: uint256,
    accountId: uint256,
    reason: string,
})
export type CollateralDecreaseDeclinedEventArgs = EParams<typeof CollateralDecreaseDeclined>

/** CollateralDecreaseRequestCancelled(uint256,uint256) */
export const CollateralDecreaseRequestCancelled = event('0x25cb41632994165977216ca86070cf4f14c696e259419044e9d2de44c5955c5c', {
    perpId: uint256,
    accountId: uint256,
})
export type CollateralDecreaseRequestCancelledEventArgs = EParams<typeof CollateralDecreaseRequestCancelled>

/** CollateralDecreaseRequestExpired(uint256,uint256,uint256,uint256) */
export const CollateralDecreaseRequestExpired = event('0xb4cbbb4a79087ef85485ec777721c815de25aac9940c011694a831a77d30aa86', {
    perpId: uint256,
    accountId: uint256,
    expiryTS: uint256,
    blockTS: uint256,
})
export type CollateralDecreaseRequestExpiredEventArgs = EParams<typeof CollateralDecreaseRequestExpired>

/** CollateralDecreaseRequested(uint256,uint256,uint256,uint256,bool,uint8,uint256,uint256) */
export const CollateralDecreaseRequested = event('0xd990ce6190d58ffb8c06ec564b7ebdac6a21afe5b067513aba6cbf478ccac6e9', {
    perpId: uint256,
    accountId: uint256,
    expiryTS: uint256,
    amountCNS: uint256,
    clampToMaximum: bool,
    positionType: uint8,
    entryPricePNS: uint256,
    lotLNS: uint256,
})
export type CollateralDecreaseRequestedEventArgs = EParams<typeof CollateralDecreaseRequested>

/** CollateralDeposit(uint256,uint256,uint256) */
export const CollateralDeposit = event('0x84b5adc99a7d46a960b87da6e4882021bab65d63c6d02c9bcfc52f02e710b1e3', {
    accountId: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
})
export type CollateralDepositEventArgs = EParams<typeof CollateralDeposit>

/** CollateralWithdrawal(uint256,uint256,uint256) */
export const CollateralWithdrawal = event('0x8a087568cf2efa04e1e6c72c7f61b68a1ac013d6a33bd6e978e1ba2b4efc04d4', {
    accountId: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
})
export type CollateralWithdrawalEventArgs = EParams<typeof CollateralWithdrawal>

/** ContractAdded(uint256,string,string,uint8,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool,uint256,uint256,uint256,uint256,uint256) */
export const ContractAdded = event('0xd78b2274f0f8c5fb36f3464d4fc273e80ba45dde960a535eeacf3c1ae42c4e3c', {
    perpId: uint256,
    name: string,
    symbol: string,
    status: uint8,
    basePricePNS: uint256,
    priceDecimals: uint256,
    lotDecimals: uint256,
    takerFeePer100K: uint256,
    makerFeePer100K: uint256,
    initMarginFracHdths: uint256,
    maintMarginFracHdths: uint256,
    maxOpenInterestLNS: uint256,
    unityDescentThreshHdths: uint256,
    overColDescentThreshHdths: uint256,
    dcpBorrowThreshHdths: uint256,
    priceTolPer100K: uint256,
    marginTol: uint256,
    marginTolDecimals: uint256,
    refPriceMaxAgeSec: uint256,
    absFundingClampPctPer100K: uint256,
    permCancelMinOrders: uint256,
    permCancelSegment: uint256,
    insAmtPer100K: uint256,
    liqInsAmtPer100K: uint256,
    liqUserAmtPer100K: uint256,
    btlRestrictBuyers: bool,
    btlPriceThreshPer100K: uint256,
    btlInsAmtPer100K: uint256,
    btlUserAmtPer100K: uint256,
    btlBuyerAmtPer100K: uint256,
    numPerpetuals: uint256,
})
export type ContractAddedEventArgs = EParams<typeof ContractAdded>

/** ContractAddedV2(uint256,string,string,uint8,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool,uint256,uint256,uint256,uint256,uint256,uint256) */
export const ContractAddedV2 = event('0x1becf712fcdd2a18b8733f07a4063553556025b59ddf9c25906f7ae87b1296a0', {
    perpId: uint256,
    name: string,
    symbol: string,
    status: uint8,
    basePricePNS: uint256,
    priceDecimals: uint256,
    lotDecimals: uint256,
    initMarginFracHdths: uint256,
    maintMarginFracHdths: uint256,
    maxOpenInterestLNS: uint256,
    unityDescentThreshHdths: uint256,
    overColDescentThreshHdths: uint256,
    dcpBorrowThreshHdths: uint256,
    priceTolPer100K: uint256,
    marginTol: uint256,
    marginTolDecimals: uint256,
    refPriceMaxAgeSec: uint256,
    absFundingClampPctPer100K: uint256,
    permCancelMinOrders: uint256,
    permCancelSegment: uint256,
    insAmtPer100K: uint256,
    liqInsAmtPer100K: uint256,
    liqUserAmtPer100K: uint256,
    btlRestrictBuyers: bool,
    btlPriceThreshPer100K: uint256,
    btlInsAmtPer100K: uint256,
    btlUserAmtPer100K: uint256,
    btlBuyerAmtPer100K: uint256,
    numPerpetuals: uint256,
    perpFeeSchedId: uint256,
})
export type ContractAddedV2EventArgs = EParams<typeof ContractAddedV2>

/** ContractLinkFeedUpdated(uint256,bytes32) */
export const ContractLinkFeedUpdated = event('0x9c03c6796385c736172929a88c5f8c4fc7c287d6df80c75f290d4f18ca9ece72', {
    perpId: uint256,
    feedId: bytes32,
})
export type ContractLinkFeedUpdatedEventArgs = EParams<typeof ContractLinkFeedUpdated>

/** ContractNotOperational(uint256,uint8) */
export const ContractNotOperational = event('0xa532a27d068a9d4b869c6cc37b1c8edd12d861261edcad20311cfc140d1190bc', {
    perpId: uint256,
    status: uint8,
})
export type ContractNotOperationalEventArgs = EParams<typeof ContractNotOperational>

/** ContractPaused(uint256,bool) */
export const ContractPaused = event('0x2bf3500d8e3b78624f68716bdcfccb30df6b6ef393561a3ffa32e8d357ac7e43', {
    perpId: uint256,
    paused: bool,
})
export type ContractPausedEventArgs = EParams<typeof ContractPaused>

/** ContractRemoved(uint256) */
export const ContractRemoved = event('0xc1c33d1bd4abb6d1a8ed08f6a49cdf51c1db8b81ce6810a713fcd0291cc63f97', {
    perpId: uint256,
})
export type ContractRemovedEventArgs = EParams<typeof ContractRemoved>

/** ContractVersionSet(uint256,uint256,uint256) */
export const ContractVersionSet = event('0xba6333825ca481f4a4f14e9a10551e20687f7aaedba1cff02498d5311d69804b', {
    major: uint256,
    minor: uint256,
    patch: uint256,
})
export type ContractVersionSetEventArgs = EParams<typeof ContractVersionSet>

/** CrossesBook(uint256,bool) */
export const CrossesBook = event('0xc0ed4041bfe51a7b847f46f096b9d2495866089371037e3efd436bd858f46edd', {
    minAskOrMaxBidPNS: uint256,
    maxOrdersChecked: bool,
})
export type CrossesBookEventArgs = EParams<typeof CrossesBook>

/** DcpBorrowThreshUpdated(uint256,uint256) */
export const DcpBorrowThreshUpdated = event('0xbe36b3b0b7a3a58d54c694996c6aadba93761ca8210af4d6b72115c02aa210e4', {
    perpId: uint256,
    threshHdths: uint256,
})
export type DcpBorrowThreshUpdatedEventArgs = EParams<typeof DcpBorrowThreshUpdated>

/** DecreaseCollateralBeyondMarkPrice(uint256,uint256,uint8,uint256,uint256) */
export const DecreaseCollateralBeyondMarkPrice = event('0xd70dcea04756ab23b8663cb4528ddd657c55ea6dbc95b4481b62b25d028633ab', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    impactAdjPricePNS: uint256,
    markPricePNS: uint256,
})
export type DecreaseCollateralBeyondMarkPriceEventArgs = EParams<typeof DecreaseCollateralBeyondMarkPrice>

/** DefaultPerpFeeScheduleSet(uint256,uint256[8],uint256[8]) */
export const DefaultPerpFeeScheduleSet = event('0x4b2fdfeb835736d95c94c9c22e9947e8b956edf5c01ab0c9347de67c91634026', {
    feeSchedId: indexed(uint256),
    takerFeesPer100K: fixedSizeArray(uint256, 8),
    makerFeesPer100K: fixedSizeArray(uint256, 8),
})
export type DefaultPerpFeeScheduleSetEventArgs = EParams<typeof DefaultPerpFeeScheduleSet>

/** DefaultRwaFeeScheduleSet(uint256,uint256[8],uint256[8]) */
export const DefaultRwaFeeScheduleSet = event('0xc570885d85c57ba864cc296d7434037954b86c448ac1a10a42f93022477a32ea', {
    feeSchedId: indexed(uint256),
    takerFeesPer100K: fixedSizeArray(uint256, 8),
    makerFeesPer100K: fixedSizeArray(uint256, 8),
})
export type DefaultRwaFeeScheduleSetEventArgs = EParams<typeof DefaultRwaFeeScheduleSet>

/** DeleveragePositionListEmpty(uint256,uint256) */
export const DeleveragePositionListEmpty = event('0x64846a095feab375f007bd15ab65eefdf07957e365b3c7ee4711cd9dbdecabe7', {
    perpId: uint256,
    accountId: uint256,
})
export type DeleveragePositionListEmptyEventArgs = EParams<typeof DeleveragePositionListEmpty>

/** ExceedsLastExecutionBlock(uint256) */
export const ExceedsLastExecutionBlock = event('0x9f38a7d29e6c9e707bfe5fee47b29748083dc31546de0135d48ed99db5e190f0', {
    lastExecutionBlock: uint256,
})
export type ExceedsLastExecutionBlockEventArgs = EParams<typeof ExceedsLastExecutionBlock>

/** ExchangeHalted(bool) */
export const ExchangeHalted = event('0xb405a09f729f41978995eba596767f10784a912a3e8d56a978e5e167c1b23d7d', {
    halted: bool,
})
export type ExchangeHaltedEventArgs = EParams<typeof ExchangeHalted>

/** ExchangeInitialized(address,address,uint256,uint256,uint256,uint256,uint256,bool) */
export const ExchangeInitialized = event('0x7b1f94d30e47df15616bc31716546ce84737fcf471dff8cd336c68fb810d7e6f', {
    sender: address,
    collateralToken: address,
    collateralDecimals: uint256,
    minAccountOpenCNS: uint256,
    wrlsThousandthsTvl: uint256,
    wrlsMinWithdrawLimitCNS: uint256,
    recycleFeeCNS: uint256,
    whitelistingEnabled: bool,
})
export type ExchangeInitializedEventArgs = EParams<typeof ExchangeInitialized>

/** FeeParamsUpdated(uint256,uint256) */
export const FeeParamsUpdated = event('0x95e1172237a02916c6d5aba284d04aa4e02e876b0c666387d62f03d0cd77719a', {
    perpId: uint256,
    insAmtPer100K: uint256,
})
export type FeeParamsUpdatedEventArgs = EParams<typeof FeeParamsUpdated>

/** FeeScheduleMigrated(uint256,uint256[8],uint256[8],uint256[8],uint256[8]) */
export const FeeScheduleMigrated = event('0x2720a819739f6849a0528a00a47e2bfa3ea69be8c56bbe0c64e84bf724209cd2', {
    feeSchedId: indexed(uint256),
    oldTakerFees: fixedSizeArray(uint256, 8),
    oldMakerFees: fixedSizeArray(uint256, 8),
    newTakerFees: fixedSizeArray(uint256, 8),
    newMakerFees: fixedSizeArray(uint256, 8),
})
export type FeeScheduleMigratedEventArgs = EParams<typeof FeeScheduleMigrated>

/** FeeScheduleSet(uint256,uint256[8],uint256[8]) */
export const FeeScheduleSet = event('0xaa9c5d7da8c2c38192f049062f4938c3fb0645f1092317b7cc155a5c437e7c58', {
    feeSchedId: indexed(uint256),
    takerFeesPer100K: fixedSizeArray(uint256, 8),
    makerFeesPer100K: fixedSizeArray(uint256, 8),
})
export type FeeScheduleSetEventArgs = EParams<typeof FeeScheduleSet>

/** FeeUnitRedenominated(uint256,uint256,uint256,uint256,uint256) */
export const FeeUnitRedenominated = event('0xdfd108d373bafe6f89a768467808f5b3732e9655c63005eb664a40a85c093db8', {
    oldDenominator: uint256,
    newDenominator: uint256,
    unitScale: uint256,
    rateDiv: uint256,
    migratedScheduleCount: uint256,
})
export type FeeUnitRedenominatedEventArgs = EParams<typeof FeeUnitRedenominated>

/** FundingClampPctUpdated(uint256,uint256) */
export const FundingClampPctUpdated = event('0x70df7db68793145153f083606826dfc0e51ef634e3d99f5a8ff74d7fd27405e6', {
    perpId: uint256,
    clampPctPer100k: uint256,
})
export type FundingClampPctUpdatedEventArgs = EParams<typeof FundingClampPctUpdated>

/** FundingEventCompleted(uint256,uint256,int256,int256,uint256,int48,int48,bool) */
export const FundingEventCompleted = event('0x9c0e05c2bbc786a75afe5fed63ff9274f7c690af8ea4e843e07f2a525295c104', {
    perpId: uint256,
    fundingEventBlock: uint256,
    specifiedRatePct100k: int256,
    actualRatePct100k: int256,
    fundingPricePNS: uint256,
    fundingPaymentPNS: int48,
    fundingSumPNS: int48,
    allowOverwrite: bool,
})
export type FundingEventCompletedEventArgs = EParams<typeof FundingEventCompleted>

/** FundingEventSetTooEarly(uint256,uint256,uint256) */
export const FundingEventSetTooEarly = event('0xe0a0c6a40b4bf56f73bec44f57f213f583e95a0be298411ea97afbe135c07d82', {
    perpId: uint256,
    blockNumber: uint256,
    fundingEventBlock: uint256,
})
export type FundingEventSetTooEarlyEventArgs = EParams<typeof FundingEventSetTooEarly>

/** FundingPriceExceedsTol(uint256,uint256,uint256,uint256) */
export const FundingPriceExceedsTol = event('0x2030ce993f9f888e4d2a20dcbf75ead5d3de6742ef5fa8e75a47849a41a4af57', {
    perpId: uint256,
    fundingPricePNS: uint256,
    oraclePNS: uint256,
    tolerancePer100k: uint256,
})
export type FundingPriceExceedsTolEventArgs = EParams<typeof FundingPriceExceedsTol>

/** FundingSumAlreadySet(uint256,uint256,uint256,uint256) */
export const FundingSumAlreadySet = event('0xdd8c0c9dcb3ad98da85346fa23e456a8128ec3fc478eaacb4990e450880308cc', {
    perpId: uint256,
    fundingEventBlock: uint256,
    storageIndex: uint256,
    fundingSumOffset: uint256,
})
export type FundingSumAlreadySetEventArgs = EParams<typeof FundingSumAlreadySet>

/** FundingSumScalingExpUpdated(uint256,uint256) */
export const FundingSumScalingExpUpdated = event('0xadcb9d4361f4e7a9b24f7e64233ca46ad439a4a73c432dc31165fbdefd6f8377', {
    perpId: uint256,
    newExp: uint256,
})
export type FundingSumScalingExpUpdatedEventArgs = EParams<typeof FundingSumScalingExpUpdated>

/** IgnoreOracleUpdated(uint256,bool) */
export const IgnoreOracleUpdated = event('0x8ac110193a47d8207dd88897368f2031dd31bfea6bcfd9a2b3ea6759e81c4e14', {
    perpId: uint256,
    ignOracle: bool,
})
export type IgnoreOracleUpdatedEventArgs = EParams<typeof IgnoreOracleUpdated>

/** ImmediateOrCancelExecuted(uint256,uint256) */
export const ImmediateOrCancelExecuted = event('0x59468f520017226c0116472def96f905dbeff518444091b355de591a2161cdbe', {
    unmatchedLotLNS: uint256,
    totalLotLNS: uint256,
})
export type ImmediateOrCancelExecutedEventArgs = EParams<typeof ImmediateOrCancelExecuted>

/** IncreasePositionCollateral(uint256,uint256,uint256,uint256,uint256) */
export const IncreasePositionCollateral = event('0x577ed0a8f65f2feb5a407660b0a3009c2ee155a17d0e34947c58ecdd6c8b3771', {
    perpId: uint256,
    accountId: uint256,
    positionDepositCNS: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
})
export type IncreasePositionCollateralEventArgs = EParams<typeof IncreasePositionCollateral>

/** InitialMarginFractionUpdated(uint256,uint256) */
export const InitialMarginFractionUpdated = event('0x9c6091bfb36035e2973fb3ad5c07d8c5d74d0981770feea276a41c4221246f0e', {
    perpId: uint256,
    initMarginFracHdths: uint256,
})
export type InitialMarginFractionUpdatedEventArgs = EParams<typeof InitialMarginFractionUpdated>

/** Initialized(uint8) */
export const Initialized = event('0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498', {
    version: uint8,
})
export type InitializedEventArgs = EParams<typeof Initialized>

/** InsolventPositionCannotBeForcedClose(uint256,uint256,uint8,uint256,uint256) */
export const InsolventPositionCannotBeForcedClose = event('0x2d77916ace43e6acd02840c860e1e53ff9192b11b1e4dd447dddbcd4b5a4a5c3', {
    perpId: uint256,
    posAccountId: uint256,
    positionType: uint8,
    bankruptcyPricePNS: uint256,
    markPricePNS: uint256,
})
export type InsolventPositionCannotBeForcedCloseEventArgs = EParams<typeof InsolventPositionCannotBeForcedClose>

/** InsufficientFundsToDecCollateral(uint256,uint256,uint256,uint256) */
export const InsufficientFundsToDecCollateral = event('0x2d1899850ba9b9c9b74657311b57a098fafc67bacd47c2572b10b1d481586465', {
    perpId: uint256,
    accountId: uint256,
    amountCNS: uint256,
    withdrawMaxCNS: uint256,
})
export type InsufficientFundsToDecCollateralEventArgs = EParams<typeof InsufficientFundsToDecCollateral>

/** InsuficientFundsForRecycleFee(uint256,uint256,uint256,uint256,uint256) */
export const InsuficientFundsForRecycleFee = event('0xe45a99fff28c6d15925d1e2d85178b939f8809e353ffdd55bc03edb410aa24de', {
    perpId: uint256,
    accountId: uint256,
    balanceCNS: uint256,
    lockedCNS: uint256,
    recycleFeeCNS: uint256,
})
export type InsuficientFundsForRecycleFeeEventArgs = EParams<typeof InsuficientFundsForRecycleFee>

/** InsurancePaymentForSettlement(uint256,uint256,uint256) */
export const InsurancePaymentForSettlement = event('0x24600c3aa8cc38cbdf9648ea5ebfea6227de49651807d1a2a58fe70ea24953cc', {
    perpId: uint256,
    accountId: uint256,
    insPaymentCNS: uint256,
})
export type InsurancePaymentForSettlementEventArgs = EParams<typeof InsurancePaymentForSettlement>

/** InvalidAccountFrozenOrder(uint8,bool) */
export const InvalidAccountFrozenOrder = event('0xcbb789ca59a70c9d9ac308b2f773480d433619886320ba81e8e871690fc220c3', {
    orderType: uint8,
    immediateOrCancel: bool,
})
export type InvalidAccountFrozenOrderEventArgs = EParams<typeof InvalidAccountFrozenOrder>

/** InvalidBankruptcyPrice(uint256,uint256,uint256,uint256,uint256,int256) */
export const InvalidBankruptcyPrice = event('0x2e92846d5b5d5dd9cf60dd19064afe4a911e6751cdad455cb26a600db66e963c', {
    perpId: uint256,
    accountId: uint256,
    depositCNS: uint256,
    posPricePNS: uint256,
    liqLotLNS: uint256,
    premiumPnlCNS: int256,
})
export type InvalidBankruptcyPriceEventArgs = EParams<typeof InvalidBankruptcyPrice>

/** InvalidExpiryBlock(uint256,uint256) */
export const InvalidExpiryBlock = event('0x8ecb05e775f8b004d0796e497a6b28cfe97a6f8acd115327138350b5a08347ed', {
    expiryBlock: uint256,
    blockNumber: uint256,
})
export type InvalidExpiryBlockEventArgs = EParams<typeof InvalidExpiryBlock>

/** InvalidLinkReportForContract(uint256,bytes32,bytes32) */
export const InvalidLinkReportForContract = event('0xe9ab5ccfbd8b803e0bd519630f62d1a32b22e517a5bfcd78e8c860b36c98386b', {
    perpId: uint256,
    perpFeedId: bytes32,
    reportFeedId: bytes32,
})
export type InvalidLinkReportForContractEventArgs = EParams<typeof InvalidLinkReportForContract>

/** InvalidLinkReportVersion(uint256,uint256) */
export const InvalidLinkReportVersion = event('0x09c9ec7d8ebb7546d7aa7fae159f14736cab80420326900e4b1ce60942f331d8', {
    perpId: uint256,
    reportVersion: uint256,
})
export type InvalidLinkReportVersionEventArgs = EParams<typeof InvalidLinkReportVersion>

/** InvalidLiquidationPrice(uint256,uint256,uint256,uint256,uint256,int256) */
export const InvalidLiquidationPrice = event('0x0df65f0bfef22299d2332a74323c24d136c79b82d668afc82cfe8dfb0d75a2f2', {
    perpId: uint256,
    accountId: uint256,
    depositCNS: uint256,
    posPricePNS: uint256,
    liqLotLNS: uint256,
    premiumPnlCNS: int256,
})
export type InvalidLiquidationPriceEventArgs = EParams<typeof InvalidLiquidationPrice>

/** InvalidOrderId(uint256,uint256,uint256) */
export const InvalidOrderId = event('0xe99e76b7075a2c30a8d971cb3f247cba3e1995e4d12ff31053b190b2f71dcc7b', {
    orderId: uint256,
    min: uint256,
    max: uint256,
})
export type InvalidOrderIdEventArgs = EParams<typeof InvalidOrderId>

/** LastForwardedDescIdReset(uint256,uint256) */
export const LastForwardedDescIdReset = event('0xc0541f32f5c37f170acf579ae2de8be00385c7ab848fb4b1f19340fd41d58844', {
    accountId: uint256,
    newDescId: uint256,
})
export type LastForwardedDescIdResetEventArgs = EParams<typeof LastForwardedDescIdReset>

/** LastTriggeredDescIdReset(uint256,uint256) */
export const LastTriggeredDescIdReset = event('0xa04001d82f77cdc968e0f2d5a478c76bb47ca32033001fe324c0f1bf89446ecd', {
    accountId: uint256,
    newDescId: uint256,
})
export type LastTriggeredDescIdResetEventArgs = EParams<typeof LastTriggeredDescIdReset>

/** LinkDatastreamConfigured(address) */
export const LinkDatastreamConfigured = event('0xa9a3e53f31ef1464015e1b64897b819880bcc9787e25987d6d4336f3613ade26', {
    verifierProxy: address,
})
export type LinkDatastreamConfiguredEventArgs = EParams<typeof LinkDatastreamConfigured>

/** LinkDsError(uint256,string) */
export const LinkDsError = event('0xd83687e05ff302f677e5adcaeee1a4cb3c6473e57b9000d71f2c42ff6ada466c', {
    perpId: uint256,
    reason: string,
})
export type LinkDsErrorEventArgs = EParams<typeof LinkDsError>

/** LinkDsError(uint256,bytes) */
export const LinkDsError_1 = event('0x7d7f9345462f0c85c00b5c2083a2ddd2d72fb70e98d0ebed71562cba6feef687', {
    perpId: uint256,
    lowLevelData: bytes,
})
export type LinkDsErrorEventArgs_1 = EParams<typeof LinkDsError_1>

/** LinkDsPanic(uint256,uint256) */
export const LinkDsPanic = event('0xe526d22a15e94c788050d8c0ca8cddc836ce3580e3dbe7ac64afb9229c7d633e', {
    perpId: uint256,
    errorCode: uint256,
})
export type LinkDsPanicEventArgs = EParams<typeof LinkDsPanic>

/** LinkPriceUpdated(uint256,uint256,uint256) */
export const LinkPriceUpdated = event('0x5e3f1c81da4dcfcb835cba6457aa389114f5d309917179746b46ac03953f56b2', {
    perpId: uint256,
    oraclePricePNS: uint256,
    timestamp: uint256,
})
export type LinkPriceUpdatedEventArgs = EParams<typeof LinkPriceUpdated>

/** LiquidationBuyerUpdated(address,uint256,bool) */
export const LiquidationBuyerUpdated = event('0xfe982a540a46b78ba39fe94b2fec322414acda6ca69e165520017d474e0dee48', {
    liquidationBuyer: address,
    accountId: uint256,
    added: bool,
})
export type LiquidationBuyerUpdatedEventArgs = EParams<typeof LiquidationBuyerUpdated>

/** LiquidationParamsUpdated(uint256,uint256,uint256,uint256) */
export const LiquidationParamsUpdated = event('0x61c468e821b1662263e339e465b2b8aa3c36b504f804ffac4a19ad8eae3df813', {
    perpId: uint256,
    insAmtPer100K: uint256,
    liqAmtPer100K: uint256,
    userAmtPer100K: uint256,
})
export type LiquidationParamsUpdatedEventArgs = EParams<typeof LiquidationParamsUpdated>

/** LotOutOfRange(uint256,uint256) */
export const LotOutOfRange = event('0x36bcd027a371ec05acd4f563a155f51be204511b55fb95d0451703d02e3ca185', {
    minLotLNS: uint256,
    maxLotLNS: uint256,
})
export type LotOutOfRangeEventArgs = EParams<typeof LotOutOfRange>

/** MaintenanceMarginFractionUpdated(uint256,uint256) */
export const MaintenanceMarginFractionUpdated = event('0x258cfea0edc89c1ba4ce7d75bd475712ab2a06ce19794e2193cbd64f182a3f78', {
    perpId: uint256,
    maintMarginFracHdths: uint256,
})
export type MaintenanceMarginFractionUpdatedEventArgs = EParams<typeof MaintenanceMarginFractionUpdated>

/** MakerFeeUpdated(uint256,uint256) */
export const MakerFeeUpdated = event('0x6bf5f38f4e94f47ae7a4d6e56dbf388c856f890b5f0f2808b66914710b0266ca', {
    perpId: uint256,
    makerFeePer100K: uint256,
})
export type MakerFeeUpdatedEventArgs = EParams<typeof MakerFeeUpdated>

/** MakerOrderFilled(uint256,uint256,uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const MakerOrderFilled = event('0xf5f5aef063f495816b6982c44c70c97c8fbec2fa24b73487e6542ce021431214', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    pricePNS: uint256,
    lotLNS: uint256,
    feeCNS: uint256,
    lockedBalanceCNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
})
export type MakerOrderFilledEventArgs = EParams<typeof MakerOrderFilled>

/** MakerOrderFilledV2(uint256,uint256,uint256,uint256,uint256,uint256,uint256,int256,uint256,uint256,uint256) */
export const MakerOrderFilledV2 = event('0xa59d6df87b5cb9e8cca8c09e8f1e240b7a1d4a2ee8f6c636c12ce22b43b82d70', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    pricePNS: uint256,
    lotLNS: uint256,
    feeCNS: uint256,
    lockedBalanceCNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
    builderId: uint256,
    builderFeeCNS: uint256,
})
export type MakerOrderFilledV2EventArgs = EParams<typeof MakerOrderFilledV2>

/** MakerOrderSettlementFailed(uint256,uint256,uint256,uint8,uint256,uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const MakerOrderSettlementFailed = event('0x1c304023b27262393dcde9fe67af613bc45ee4f8c452b031dc393d074031157b', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    orderType: uint8,
    pricePNS: uint256,
    lotLNS: uint256,
    maxNegPnlCollatBPS: uint256,
    reason: uint256,
    lockedBalanceCNS: uint256,
    recyclerAccountId: uint256,
    recyclerAmountCNS: int256,
    recyclerBalanceCNS: uint256,
})
export type MakerOrderSettlementFailedEventArgs = EParams<typeof MakerOrderSettlementFailed>

/** MarginTolUpdated(uint256,uint256,uint256) */
export const MarginTolUpdated = event('0xca21b8a8b8d11b0faf46a19341a9e5fa3d668a48778efaff9fbec48fa21e5df0', {
    perpId: uint256,
    tolerance: uint256,
    decimals: uint256,
})
export type MarginTolUpdatedEventArgs = EParams<typeof MarginTolUpdated>

/** MarkExceedsTol(uint256,uint256,uint256,uint256) */
export const MarkExceedsTol = event('0x3988d14888f50c39e6b838927480e13c79fd6c5cfdfb08a1b02febe997a3571e', {
    perpId: uint256,
    markPNS: uint256,
    spotOraclePricePNS: uint256,
    tolerancePer100k: uint256,
})
export type MarkExceedsTolEventArgs = EParams<typeof MarkExceedsTol>

/** MarkPriceAgeExceedsMax(uint256,uint256,uint256,uint256) */
export const MarkPriceAgeExceedsMax = event('0x7d19aaecec937dccd460f6ff611aadbc7bfa5ef672ef8fb6cfaf12ea804ed4a0', {
    perpId: uint256,
    markTimestamp: uint256,
    timestamp: uint256,
    maxAgeSec: uint256,
})
export type MarkPriceAgeExceedsMaxEventArgs = EParams<typeof MarkPriceAgeExceedsMax>

/** MarkUpdated(uint256,uint256) */
export const MarkUpdated = event('0x65ec400f2e8b22c7064f99991d01828c6a55acaa066b3fdba3bf5a491b1a6a4c', {
    perpId: uint256,
    pricePNS: uint256,
})
export type MarkUpdatedEventArgs = EParams<typeof MarkUpdated>

/** MaxMatchesReached() */
export const MaxMatchesReached = event('0xb492fac0bb9e8c8d824bf2a4c19ec1efd3e98e987de34e127bc17eb2b5c0605e', {})
export type MaxMatchesReachedEventArgs = EParams<typeof MaxMatchesReached>

/** MaxOpenInterestUpdated(uint256,uint256) */
export const MaxOpenInterestUpdated = event('0x672c0a156ee23d5a79ee89b233d6d30458115eabf152fb294cb8a894eadeeb11', {
    perpId: uint256,
    maxOpenInterestLNS: uint256,
})
export type MaxOpenInterestUpdatedEventArgs = EParams<typeof MaxOpenInterestUpdated>

/** MaximumAccountOrders(uint256,uint256) */
export const MaximumAccountOrders = event('0xbd608c77710b601b3c0b0f34d13295beb58c48631119b910d8d6067ad650d5b8', {
    perpId: uint256,
    accountId: uint256,
})
export type MaximumAccountOrdersEventArgs = EParams<typeof MaximumAccountOrders>

/** MinAccountOpenAmountUpdated(uint256) */
export const MinAccountOpenAmountUpdated = event('0x0fface2454d594caf83c2c1b1f8da428b41a8585fcf72713ea6ce39cd6cba9fc', {
    minAccountOpenCNS: uint256,
})
export type MinAccountOpenAmountUpdatedEventArgs = EParams<typeof MinAccountOpenAmountUpdated>

/** MinPostUpdated(uint256) */
export const MinPostUpdated = event('0xcd3426b08e2946f33fe401b723f71049867976631425553ecf95848fc4b088a9', {
    minPostCNS: uint256,
})
export type MinPostUpdatedEventArgs = EParams<typeof MinPostUpdated>

/** MinSettleUpdated(uint256) */
export const MinSettleUpdated = event('0x8ad800de6b48db2a4430821a66e9ea34dee8c66fea63f8a83559bf91279cf77c', {
    minSettleCNS: uint256,
})
export type MinSettleUpdatedEventArgs = EParams<typeof MinSettleUpdated>

/** MonitorAdministratorUpdated(address,bool) */
export const MonitorAdministratorUpdated = event('0x42d42feead688fc3d6ed9ec2f9d2082ee29949efea1263eb51fb2f61f1f35c55', {
    monitorAdministrator: address,
    added: bool,
})
export type MonitorAdministratorUpdatedEventArgs = EParams<typeof MonitorAdministratorUpdated>

/** MonitorPauseAttempted(uint256,uint8,bool) */
export const MonitorPauseAttempted = event('0xcf3fd822380bbbd58d2963ba6984f53ab47660d73e9515246b4865cbf28919ba', {
    perpId: uint256,
    actualStatus: uint8,
    transitioned: bool,
})
export type MonitorPauseAttemptedEventArgs = EParams<typeof MonitorPauseAttempted>

/** OracleAgeExceedsMax(uint256,uint256,uint256,uint256) */
export const OracleAgeExceedsMax = event('0xa8ea47e93f284c6600be84b692d51af848f0cc9115e2c7d7d4048983348f9b2d', {
    perpId: uint256,
    oracleTimestamp: uint256,
    timestamp: uint256,
    maxAgeSec: uint256,
})
export type OracleAgeExceedsMaxEventArgs = EParams<typeof OracleAgeExceedsMax>

/** OracleDisabled(uint256) */
export const OracleDisabled = event('0x36f8ddb481e1d66678af53feb8d0fdddc463c11ce08cda4e93ac2065d26634dd', {
    perpId: uint256,
})
export type OracleDisabledEventArgs = EParams<typeof OracleDisabled>

/** OrderBatchCompleted(uint256) */
export const OrderBatchCompleted = event('0xc2813e86d911b51775079b03b9fcab443ec450bc1634cf75dd578874a0af7add', {
    gasLeft: uint256,
})
export type OrderBatchCompletedEventArgs = EParams<typeof OrderBatchCompleted>

/** OrderCancelled(uint256,int256,uint256) */
export const OrderCancelled = event('0xe9805f82cb3729e97b234bb6bb4f90ea971e2c274201ff71818ebde153e1b0a6', {
    lockedBalanceCNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
})
export type OrderCancelledEventArgs = EParams<typeof OrderCancelled>

/** OrderCancelledByAdmin(uint256,uint256,uint256,uint256) */
export const OrderCancelledByAdmin = event('0x3669d8cc87cc659246c535cf34b73f019e2da2a48e04d14093701e877fb6eac6', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    lockedBalanceCNS: uint256,
})
export type OrderCancelledByAdminEventArgs = EParams<typeof OrderCancelledByAdmin>

/** OrderCancelledByLiquidator(uint256,uint256,uint256,uint256) */
export const OrderCancelledByLiquidator = event('0xb52688454dfd5028443d05c10bc78a9ca263b7c7645d2e8bfef428d0e8b3b047', {
    perpId: uint256,
    accountId: uint256,
    orderId: uint256,
    lockedBalanceCNS: uint256,
})
export type OrderCancelledByLiquidatorEventArgs = EParams<typeof OrderCancelledByLiquidator>

/** OrderChanged(uint256,uint256,uint256,uint256,uint256,uint256) */
export const OrderChanged = event('0xbf5d27a683d1ce858f6095fde2cc9837ba595c533e97576c5ff3de4376ccbf3c', {
    orderId: uint256,
    pricePNS: uint256,
    lotLNS: uint256,
    expiryBlock: uint256,
    lockedBalanceCNS: uint256,
    balanceCNS: uint256,
})
export type OrderChangedEventArgs = EParams<typeof OrderChanged>

/** OrderDescIdTooLow(uint256) */
export const OrderDescIdTooLow = event('0x6be50b396ca4962b3810cd9e65b8160cd24180a1e7adbc2c795e8dd090891284', {
    lastOrderDescId: uint256,
})
export type OrderDescIdTooLowEventArgs = EParams<typeof OrderDescIdTooLow>

/** OrderDoesNotExist(uint256,uint256) */
export const OrderDoesNotExist = event('0x69b92a906c4fe940cd3de572076c4a5181ddced80218575cc4959b1d8f6a6e3f', {
    perpId: uint256,
    orderId: uint256,
})
export type OrderDoesNotExistEventArgs = EParams<typeof OrderDoesNotExist>

/** OrderExtensionRejected(uint256,uint256) */
export const OrderExtensionRejected = event('0x746e68024f6bbed66f66703581157050d81d4442f2da62e132cb1251a4a6717c', {
    perpId: uint256,
    accountId: uint256,
})
export type OrderExtensionRejectedEventArgs = EParams<typeof OrderExtensionRejected>

/** OrderForwardingNotAllowed() */
export const OrderForwardingNotAllowed = event('0xcb7f793535461714e08fcb65e21b3379d2aedbf9c04354ade356a824dcefe9f5', {})
export type OrderForwardingNotAllowedEventArgs = EParams<typeof OrderForwardingNotAllowed>

/** OrderForwardingUpdated(uint256,bool) */
export const OrderForwardingUpdated = event('0x743a9ef374d6b3c905b8fd725a33cc63980a202108bfd3cbf65e94a23640a02e', {
    accountId: uint256,
    allowed: bool,
})
export type OrderForwardingUpdatedEventArgs = EParams<typeof OrderForwardingUpdated>

/** OrderPlaced(uint256,uint256,uint256,int256,uint256) */
export const OrderPlaced = event('0x5d5d31f82cb7d7cf1b09787031cd282c6accc62145d50de980d298bb340a9aba', {
    orderId: uint256,
    lotLNS: uint256,
    lockedBalanceCNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
})
export type OrderPlacedEventArgs = EParams<typeof OrderPlaced>

/** OrderPostFailed(uint256) */
export const OrderPostFailed = event('0x18a118a5bb122057e420b1bcf7903a57ebc749be0d1981d112c6e257e7bd5e88', {
    reason: uint256,
})
export type OrderPostFailedEventArgs = EParams<typeof OrderPostFailed>

/** OrderRequest(uint256,uint256,uint256,uint256,uint8,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256,uint256) */
export const OrderRequest = event('0x02d2bf39d2355aaa5486487e934403fd3ba3f88c73ab71938cee11931fddeb7b', {
    perpId: uint256,
    accountId: uint256,
    orderDescId: uint256,
    orderId: uint256,
    orderType: uint8,
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
    gasLeft: uint256,
})
export type OrderRequestEventArgs = EParams<typeof OrderRequest>

/** OrderRequestV2(uint256,uint256,uint256,uint256,uint8,uint256,uint256,uint256,bool,bool,bool,uint256,uint256,uint256,uint256,uint256,uint256,bytes) */
export const OrderRequestV2 = event('0xb585865280072cb0f2cb5cf0f49f0e0224c09fa012c92c5f33eabf10287b8beb', {
    perpId: uint256,
    accountId: uint256,
    orderDescId: uint256,
    orderId: uint256,
    orderType: uint8,
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
    gasLeft: uint256,
    extension: bytes,
})
export type OrderRequestV2EventArgs = EParams<typeof OrderRequestV2>

/** OrderSettlementImpliesInsolvent(uint256,uint256,uint8,uint256,uint256,uint256,uint256,uint256,uint256) */
export const OrderSettlementImpliesInsolvent = event('0xb971bdbd8f44fbf3ba501ee287c2533eb61b09097d638c664566aac00bbb3e65', {
    perpId: uint256,
    accountId: uint256,
    orderType: uint8,
    pricePNS: uint256,
    lotLNS: uint256,
    perpPositionBalCNS: uint256,
    perpInsuranceBalCNS: uint256,
    addedPosCollatReqCNS: uint256,
    requestedAmountCNS: uint256,
})
export type OrderSettlementImpliesInsolventEventArgs = EParams<typeof OrderSettlementImpliesInsolvent>

/** OrderSizeExceedsAvailableSize(uint256,uint256,uint256) */
export const OrderSizeExceedsAvailableSize = event('0x1b7ba008cbebdd0330e64275c62765a671adbce08d86e7b894f0601a886b78cf', {
    orderLotLNS: uint256,
    availableLotLNS: uint256,
    positionLotLNS: uint256,
})
export type OrderSizeExceedsAvailableSizeEventArgs = EParams<typeof OrderSizeExceedsAvailableSize>

/** OverCollatDescentThreshUpdated(uint256,uint256) */
export const OverCollatDescentThreshUpdated = event('0xb0459c2e01b889e7e78bb7d1400cb3049a1d98ef3d6949439b173c5ffba92dd1', {
    perpId: uint256,
    threshHdths: uint256,
})
export type OverCollatDescentThreshUpdatedEventArgs = EParams<typeof OverCollatDescentThreshUpdated>

/** OwnershipTransferStarted(address,address) */
export const OwnershipTransferStarted = event('0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700', {
    previousOwner: indexed(address),
    newOwner: indexed(address),
})
export type OwnershipTransferStartedEventArgs = EParams<typeof OwnershipTransferStarted>

/** OwnershipTransferred(address,address) */
export const OwnershipTransferred = event('0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0', {
    previousOwner: indexed(address),
    newOwner: indexed(address),
})
export type OwnershipTransferredEventArgs = EParams<typeof OwnershipTransferred>

/** PermissonedCancelParamsUpdated(uint256,uint256) */
export const PermissonedCancelParamsUpdated = event('0xbb5907b6810f0c2966db8e0939fbf4a19724f4e58e2bfd1d15195fdf8b4908a2', {
    cancelMinOrders: uint256,
    cancelSegment: uint256,
})
export type PermissonedCancelParamsUpdatedEventArgs = EParams<typeof PermissonedCancelParamsUpdated>

/** PerpFeeSchedIdSet(uint256,uint256) */
export const PerpFeeSchedIdSet = event('0xb327a32ce0d0806734bf7d447cd736b3286ff1c9c44befb9e81d817a2a41bf4c', {
    perpId: indexed(uint256),
    feeSchedId: uint256,
})
export type PerpFeeSchedIdSetEventArgs = EParams<typeof PerpFeeSchedIdSet>

/** PerpPositionBalCreditPositiveSevere(uint256,uint256,uint256,uint256,bool,bool,int256) */
export const PerpPositionBalCreditPositiveSevere = event('0xbee5185c13c42cac0d82b6c115c77d5e8dc2b2888c013d169e068e634f57f58e', {
    perpId: uint256,
    accountId: uint256,
    realizedPricePNS: uint256,
    lotLNS: uint256,
    userProceedsToPosition: bool,
    buyToLiquidate: bool,
    creditPerpBalCNS: int256,
})
export type PerpPositionBalCreditPositiveSevereEventArgs = EParams<typeof PerpPositionBalCreditPositiveSevere>

/** PositionAdministratorUpdated(address,bool) */
export const PositionAdministratorUpdated = event('0x44f632293c2bd117a0d277a1057b0a5495dfbd57d2e3636bb80f0912ee6d0ba9', {
    positionAdministrator: address,
    added: bool,
})
export type PositionAdministratorUpdatedEventArgs = EParams<typeof PositionAdministratorUpdated>

/** PositionClosed(uint256,uint256,uint8,uint256,int256,int256) */
export const PositionClosed = event('0x599b5f439ed4daf1f28ae8638e5439d3982e8001fb26dd8f70021b38672eb26f', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    pricePNS: uint256,
    deltaPnlCNS: int256,
    fundingCNS: int256,
})
export type PositionClosedEventArgs = EParams<typeof PositionClosed>

/** PositionCollateralDecreased(uint256,uint256,uint8,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256) */
export const PositionCollateralDecreased = event('0xa97e56d50498d7b8acf31641413f46438d6d7d3f6e6acf04c6e7995cab8b66b2', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    markPricePNS: uint256,
    impactAdjPricePNS: uint256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    startEntryPricePNS: uint256,
    endEntryPricePNS: uint256,
    effBmfHdths: uint256,
    decreaseCNS: uint256,
    balanceCNS: uint256,
})
export type PositionCollateralDecreasedEventArgs = EParams<typeof PositionCollateralDecreased>

/** PositionDecreased(uint256,uint256,uint8,uint256,uint256,uint256,uint256,int256,int256) */
export const PositionDecreased = event('0xcd4a9f7ae1cc250eaa0be6bdb30d07efaf0faafb4ff0e76d8fe09a8373e43f85', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    startLotLNS: uint256,
    endLotLNS: uint256,
    deltaPnlCNS: int256,
    fundingCNS: int256,
})
export type PositionDecreasedEventArgs = EParams<typeof PositionDecreased>

/** PositionDeleveraged(uint256,uint256,bool,uint8,uint256,uint256,uint256,int256,int256,uint256,uint256,uint256,uint256,uint256,uint256) */
export const PositionDeleveraged = event('0x3b1e497992fc37fbf896b38202d19417ad54402fa8d8aed214d20f27c34bcabc', {
    perpId: uint256,
    accountId: uint256,
    forceClose: bool,
    positionType: uint8,
    entryPricePNS: uint256,
    markPricePNS: uint256,
    deleveragePricePNS: uint256,
    deltaPnlCNS: int256,
    fundingCNS: int256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    startLotLNS: uint256,
    endLotLNS: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
})
export type PositionDeleveragedEventArgs = EParams<typeof PositionDeleveraged>

/** PositionDeleveragedV2(uint256,uint256,bool,uint8,uint256,uint256,uint256,int256,int256,uint256,uint256,uint256,uint256,uint256,uint256,uint256) */
export const PositionDeleveragedV2 = event('0xc93231d3a87dd7f9a93be23749816504b65b558dee3bb33ca82eab4867669faf', {
    perpId: uint256,
    accountId: uint256,
    forceClose: bool,
    positionType: uint8,
    entryPricePNS: uint256,
    markPricePNS: uint256,
    deleveragePricePNS: uint256,
    deltaPnlCNS: int256,
    fundingCNS: int256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    startLotLNS: uint256,
    endLotLNS: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
    priceResiduePNSQ16: uint256,
})
export type PositionDeleveragedV2EventArgs = EParams<typeof PositionDeleveragedV2>

/** PositionDoesNotExist(uint256,uint256) */
export const PositionDoesNotExist = event('0x6948067a0ba575890268b9a7eaf592a5832287e4402201145ce0768a9d9533fc', {
    perpId: uint256,
    accountId: uint256,
})
export type PositionDoesNotExistEventArgs = EParams<typeof PositionDoesNotExist>

/** PositionIncreased(uint256,uint256,uint8,uint256,uint256,uint256,int256,int256,uint256,uint256,uint256,uint256,uint256,uint256) */
export const PositionIncreased = event('0x2a077a58d72570ce2b985a210c9ad672373eb9bcc337d1dc62b8b75dd644cf27', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    leverageHdths: uint256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    pnlCollateralizedCNS: int256,
    premiumPnlSettledCNS: int256,
    maxNegPnlCollatBPS: uint256,
    pricePNS: uint256,
    startLotLNS: uint256,
    endLotLNS: uint256,
    insFeeCNS: uint256,
    protFeeCNS: uint256,
})
export type PositionIncreasedEventArgs = EParams<typeof PositionIncreased>

/** PositionIncreasedV2(uint256,uint256,uint8,uint256,uint256,uint256,int256,int256,uint256,uint256,uint256,uint256,uint256,uint256,uint256) */
export const PositionIncreasedV2 = event('0x99a74f70c224396b9ba5fcd5a6e5f480db23e7a25a2b16a8c133ec2efb3e646c', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    leverageHdths: uint256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    pnlCollateralizedCNS: int256,
    premiumPnlSettledCNS: int256,
    maxNegPnlCollatBPS: uint256,
    pricePNS: uint256,
    startLotLNS: uint256,
    endLotLNS: uint256,
    insFeeCNS: uint256,
    protFeeCNS: uint256,
    priceResiduePNSQ16: uint256,
})
export type PositionIncreasedV2EventArgs = EParams<typeof PositionIncreasedV2>

/** PositionInverted(uint256,uint256,uint8,uint256,uint256,uint256,int256,uint256,uint256,uint256,int256,int256,uint256,uint256) */
export const PositionInverted = event('0x01a0596385c75b269e896ca6468a2be2edc8b2b5459f4e25ca0a75944390a10c', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    leverageHdths: uint256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
    pnlCollateralizedCNS: int256,
    pricePNS: uint256,
    startLotLNS: uint256,
    endLotLNS: uint256,
    deltaPnlCNS: int256,
    fundingCNS: int256,
    insFeeCNS: uint256,
    protFeeCNS: uint256,
})
export type PositionInvertedEventArgs = EParams<typeof PositionInverted>

/** PositionLiquidated(uint256,uint256,uint8,uint256,uint256,uint256,uint256,int256,int256,int256,uint256,int256,uint256,bool) */
export const PositionLiquidated = event('0x6fc9c0ea1c0531654320ba06740c802447dbdef7c26cf749c4f12553cdd958a9', {
    perpId: uint256,
    posAccountId: uint256,
    positionType: uint8,
    markPricePNS: uint256,
    liqPricePNS: uint256,
    liqLotLNS: uint256,
    posLotLNS: uint256,
    deltaPnlCNS: int256,
    fundingCNS: int256,
    posAmountCNS: int256,
    posDepositCNS: uint256,
    accAmountCNS: int256,
    accBalanceCNS: uint256,
    onOrderBook: bool,
})
export type PositionLiquidatedEventArgs = EParams<typeof PositionLiquidated>

/** PositionLiquidationCredit(uint256,uint256,uint256,uint256) */
export const PositionLiquidationCredit = event('0xf14b2e916a38315c52d00796f7301d83d24a889ea889ef230a501c9dcb524d20', {
    perpId: uint256,
    accountId: uint256,
    startDepositCNS: uint256,
    endDepositCNS: uint256,
})
export type PositionLiquidationCreditEventArgs = EParams<typeof PositionLiquidationCredit>

/** PositionOpened(uint256,uint256,uint8,uint256,uint256,int256,uint256,uint256,uint256,uint256) */
export const PositionOpened = event('0xc0150ebb43a9c2478aa9c69d27078da071ceafb70e2d822d7d39a533e0418728', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    leverageHdths: uint256,
    depositCNS: uint256,
    pnlCollateralizedCNS: int256,
    pricePNS: uint256,
    lotLNS: uint256,
    insFeeCNS: uint256,
    protFeeCNS: uint256,
})
export type PositionOpenedEventArgs = EParams<typeof PositionOpened>

/** PositionOpenedV2(uint256,uint256,uint8,uint256,uint256,int256,uint256,uint256,uint256,uint256,uint256) */
export const PositionOpenedV2 = event('0x04cc3d2fc73a9dca30eba1d05eca80b1b1216350243580027046f434fed4db18', {
    perpId: uint256,
    accountId: uint256,
    positionType: uint8,
    leverageHdths: uint256,
    depositCNS: uint256,
    pnlCollateralizedCNS: int256,
    pricePNS: uint256,
    lotLNS: uint256,
    insFeeCNS: uint256,
    protFeeCNS: uint256,
    priceResiduePNSQ16: uint256,
})
export type PositionOpenedV2EventArgs = EParams<typeof PositionOpenedV2>

/** PositionUnwound(uint256,uint256,uint256,uint8,uint256,uint256,uint256,int256,uint256,uint256) */
export const PositionUnwound = event('0x8e75a224410b0b5b54b88738c69eb996a4225e1720432903a1b03693c3fcb6f8', {
    perpId: uint256,
    accountId: uint256,
    markPricePNS: uint256,
    positionType: uint8,
    pricePNS: uint256,
    lotLNS: uint256,
    depositCNS: uint256,
    positionFmvCNS: int256,
    paymentCNS: uint256,
    balanceCNS: uint256,
})
export type PositionUnwoundEventArgs = EParams<typeof PositionUnwound>

/** PositionUnwoundV2(uint256,uint256,uint256,uint8,uint256,uint256,uint256,int256,uint256,uint256,uint256) */
export const PositionUnwoundV2 = event('0x04213fea4abae4cce19e63741cd5968e220f30dd7f5ffe9fc7b0913ed3994d0f', {
    perpId: uint256,
    accountId: uint256,
    markPricePNS: uint256,
    positionType: uint8,
    pricePNS: uint256,
    lotLNS: uint256,
    depositCNS: uint256,
    positionFmvCNS: int256,
    paymentCNS: uint256,
    balanceCNS: uint256,
    priceResiduePNSQ16: uint256,
})
export type PositionUnwoundV2EventArgs = EParams<typeof PositionUnwoundV2>

/** PositionUnwoundWithoutPayment(uint256,uint256,uint256,uint8,uint256,uint256,uint256,int256,uint256) */
export const PositionUnwoundWithoutPayment = event('0x2ce44e296cf9f36d06b56fb77dfebb744f984a66a7a32a9c1982adde5719a108', {
    perpId: uint256,
    accountId: uint256,
    markPricePNS: uint256,
    positionType: uint8,
    pricePNS: uint256,
    lotLNS: uint256,
    depositCNS: uint256,
    positionFmvCNS: int256,
    amountOwedCNS: uint256,
})
export type PositionUnwoundWithoutPaymentEventArgs = EParams<typeof PositionUnwoundWithoutPayment>

/** PositionUnwoundWithoutPaymentV2(uint256,uint256,uint256,uint8,uint256,uint256,uint256,int256,uint256,uint256) */
export const PositionUnwoundWithoutPaymentV2 = event('0x4fa37f0ea2da4229663982f49120b61018ec1a6d0d2eea523dad9719a7dfef59', {
    perpId: uint256,
    accountId: uint256,
    markPricePNS: uint256,
    positionType: uint8,
    pricePNS: uint256,
    lotLNS: uint256,
    depositCNS: uint256,
    positionFmvCNS: int256,
    amountOwedCNS: uint256,
    priceResiduePNSQ16: uint256,
})
export type PositionUnwoundWithoutPaymentV2EventArgs = EParams<typeof PositionUnwoundWithoutPaymentV2>

/** PostOrderUnderMinimum(uint256,uint256) */
export const PostOrderUnderMinimum = event('0x587d2a97a31a5894b097ff75ad27cad3e726d27474d08c959bcb5e51c5244d0a', {
    orderAmountCNS: uint256,
    minAmountCNS: uint256,
})
export type PostOrderUnderMinimumEventArgs = EParams<typeof PostOrderUnderMinimum>

/** PriceAdministratorUpdated(address,bool) */
export const PriceAdministratorUpdated = event('0x6259c67b83c17d274bef178edcf79755337c12fdc6de65b955b5ab3f95e82e05', {
    priceAdministrator: address,
    added: bool,
})
export type PriceAdministratorUpdatedEventArgs = EParams<typeof PriceAdministratorUpdated>

/** PriceMaxAgeUpdated(uint256,uint256) */
export const PriceMaxAgeUpdated = event('0xd947284a0ec09f0204c4d87a28d7f12ae5979a8c58b1456b5aa2c5066f973295', {
    perpId: uint256,
    maxAgeSec: uint256,
})
export type PriceMaxAgeUpdatedEventArgs = EParams<typeof PriceMaxAgeUpdated>

/** PriceOutOfRange(uint256,uint256) */
export const PriceOutOfRange = event('0x9c6cd57b23ccacf841857c1eb7892bef39f27d0c1197bb0bf7646c90dc7fb870', {
    minPricePNS: uint256,
    maxPricePNS: uint256,
})
export type PriceOutOfRangeEventArgs = EParams<typeof PriceOutOfRange>

/** PriceSetDuringTriggerExec(uint256) */
export const PriceSetDuringTriggerExec = event('0x2b022c762977afd239365173c87fc0b706c64f8a7b328ca79b3465468eba835a', {
    triggerPricePNS: uint256,
})
export type PriceSetDuringTriggerExecEventArgs = EParams<typeof PriceSetDuringTriggerExec>

/** PriceTolUpdated(uint256,uint256) */
export const PriceTolUpdated = event('0x29246c8aee392e4f61a964c88192adac4afc12ed286fcbd7698783763467475f', {
    perpId: uint256,
    tolPer100k: uint256,
})
export type PriceTolUpdatedEventArgs = EParams<typeof PriceTolUpdated>

/** ProtocolBalanceDeposit(uint256) */
export const ProtocolBalanceDeposit = event('0x06d9a2e5d1f47e8b66c517104114f36514593b09c9b90cb622a6883e595d4bcd', {
    amountCNS: uint256,
})
export type ProtocolBalanceDepositEventArgs = EParams<typeof ProtocolBalanceDeposit>

/** ProtocolBalanceWithdraw(uint256) */
export const ProtocolBalanceWithdraw = event('0xfbebce9e66eea6596d62b805af61b4b1ea406128e73ffb928faa091b17d524f9', {
    amountCNS: uint256,
})
export type ProtocolBalanceWithdrawEventArgs = EParams<typeof ProtocolBalanceWithdraw>

/** RecycleBalanceInsufficientSevere(uint256,uint256,uint256,uint256,uint256) */
export const RecycleBalanceInsufficientSevere = event('0xf662aa6b6412ffe2a4e433dace098e96260a08fdaefdb023773e41f999b7c4ec', {
    accountId: uint256,
    perpId: uint256,
    orderId: uint256,
    recycleFeeCNS: uint256,
    recycleBalanceCNS: uint256,
})
export type RecycleBalanceInsufficientSevereEventArgs = EParams<typeof RecycleBalanceInsufficientSevere>

/** RecycleFeeToAccount(uint256,uint256,uint256,uint256,uint256) */
export const RecycleFeeToAccount = event('0x00106621f9f74b437219c51c8fded1d9faa8056f77fd0f3631d2ab8967a4d75d', {
    accountId: uint256,
    perpId: uint256,
    orderId: uint256,
    recycleFeeCNS: uint256,
    recycleBalanceCNS: uint256,
})
export type RecycleFeeToAccountEventArgs = EParams<typeof RecycleFeeToAccount>

/** RecycleFeeToProtocol(uint256,uint256,uint256,uint256) */
export const RecycleFeeToProtocol = event('0x829714cd4c1b45d8cb7fc185e9a89690df638ae20633056021e186ef6ce2e0bf', {
    perpId: uint256,
    orderId: uint256,
    recycleFeeCNS: uint256,
    recycleBalanceCNS: uint256,
})
export type RecycleFeeToProtocolEventArgs = EParams<typeof RecycleFeeToProtocol>

/** RecycleFeeUpdated(uint256) */
export const RecycleFeeUpdated = event('0x4151e59ddd8ffe35ce0b539f837d353ed0ff884e058b715910c7f4688a5da736', {
    recycleFeeCNS: uint256,
})
export type RecycleFeeUpdatedEventArgs = EParams<typeof RecycleFeeUpdated>

/** ReportAgeExceedsLastUpdate(uint256,uint256,uint256) */
export const ReportAgeExceedsLastUpdate = event('0xac23cd4bf85c84f3aa74c4752cbc1abc6ca3871a6e6b676f56bd64f992b700ae', {
    perpId: uint256,
    lastUpdateTimestamp: uint256,
    reportValidFromTimestamp: uint256,
})
export type ReportAgeExceedsLastUpdateEventArgs = EParams<typeof ReportAgeExceedsLastUpdate>

/** ReportExpiresTooSoon(uint256,uint256,uint256) */
export const ReportExpiresTooSoon = event('0x7f93aebf261535cb0331009511ba8896f348b68b1e0d448196c002a6bfcbdb7a', {
    perpId: uint256,
    expiresAt: uint256,
    minRequired: uint256,
})
export type ReportExpiresTooSoonEventArgs = EParams<typeof ReportExpiresTooSoon>

/** ReportFromFuture(uint256,uint256,uint256) */
export const ReportFromFuture = event('0x560f753ea20ff5d3b404893dc8502570dec81bbc02626784a8f3d635f9c21b29', {
    perpId: uint256,
    reportTimestamp: uint256,
    blockTimestamp: uint256,
})
export type ReportFromFutureEventArgs = EParams<typeof ReportFromFuture>

/** ReportPriceIsNegative(uint256,int256) */
export const ReportPriceIsNegative = event('0x4d8c851d919cf102ec02f76a35ca2f0b9e8ca3e9cd36ecc7128c03c7048e247a', {
    perpId: uint256,
    reportPrice: int256,
})
export type ReportPriceIsNegativeEventArgs = EParams<typeof ReportPriceIsNegative>

/** ResidueBalanceInsufficient(uint256,uint256,uint256) */
export const ResidueBalanceInsufficient = event('0x19a55a94f55603626b8e33b7a9d56532132220840b0a2b1d2c7c42e0dbfd5ce2', {
    perpId: uint256,
    requestedAmountCNS: uint256,
    positionBalanceCNS: uint256,
})
export type ResidueBalanceInsufficientEventArgs = EParams<typeof ResidueBalanceInsufficient>

/** ResidueTransferred(uint256,uint256,uint256) */
export const ResidueTransferred = event('0x5ea05cf9dabb3f18355e9f9abd6e540958c25d71644ade08c1c957e06e96e989', {
    perpId: uint256,
    residueAmountCNS: uint256,
    positionBalanceCNS: uint256,
})
export type ResidueTransferredEventArgs = EParams<typeof ResidueTransferred>

/** TakerFeeUpdated(uint256,uint256) */
export const TakerFeeUpdated = event('0x8e37539629486a88c6a6083eb90030fb61cb856d56d96f53a326fda0d399ef32', {
    perpId: uint256,
    takerFeePer100K: uint256,
})
export type TakerFeeUpdatedEventArgs = EParams<typeof TakerFeeUpdated>

/** TakerOrderFilled(uint256,uint256,uint256,uint256,uint256,int256,uint256) */
export const TakerOrderFilled = event('0x5be6b2e974d9a72428e5cb9cf915a5f991d1c862db8cafc9a121bb99b091cb74', {
    entryPricePNS: uint256,
    collatPricePNS: uint256,
    pnlPricePNS: uint256,
    lotLNS: uint256,
    feeCNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
})
export type TakerOrderFilledEventArgs = EParams<typeof TakerOrderFilled>

/** TakerOrderFilledV2(uint256,uint256,uint256,uint256,uint256,int256,uint256,uint256,uint256) */
export const TakerOrderFilledV2 = event('0x9d9bc0117914a61672fc4d289495e1031d64c5f8d4a714db38b52c85856d4999', {
    entryPricePNS: uint256,
    collatPricePNS: uint256,
    pnlPricePNS: uint256,
    lotLNS: uint256,
    feeCNS: uint256,
    amountCNS: int256,
    balanceCNS: uint256,
    builderId: uint256,
    builderFeeCNS: uint256,
})
export type TakerOrderFilledV2EventArgs = EParams<typeof TakerOrderFilledV2>

/** ToleranceAdministratorUpdated(address,bool) */
export const ToleranceAdministratorUpdated = event('0xe38e0dbe12c2dcb6ba8e96202e2cdd922095935e5ca1105ddf9e86c7f79df766', {
    toleranceAdministrator: address,
    added: bool,
})
export type ToleranceAdministratorUpdatedEventArgs = EParams<typeof ToleranceAdministratorUpdated>

/** TransferAccountToProtocol(uint256,uint256,uint256) */
export const TransferAccountToProtocol = event('0x2687926b167b6633deaaa80c3d106be87c0530fbc9ecba972ef8da4a3f2c489b', {
    accountId: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
})
export type TransferAccountToProtocolEventArgs = EParams<typeof TransferAccountToProtocol>

/** TransferPerpInsToProtocol(uint256,uint256) */
export const TransferPerpInsToProtocol = event('0x6cbcbbf194e245478b88cdee7b07dd6402cf492bcef0df03eae198637a072474', {
    perpId: uint256,
    amountCNS: uint256,
})
export type TransferPerpInsToProtocolEventArgs = EParams<typeof TransferPerpInsToProtocol>

/** TransferPerpPosToProtocol(uint256,uint256) */
export const TransferPerpPosToProtocol = event('0x9adf439943034ba500551cd8e7417ea8cafa00933026f4e8e3612c01524d6377', {
    perpId: uint256,
    amountCNS: uint256,
})
export type TransferPerpPosToProtocolEventArgs = EParams<typeof TransferPerpPosToProtocol>

/** TransferProtocolToAccount(uint256,uint256,uint256) */
export const TransferProtocolToAccount = event('0x85b48f5618e9d5b21320fb47ad01cfbf4f739a3e7f7950a445c97099d578911e', {
    accountId: uint256,
    amountCNS: uint256,
    balanceCNS: uint256,
})
export type TransferProtocolToAccountEventArgs = EParams<typeof TransferProtocolToAccount>

/** TransferProtocolToPerp(uint256,uint256,bool) */
export const TransferProtocolToPerp = event('0xe3bcf60a5994e7328c2ddfbbf2c18d6e57c1cc69502d1ee3900c1e1f08ca555d', {
    perpId: uint256,
    amountCNS: uint256,
    toInsuranceFund: bool,
})
export type TransferProtocolToPerpEventArgs = EParams<typeof TransferProtocolToPerp>

/** TransferProtocolToRecycleBal(uint256) */
export const TransferProtocolToRecycleBal = event('0x3926c691232881614240a3ec84f5910abdac662ecb616cf8ab9b9fe44d932bc8', {
    amountCNS: uint256,
})
export type TransferProtocolToRecycleBalEventArgs = EParams<typeof TransferProtocolToRecycleBal>

/** TriggerDescIdTooLow(uint256) */
export const TriggerDescIdTooLow = event('0x47313d3b2b870c5a3200f25c5f8d5ce9ea5d073955f16e6f70104ddca4be5fdc', {
    lastTriggerDescId: uint256,
})
export type TriggerDescIdTooLowEventArgs = EParams<typeof TriggerDescIdTooLow>

/** TriggerOrderExecution() */
export const TriggerOrderExecution = event('0x4b33653917eefdb992cac4fb999fcecfc80848487b46a9f1fbe97ef541aafa19', {})
export type TriggerOrderExecutionEventArgs = EParams<typeof TriggerOrderExecution>

/** TriggerOrderRequest(uint256,uint8,uint256,uint256) */
export const TriggerOrderRequest = event('0xd3b7d0aa2cb3540e154ebb47122cf86e0db24117323b827d28da43422fcd57d8', {
    triggerPricePNS: uint256,
    triggerPriceCondition: uint8,
    triggerRequestId: uint256,
    triggerPositionId: uint256,
})
export type TriggerOrderRequestEventArgs = EParams<typeof TriggerOrderRequest>

/** UnableToCancelOrder(uint256,uint256) */
export const UnableToCancelOrder = event('0xa2f88eaf96334c482f1071c105643f009253e044dc7767b94cd01f787c7d92ad', {
    perpId: uint256,
    orderId: uint256,
})
export type UnableToCancelOrderEventArgs = EParams<typeof UnableToCancelOrder>

/** UnityDescentThreshUpdated(uint256,uint256) */
export const UnityDescentThreshUpdated = event('0xf4b59dd9ee04b23a163fa42f622d424f19a1cc0f76d4455f900106cef0e3c512', {
    perpId: uint256,
    threshHdths: uint256,
})
export type UnityDescentThreshUpdatedEventArgs = EParams<typeof UnityDescentThreshUpdated>

/** UnspecifiedCollateral() */
export const UnspecifiedCollateral = event('0x1fccd51f56ecc3a71d5e32721dbf2bb0690bf050c6147a84fd5f83717d8c5d22', {})
export type UnspecifiedCollateralEventArgs = EParams<typeof UnspecifiedCollateral>

/** UnwindCompleted(uint256,uint256,uint256,uint256) */
export const UnwindCompleted = event('0xa9b78fd50db3a3e2b070cb8d415b5a3cd12f80614e74626415f2bcf20ae81d0c', {
    perpId: uint256,
    positionsUnwound: uint256,
    perpPositionBalanceCNS: uint256,
    insuranceBalanceCNS: uint256,
})
export type UnwindCompletedEventArgs = EParams<typeof UnwindCompleted>

/** UnwindContractTrigger(uint256) */
export const UnwindContractTrigger = event('0x5fa123d2cd3b174872bde6224d3ecc37811a5b365b5c481672f7ff0cb5bfd6c4', {
    perpId: uint256,
})
export type UnwindContractTriggerEventArgs = EParams<typeof UnwindContractTrigger>

/** UnwindInitializationCleared(uint256) */
export const UnwindInitializationCleared = event('0xd92eee87539b24ad02a6f03980106354cd078a3eb9c2c4257685215063c61ecd', {
    perpId: uint256,
})
export type UnwindInitializationClearedEventArgs = EParams<typeof UnwindInitializationCleared>

/** UnwindInitialized(uint256,uint256) */
export const UnwindInitialized = event('0x7101921841f3f86b1db94836f0b095d276833a7b6669c5d7628161978ae7e686', {
    perpId: uint256,
    sumPositiveFmvCNS: uint256,
})
export type UnwindInitializedEventArgs = EParams<typeof UnwindInitialized>

/** UnwindInsufficientBalance(uint256,uint256,uint256,uint256) */
export const UnwindInsufficientBalance = event('0x8c6452308f4aa5da3dd7582bf4f08c41c0bd9378806d96ce939fbddad72bf926', {
    perpId: uint256,
    accountId: uint256,
    perpPositionBalanceCNS: uint256,
    paymentCNS: uint256,
})
export type UnwindInsufficientBalanceEventArgs = EParams<typeof UnwindInsufficientBalance>

/** UnwindIterationCompleted(uint256,uint256,uint256,uint256) */
export const UnwindIterationCompleted = event('0x2a562f7b66b9d232c3f7a19384fbcff970c9fec0f42ac7ef9ea592fbcb848d20', {
    perpId: uint256,
    positionsUnwound: uint256,
    perpPositionBalanceCNS: uint256,
    insuranceBalanceCNS: uint256,
})
export type UnwindIterationCompletedEventArgs = EParams<typeof UnwindIterationCompleted>

/** UnwindPreparationCleared(uint256) */
export const UnwindPreparationCleared = event('0xc5ed7f880900879a894e28cc520c997b23650b24b94faf0b7a4e9621b09dec8b', {
    perpId: uint256,
})
export type UnwindPreparationClearedEventArgs = EParams<typeof UnwindPreparationCleared>

/** UnwindPrepared(uint256) */
export const UnwindPrepared = event('0x398693be005c0e64e1ef16ed7453155535d078a14ebb77360c1409b8e6f63c20', {
    perpId: uint256,
})
export type UnwindPreparedEventArgs = EParams<typeof UnwindPrepared>

/** UnwindProcessInProgress(uint256) */
export const UnwindProcessInProgress = event('0x3892657f1733e6fad09eddb45222f85d706fcdf18040658aae5eb4bd9ba497e6', {
    perpId: uint256,
})
export type UnwindProcessInProgressEventArgs = EParams<typeof UnwindProcessInProgress>

/** UpdateOracleFailed(uint256) */
export const UpdateOracleFailed = event('0xa8c2945f7db53a36d192551c9b4c3ea4cbc53140f60d0dc8b1a8b58499958cdf', {
    perpId: uint256,
})
export type UpdateOracleFailedEventArgs = EParams<typeof UpdateOracleFailed>

/** Upgraded(address) */
export const Upgraded = event('0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b', {
    implementation: indexed(address),
})
export type UpgradedEventArgs = EParams<typeof Upgraded>

/** ValueExceedsMaximum(uint256,uint256) */
export const ValueExceedsMaximum = event('0x95d41f3f44becfa47a91cf04138709af8e760c9060dcf6091505be37dce14188', {
    value: uint256,
    maximum: uint256,
})
export type ValueExceedsMaximumEventArgs = EParams<typeof ValueExceedsMaximum>

/** WRLSMinWithdrawLimitUpdated(uint256) */
export const WRLSMinWithdrawLimitUpdated = event('0x2407f52a609c844e44dbad3e5a8ec9347e6aa702684e124256f81ef7504b9d1b', {
    limitCNS: uint256,
})
export type WRLSMinWithdrawLimitUpdatedEventArgs = EParams<typeof WRLSMinWithdrawLimitUpdated>

/** WRLSThousandthsTvlUpdated(uint256) */
export const WRLSThousandthsTvlUpdated = event('0xc6edc4969138bba547ff56e984b415e7a1ec1181d6199d6946c48e3a85890636', {
    thousandthsTvl: uint256,
})
export type WRLSThousandthsTvlUpdatedEventArgs = EParams<typeof WRLSThousandthsTvlUpdated>

/** WhitelistAddress(address,bool) */
export const WhitelistAddress = event('0x33e0bf3ce98fac4118d5a0a8fe49e83b6acdfdef32871c9eca20e1528d7701ba', {
    addr: indexed(address),
    whitelisted: bool,
})
export type WhitelistAddressEventArgs = EParams<typeof WhitelistAddress>

/** WhitelistingEnabledChanged(bool) */
export const WhitelistingEnabledChanged = event('0x4837c28a17fa53b7af0fe87d3e7cf2a681119d768391e182ed4dfd33497e288f', {
    enabled: bool,
})
export type WhitelistingEnabledChangedEventArgs = EParams<typeof WhitelistingEnabledChanged>

/** WithdrawRateLimitBypassSet(address,bool) */
export const WithdrawRateLimitBypassSet = event('0x8b91d2cd88f6e870c2beaa65e6299f6dee33511ff403ab0ffb32f926e3a9a283', {
    addr: indexed(address),
    enabled: bool,
})
export type WithdrawRateLimitBypassSetEventArgs = EParams<typeof WithdrawRateLimitBypassSet>

/** WithdrawRateLimitForceReset(uint256,uint256,uint256) */
export const WithdrawRateLimitForceReset = event('0x4a1c1830c45941cc05cf110c5d7424a3e493f0e42be2522c05ab26c0221062cf', {
    newExpiryBlock: uint256,
    newLimitCNS: uint256,
    perBlockCNS: uint256,
})
export type WithdrawRateLimitForceResetEventArgs = EParams<typeof WithdrawRateLimitForceReset>

/** WithdrawRateLimitReset(uint256,uint256,uint256) */
export const WithdrawRateLimitReset = event('0xbed1e76d359c53e2dbafd4561fa97daac567d51974f6317c2f583ef17cddaa9d', {
    newExpiryBlock: uint256,
    newLimitCNS: uint256,
    perBlockCNS: uint256,
})
export type WithdrawRateLimitResetEventArgs = EParams<typeof WithdrawRateLimitReset>

/** WrongAccountForOrder(uint256,uint256,uint256) */
export const WrongAccountForOrder = event('0x0ff65eacbb5b956c92957d3a4c76260d051566a34945c41b4e621bc895918ee7', {
    perpId: uint256,
    orderId: uint256,
    accountId: uint256,
})
export type WrongAccountForOrderEventArgs = EParams<typeof WrongAccountForOrder>
