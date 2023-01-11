<h1 align="center">
  <a href="https://github.com/near/boilerplate-template-rs">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/near/boilerplate-template-rs/main/docs/images/pagoda_logo_light.png">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/near/boilerplate-template-rs/main/docs/images/pagoda_logo_dark.png">
      <img alt="" src="https://raw.githubusercontent.com/near/boilerplate-template-rs/main/docs/images/pagoda_logo_dark.png">
    </picture>
  </a>
</h1>

---

# Loyalty Program with Fungible Tokens

## About

This project serves as an example of a loyalty program with fungible tokens.

### Prerequisites

Make sure you have a [current version of Node.js](https://nodejs.org/en/about/releases/) installed – we are targeting versions `16+`.

Read about other [prerequisites](https://docs.near.org/develop/prerequisites) in our docs.

### Installation


Install all dependencies:

    npm install


Build your contract:

    npm run build

Put the merchant name without the network suffix in the `.env.local file.` For example:

  MERCHANT_ID=merchant-name

Deploy your contract to TestNet with a temporary dev account:

    npm run deploy


Usage
=====

Test your contract:

    npm test

Start your frontend:

    npm start

Exploring The Code
==================

1. The smart-contract code lives in the `/contracts` folder.
2. The frontend code lives in the `/frontend` folder. `/frontend/index.html` is a great
   place to start exploring. Note that it loads in `/frontend/index.js`,
   this is your entrypoint to learn how the frontend connects to the NEAR blockchain.
3. There is a backend code in the `backend.js` file in the `frontend` directory. This code
   simulates a web2 backend.
4. Test your contract: `npm test`, this will run the tests in `integration-tests` directory.

## Security

Loyalty Program with Fungible Tokens Template follows good practices of security, but 100% security cannot be assured.
Loyalty Program with Fungible Tokens Template is provided **"as is"** without any **warranty**. Use at your own risk.