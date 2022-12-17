const { utils, keyStores, near, connect } = require("near-api-js");
const MAX_TGAS = '300000000000000';
const TOTAL_DEPOSIT = 10000000000000000000000000;

export class Backend {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createAndTransfer(publicKey) {
    //
    return await this.wallet.callMethod({
        contractId: this.contractId,
        method: 'create_and_transfer',
        args: {
          prefix: "user2",
          public_key: publicKey,
        },
        gas: MAX_TGAS,
        attachedDeposit: TOTAL_DEPOSIT,
      })
  }

  setFunctionCallKeyAndCreateKeyStore(keyPair) {
    //TODO
  }

  async createNearConnection() {
    const connectionConfig = {
      networkId: "testnet",
      keyStore: myKeyStore, // first create a key store 
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    this.nearConnection = await connect(connectionConfig);
  }
}
