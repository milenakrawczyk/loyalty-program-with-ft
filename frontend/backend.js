const { utils, keyStores, connect, Contract } = require("near-api-js");
const MAX_TGAS = '300000000000000';
const TOTAL_DEPOSIT = "100000000000000000000000";//10000000000000000000000000;

export class Backend {
  constructor({ contractId, walletToUse, networkId }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
    this.keyStore = new keyStores.BrowserLocalStorageKeyStore();
    this.networkId = networkId;
  }

  async createAndTransfer(publicKey, prefix) {
    // if (!(await this.getKeyPair())) {
    //   throw new Error("You need to pass a function call access key to the backend first.");
    // }

    const keyPair = await this.getKeyPair();
    const inMemoryKeyStore = new keyStores.InMemoryKeyStore()
    inMemoryKeyStore.setKey(this.networkId, this.getAccountName(), keyPair);

    const connectionConfig = {
      networkId: this.networkId,
      keyStore: inMemoryKeyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    
    this.nearConnection = await connect(connectionConfig);
    console.log(this.nearConnection.connection);

    
    const account = await this.nearConnection.account(this.getAccountName());
    console.log(account.accountId);

    const managerContract = new Contract(
      account, // the account object that is connecting
      this.contractId,
      {
        viewMethods: [], // view methods do not change state but usually return a value
        changeMethods: ["create_and_transfer"],
      }
    );

    const res = await managerContract.create_and_transfer(
      {
        prefix: prefix,
        public_key: publicKey,
      },
      MAX_TGAS, // attached GAS (optional)
      TOTAL_DEPOSIT // attached deposit in yoctoNEAR (optional)
    );

    console.log(res);


    // return await this.wallet.callMethod({
    //     contractId: this.contractId,
    //     method: 'create_and_transfer',
    //     args: {
    //       prefix: prefix,
    //       public_key: publicKey,
    //     },
    //     gas: MAX_TGAS,
    //     attachedDeposit: TOTAL_DEPOSIT,
    //   })
  }

  async setKeyPairForManager(keyPair) {
    await this.keyStore.setKey(this.networkId, this.getAccountName(), keyPair);
  }

  async getKeyPair() {
    return await this.keyStore.getKey(this.networkId, this.getAccountName());
  }

  getAccountName() {
    return this.contractId;
  }
}
