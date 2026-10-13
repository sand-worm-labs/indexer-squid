import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";
import * as dotenv from "dotenv";
import path from "path";

// Settings come from .env (see .env.example): ENDPOINT, START_BLOCK, CHAIN_ID.
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Perpl Exchange proxy on Monad mainnet.
const EXCHANGE = "0x34B6552d57a35a1D042CcAe1951BD1C370112a6F";

const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "perpl-subquery",
  description: "Perpl Exchange indexer (Monad mainnet): orders, trades, positions, funding, collateral",
  runner: {
    node: { name: "@subql/node-ethereum", version: ">=3.0.0" },
    query: { name: "@subql/query", version: "*" },
  },
  schema: { file: "./schema.graphql" },
  network: {
    // Monad mainnet is chain 143 (the SubQuery quickstart uses testnet, 10143).
    chainId: process.env.CHAIN_ID ?? "143",
    // Must be an archive (non-pruned) endpoint. Indexing speed is set almost entirely by how fast this RPC answers:
    // several comma-separated endpoints are used in parallel.
    endpoint: (process.env.ENDPOINT ?? "https://rpc.monad.xyz").split(",").map((e) => e.trim()),
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: Number(process.env.START_BLOCK ?? 54773010),
      options: { abi: "Exchange", address: EXCHANGE },
      assets: new Map([["Exchange", { file: "./abis/Exchange.json" }]]),
      mapping: {
        file: "./dist/index.js",
        // One handler per event, matched by topic0. Same 49 events as the Subsquid indexer (indexers/perpl).
        handlers: [
          { kind: EthereumHandlerKind.Event, handler: "handleAccountCreated", filter: { topics: ["0x7325fb14450d3e5eb288c620b4ff1d6b43a41b33b4a4f143ae88cd4c12f99ea3"] } }, // AccountCreated
          { kind: EthereumHandlerKind.Event, handler: "handleAccountFreeze", filter: { topics: ["0x287a1a0be47186fe812cf10628edc8c56638095124099fea05c3e3f59e3a0dc6"] } }, // AccountFreeze
          { kind: EthereumHandlerKind.Event, handler: "handleCollateralDeposit", filter: { topics: ["0x84b5adc99a7d46a960b87da6e4882021bab65d63c6d02c9bcfc52f02e710b1e3"] } }, // CollateralDeposit
          { kind: EthereumHandlerKind.Event, handler: "handleCollateralWithdrawal", filter: { topics: ["0x8a087568cf2efa04e1e6c72c7f61b68a1ac013d6a33bd6e978e1ba2b4efc04d4"] } }, // CollateralWithdrawal
          { kind: EthereumHandlerKind.Event, handler: "handleContractAdded", filter: { topics: ["0xd78b2274f0f8c5fb36f3464d4fc273e80ba45dde960a535eeacf3c1ae42c4e3c"] } }, // ContractAdded
          { kind: EthereumHandlerKind.Event, handler: "handleContractAddedV2", filter: { topics: ["0x1becf712fcdd2a18b8733f07a4063553556025b59ddf9c25906f7ae87b1296a0"] } }, // ContractAddedV2
          { kind: EthereumHandlerKind.Event, handler: "handleContractPaused", filter: { topics: ["0x2bf3500d8e3b78624f68716bdcfccb30df6b6ef393561a3ffa32e8d357ac7e43"] } }, // ContractPaused
          { kind: EthereumHandlerKind.Event, handler: "handleContractRemoved", filter: { topics: ["0xc1c33d1bd4abb6d1a8ed08f6a49cdf51c1db8b81ce6810a713fcd0291cc63f97"] } }, // ContractRemoved
          { kind: EthereumHandlerKind.Event, handler: "handleMarkUpdated", filter: { topics: ["0x65ec400f2e8b22c7064f99991d01828c6a55acaa066b3fdba3bf5a491b1a6a4c"] } }, // MarkUpdated
          { kind: EthereumHandlerKind.Event, handler: "handleTakerFeeUpdated", filter: { topics: ["0x8e37539629486a88c6a6083eb90030fb61cb856d56d96f53a326fda0d399ef32"] } }, // TakerFeeUpdated
          { kind: EthereumHandlerKind.Event, handler: "handleMakerFeeUpdated", filter: { topics: ["0x6bf5f38f4e94f47ae7a4d6e56dbf388c856f890b5f0f2808b66914710b0266ca"] } }, // MakerFeeUpdated
          { kind: EthereumHandlerKind.Event, handler: "handlePerpFeeSchedIdSet", filter: { topics: ["0xb327a32ce0d0806734bf7d447cd736b3286ff1c9c44befb9e81d817a2a41bf4c"] } }, // PerpFeeSchedIdSet
          { kind: EthereumHandlerKind.Event, handler: "handleInitialMarginFractionUpdated", filter: { topics: ["0x9c6091bfb36035e2973fb3ad5c07d8c5d74d0981770feea276a41c4221246f0e"] } }, // InitialMarginFractionUpdated
          { kind: EthereumHandlerKind.Event, handler: "handleMaintenanceMarginFractionUpdated", filter: { topics: ["0x258cfea0edc89c1ba4ce7d75bd475712ab2a06ce19794e2193cbd64f182a3f78"] } }, // MaintenanceMarginFractionUpdated
          { kind: EthereumHandlerKind.Event, handler: "handleMaxOpenInterestUpdated", filter: { topics: ["0x672c0a156ee23d5a79ee89b233d6d30458115eabf152fb294cb8a894eadeeb11"] } }, // MaxOpenInterestUpdated
          { kind: EthereumHandlerKind.Event, handler: "handleLinkPriceUpdated", filter: { topics: ["0x5e3f1c81da4dcfcb835cba6457aa389114f5d309917179746b46ac03953f56b2"] } }, // LinkPriceUpdated
          { kind: EthereumHandlerKind.Event, handler: "handleFundingEventCompleted", filter: { topics: ["0x9c0e05c2bbc786a75afe5fed63ff9274f7c690af8ea4e843e07f2a525295c104"] } }, // FundingEventCompleted
          { kind: EthereumHandlerKind.Event, handler: "handleOrderRequest", filter: { topics: ["0x02d2bf39d2355aaa5486487e934403fd3ba3f88c73ab71938cee11931fddeb7b"] } }, // OrderRequest
          { kind: EthereumHandlerKind.Event, handler: "handleOrderRequestV2", filter: { topics: ["0xb585865280072cb0f2cb5cf0f49f0e0224c09fa012c92c5f33eabf10287b8beb"] } }, // OrderRequestV2
          { kind: EthereumHandlerKind.Event, handler: "handleOrderBatchCompleted", filter: { topics: ["0xc2813e86d911b51775079b03b9fcab443ec450bc1634cf75dd578874a0af7add"] } }, // OrderBatchCompleted
          { kind: EthereumHandlerKind.Event, handler: "handleOrderPlaced", filter: { topics: ["0x5d5d31f82cb7d7cf1b09787031cd282c6accc62145d50de980d298bb340a9aba"] } }, // OrderPlaced
          { kind: EthereumHandlerKind.Event, handler: "handleOrderChanged", filter: { topics: ["0xbf5d27a683d1ce858f6095fde2cc9837ba595c533e97576c5ff3de4376ccbf3c"] } }, // OrderChanged
          { kind: EthereumHandlerKind.Event, handler: "handleOrderCancelled", filter: { topics: ["0xe9805f82cb3729e97b234bb6bb4f90ea971e2c274201ff71818ebde153e1b0a6"] } }, // OrderCancelled
          { kind: EthereumHandlerKind.Event, handler: "handleOrderCancelledByAdmin", filter: { topics: ["0x3669d8cc87cc659246c535cf34b73f019e2da2a48e04d14093701e877fb6eac6"] } }, // OrderCancelledByAdmin
          { kind: EthereumHandlerKind.Event, handler: "handleOrderCancelledByLiquidator", filter: { topics: ["0xb52688454dfd5028443d05c10bc78a9ca263b7c7645d2e8bfef428d0e8b3b047"] } }, // OrderCancelledByLiquidator
          { kind: EthereumHandlerKind.Event, handler: "handleClearingExpiredOrder", filter: { topics: ["0xb95e250f9f017dcb1bb1806916771df0c04a269e5f46d5db7519382a0f7bb477"] } }, // ClearingExpiredOrder
          { kind: EthereumHandlerKind.Event, handler: "handleClearingFrozenAccountOrder", filter: { topics: ["0x86ad99b48b2565c9720e33335db58e8c7468d6af03a5e6238b20d4a562f5b8b4"] } }, // ClearingFrozenAccountOrder
          { kind: EthereumHandlerKind.Event, handler: "handleClearingInvalidCloseOrder", filter: { topics: ["0xae6369c6e529c86dd87431d10e0db70657c834daa75356e1efd7c0ac79f934b7"] } }, // ClearingInvalidCloseOrder
          { kind: EthereumHandlerKind.Event, handler: "handleClearingSelfMatchingOrder", filter: { topics: ["0x52d5291dc7b477ebda965d0693c67e6ccec5b3667b530305685465384756d3fd"] } }, // ClearingSelfMatchingOrder
          { kind: EthereumHandlerKind.Event, handler: "handleMakerOrderFilled", filter: { topics: ["0xf5f5aef063f495816b6982c44c70c97c8fbec2fa24b73487e6542ce021431214"] } }, // MakerOrderFilled
          { kind: EthereumHandlerKind.Event, handler: "handleMakerOrderFilledV2", filter: { topics: ["0xa59d6df87b5cb9e8cca8c09e8f1e240b7a1d4a2ee8f6c636c12ce22b43b82d70"] } }, // MakerOrderFilledV2
          { kind: EthereumHandlerKind.Event, handler: "handleTakerOrderFilled", filter: { topics: ["0x5be6b2e974d9a72428e5cb9cf915a5f991d1c862db8cafc9a121bb99b091cb74"] } }, // TakerOrderFilled
          { kind: EthereumHandlerKind.Event, handler: "handleTakerOrderFilledV2", filter: { topics: ["0x9d9bc0117914a61672fc4d289495e1031d64c5f8d4a714db38b52c85856d4999"] } }, // TakerOrderFilledV2
          { kind: EthereumHandlerKind.Event, handler: "handlePositionOpened", filter: { topics: ["0xc0150ebb43a9c2478aa9c69d27078da071ceafb70e2d822d7d39a533e0418728"] } }, // PositionOpened
          { kind: EthereumHandlerKind.Event, handler: "handlePositionOpenedV2", filter: { topics: ["0x04cc3d2fc73a9dca30eba1d05eca80b1b1216350243580027046f434fed4db18"] } }, // PositionOpenedV2
          { kind: EthereumHandlerKind.Event, handler: "handlePositionIncreased", filter: { topics: ["0x2a077a58d72570ce2b985a210c9ad672373eb9bcc337d1dc62b8b75dd644cf27"] } }, // PositionIncreased
          { kind: EthereumHandlerKind.Event, handler: "handlePositionIncreasedV2", filter: { topics: ["0x99a74f70c224396b9ba5fcd5a6e5f480db23e7a25a2b16a8c133ec2efb3e646c"] } }, // PositionIncreasedV2
          { kind: EthereumHandlerKind.Event, handler: "handlePositionDecreased", filter: { topics: ["0xcd4a9f7ae1cc250eaa0be6bdb30d07efaf0faafb4ff0e76d8fe09a8373e43f85"] } }, // PositionDecreased
          { kind: EthereumHandlerKind.Event, handler: "handlePositionClosed", filter: { topics: ["0x599b5f439ed4daf1f28ae8638e5439d3982e8001fb26dd8f70021b38672eb26f"] } }, // PositionClosed
          { kind: EthereumHandlerKind.Event, handler: "handlePositionInverted", filter: { topics: ["0x01a0596385c75b269e896ca6468a2be2edc8b2b5459f4e25ca0a75944390a10c"] } }, // PositionInverted
          { kind: EthereumHandlerKind.Event, handler: "handlePositionLiquidated", filter: { topics: ["0x6fc9c0ea1c0531654320ba06740c802447dbdef7c26cf749c4f12553cdd958a9"] } }, // PositionLiquidated
          { kind: EthereumHandlerKind.Event, handler: "handlePositionDeleveraged", filter: { topics: ["0x3b1e497992fc37fbf896b38202d19417ad54402fa8d8aed214d20f27c34bcabc"] } }, // PositionDeleveraged
          { kind: EthereumHandlerKind.Event, handler: "handlePositionDeleveragedV2", filter: { topics: ["0xc93231d3a87dd7f9a93be23749816504b65b558dee3bb33ca82eab4867669faf"] } }, // PositionDeleveragedV2
          { kind: EthereumHandlerKind.Event, handler: "handlePositionUnwound", filter: { topics: ["0x8e75a224410b0b5b54b88738c69eb996a4225e1720432903a1b03693c3fcb6f8"] } }, // PositionUnwound
          { kind: EthereumHandlerKind.Event, handler: "handlePositionUnwoundV2", filter: { topics: ["0x04213fea4abae4cce19e63741cd5968e220f30dd7f5ffe9fc7b0913ed3994d0f"] } }, // PositionUnwoundV2
          { kind: EthereumHandlerKind.Event, handler: "handlePositionUnwoundWithoutPayment", filter: { topics: ["0x2ce44e296cf9f36d06b56fb77dfebb744f984a66a7a32a9c1982adde5719a108"] } }, // PositionUnwoundWithoutPayment
          { kind: EthereumHandlerKind.Event, handler: "handlePositionUnwoundWithoutPaymentV2", filter: { topics: ["0x4fa37f0ea2da4229663982f49120b61018ec1a6d0d2eea523dad9719a7dfef59"] } }, // PositionUnwoundWithoutPaymentV2
          { kind: EthereumHandlerKind.Event, handler: "handleIncreasePositionCollateral", filter: { topics: ["0x577ed0a8f65f2feb5a407660b0a3009c2ee155a17d0e34947c58ecdd6c8b3771"] } }, // IncreasePositionCollateral
          { kind: EthereumHandlerKind.Event, handler: "handlePositionCollateralDecreased", filter: { topics: ["0xa97e56d50498d7b8acf31641413f46438d6d7d3f6e6acf04c6e7995cab8b66b2"] } }, // PositionCollateralDecreased
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
