// React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// NEAR
import { Factory } from './near-ft-factory';
import { Wallet } from './near-wallet';

const FACTORY_ADDRESS = "dev-1669817780312-38070777061313"
const MERCHANT_ADDRESS = "named-account.testnet" // change this

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ });

// Abstract the logic of interacting with the contract to simplify your flow
const factory = new Factory({ contractId: FACTORY_ADDRESS, walletToUse: wallet });

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  const root = createRoot(document.getElementById('root'));
  root.render(
    <App isSignedIn={isSignedIn} factory={factory} wallet={wallet}
         MERCHANT_ADDRESS={MERCHANT_ADDRESS}
    />
  );
};
