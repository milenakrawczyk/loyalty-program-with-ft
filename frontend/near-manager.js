/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
const MAX_TGAS = '300000000000000';

export class Manager {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createAndTransfer() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'ft_metadata' })
  }
}
