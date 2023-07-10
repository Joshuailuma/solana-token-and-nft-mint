# Minting tokens and NFTs on Solana
In this project, and spl token is created called "Josh Token", an NFT is created called "MKY NFT". Users can only pay for minting using the Josh Token
## Functions
- creates a new spl token called "Josh Token"
- mints the "Josh Token" to specified accounts
- creates an NFT "MKY NFT" using candy machine v2
- uses [candy machine ui](https://github.com/metaplex-foundation/candy-machine-ui) to provide a frontend where users can mint MKY NFT paying using Josh Token

## Getting started
### Creating the spl token
- run `npm install` to install the necessary dependencies
- run `npm install ts-node` to install typescript node
- have [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) installed
- run `node index.js` to create an spl token, mint 5 tokens to the `fromWallet` account and transfer 2 tokens to the `toWallet` account
- edit `package.json` and delete line 6 `type: module`.
- run `ts-node index2.js` to add metadata to the spl token, giving it a name and image.

### Creating the NFT
- the assets folder contains the assets to be used for the NFTs
- the config.json contains the setup, specifing the spl token address and account to store spl token spent by users in buying the NFT
- `solana keygen` to generate an account
- `solana airdrop 2` to fund the new account
- `solana validate` to validate data files
- `solana upload` to upload NFTs to arweave
- `solana deploy` to deploy the NFT
- `solana verify` to verify the deployed NFTs
- `cd candy-machine-ui` to enter the frontend folder
- `yarn` to install dependencies
- `yarn start` to start the app

For more information visit [Quicknode tutorial](https://www.quicknode.com/guides/solana-development/nfts/how-to-deploy-an-nft-collection-on-solana-using-sugar-candy-machine)

## Author
Joshua Iluma
