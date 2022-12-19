/* Interface to talk with the contract factory */
const MAX_TGAS = '300000000000000';
const DEPOSIT = '15000000000000000000000000';//'7770000000000000000000000';
const FT_CONTRACT_NAME = "ft";

export class Factory {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createFungibleToken(name, symbol, totalSupply) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_factory_subaccount_and_deploy',
      args: {
        token_name: name,
        token_symbol: symbol,
        token_total_supply: totalSupply,
      },
      deposit: DEPOSIT,
      gas: MAX_TGAS,
    });

    //TODO pass function call key to the backend
  }

  async checkProgramExists(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_has_program', args: { account_id } })
  }

  async getProgram(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'user_program', args: { account_id } })
  }

  async addFunctionCallKey() {
    // get account id to get the manager contract id 
    const keyPair = this.createKeyPair();
    const managerContractId = "";
    //this.wallet.account_id
    // adds function access key
    await this.wallet.account.addKey(
    // const account = await nearConnection.account("example-account.testnet");
    // await account.addKey(
      keyPair.getPublicKey().toString(), // public key for new account
      managerContractId, // contract this key is allowed to call (optional)
      "create_and_transfer", // methods this key is allowed to call (optional)
      "2500000000000" // allowance key can use to call methods (optional)
    );
  }

  createKeyPair() {
    return utils.key_pair.KeyPairEd25519.fromRandom();
  }
}
