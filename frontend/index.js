// React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Backend } from './backend';
import { Customer } from './customer';

// NEAR
import { Factory } from './near-ft-factory';
import { Wallet } from './near-wallet';

const FACTORY_ADDRESS = process.env.CONTRACT_NAME;
const MERCHANT = "milam";
const MERCHANT_ADDRESS = MERCHANT + ".testnet"; // this is needed for user view
const NETWORK_ID = "testnet";
const MANAGER_CONTRACT = MERCHANT + "-manager." + FACTORY_ADDRESS;
const FT_CONTRACT = MERCHANT + "-ft." + FACTORY_ADDRESS;


// Factory: Address => FT Address

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ });

// Abstract the logic of interacting with the contract to simplify your flow
const factory = new Factory({ contractId: FACTORY_ADDRESS, walletToUse: wallet });

const backend = new Backend({ contractId: MANAGER_CONTRACT, walletToUse: wallet });
const customer = new Customer({ merchantId: MERCHANT_ADDRESS, ftContractId: FT_CONTRACT, networkId: NETWORK_ID, backend });


// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  const root = createRoot(document.getElementById('root'));
  root.render(
    <App isSignedIn={isSignedIn} factory={factory} wallet={wallet} customer={customer}
         MERCHANT_ADDRESS={MERCHANT_ADDRESS}
    />
  );
};
