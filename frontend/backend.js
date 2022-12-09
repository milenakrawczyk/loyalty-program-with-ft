const { utils, keyStores } = require("near-api-js");
const MAX_TGAS = '300000000000000';

export class Backend {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createAndTransfer(publicKey) {
    return await this.wallet.callMethod({
        contractId: this.contractId,
        method: 'pay_for_coffee_with_card',
        args: {
          prefix: "user2",
          public_key: publicKey,
        },
        gas: MAX_TGAS,
      })
  }

  async createKeyPair() {

  }
}
