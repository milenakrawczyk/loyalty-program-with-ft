const { utils, keyStores, connect, Contract } = require("near-api-js");
const MAX_TGAS = '300000000000000';
const TOKENS_FOR_COFFEE = "30";
const FT_TRANSFER_MIN_DEPOSIT = "1";

export class Customer {
  constructor({ managerContractId, merchantId, ftContractId, networkId, backend }) {
    this.managerContractId = managerContractId;
    this.merchantId = merchantId;
    this.networkId = networkId;
    this.ftContractId = ftContractId;
    this.keyStore = new keyStores.BrowserLocalStorageKeyStore();
    this.backend = backend;
    this.prefix = "customer"; //TODO
  }

  async purchaseCoffeeWithCC() {
    if (!(await this.getKeyPair())) {
        await this.createKeyPair();
    }

    const keyPair = await this.getKeyPair();

    return this.backend.createAndTransfer(keyPair.getPublicKey().toString(), this.prefix);
  }

  async purchaseCoffeeWithTokens() {
    if (!(await this.getKeyPair())) {
        throw Error("You need to buy coffee with CC first");
    }

    const keyPair = await this.getKeyPair();
    const inMemoryKeyStore = new keyStores.InMemoryKeyStore()
    inMemoryKeyStore.setKey(this.networkId, this.getAccountName(), keyPair);

    
    const connectionConfig = {
      networkId: "testnet",
      keyStore: inMemoryKeyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    this.nearConnection = await connect(connectionConfig);
    
    const account = await this.nearConnection.account(this.getAccountName());
    const ftContract = new Contract(
      account, // the account object that is connecting
      this.ftContractId,
      {
        viewMethods: ["ft_balance_of"], // view methods do not change state but usually return a value
        changeMethods: ["ft_transfer"], // change methods modify state
      }
    );
    
    return await ftContract.ft_transfer(
      {
        receiver_id: this.managerContractId,
        amount: TOKENS_FOR_COFFEE,
      },
      MAX_TGAS,
      FT_TRANSFER_MIN_DEPOSIT,
    );
  }

  async createKeyPair() {
    const keyPair = utils.key_pair.KeyPairEd25519.fromRandom();
    await this.keyStore.setKey(this.networkId, this.getAccountName(), keyPair);
  }

  async getKeyPair() {
    return await this.keyStore.getKey(this.networkId, this.getAccountName());
  }

  getAccountName() {
    return `${this.prefix}.${this.managerContractId}`
  }

}