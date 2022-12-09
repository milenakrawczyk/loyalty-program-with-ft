const { utils, keyStores } = require("near-api-js");
const MAX_TGAS = '300000000000000';

export class Customer {
  constructor({ merchantId, ftContractId, networkId, backend }) {
    this.merchantId = merchantId;
    this.networkId = networkId;
    this.ftContractId = ftContractId;
    this.keyStore = new keyStores.BrowserLocalStorageKeyStore();
    this.backend = backend;
  }

  async payForCoffeeWithCC() {
    if (!(await this.getKeyPair())) {
        await this.createKeyPair();
    }

    const keyPair = await this.getKeyPair();

    return this.backend.createAndTransfer(keyPair.getPublicKey().toString());
  }

  async createKeyPair() {
    const keyPair = utils.key_pair.KeyPairEd25519.fromRandom();
    await this.keyStore.setKey(this.networkId, "customer-" + this.merchantId, keyPair);
  }

  async getKeyPair() {
    return await this.keyStore.getKey(this.networkId, "customer-" + this.merchantId);
  }

}