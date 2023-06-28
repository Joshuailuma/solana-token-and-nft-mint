import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';
import bs58 from 'bs58'
import fs from 'fs'
(async () => {
    // Step 1: Connect to cluster and generate two new Keypairs
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const secretkey = new Uint8Array(
        [USE YOUR WALLET SECRET Uint8Array KEY]
    )
    const toWalletKey = new Uint8Array(
        [USE YOUR WALLET SECRET Uint8Array KEY]
    )
    const fromWallet = Keypair.fromSecretKey(secretkey); // 3jsVLkff4j82B12nnAquyPm2TKQTJAFwJts7Z4AENoZB
    const toWallet = Keypair.fromSecretKey(toWalletKey) //6ybeD1dWXCmGU2FRCxB4Yrz5xfvLs4DNfkeXG3bDqhWG
    console.log(fromWallet.publicKey.toString())

    // To get a wallet secret key from its private key
    // const b = bs58.decode('PRIVATE_KEY')
    // const j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    // fs.writeFileSync('key.json', `[${j}]`);

    // The other way round
    //const bs58 = require('bs58');
    // let privkey = new Uint8Array(
    //     [base64 key]
    // ); // content of id.json here
    // console.log(bs58.encode(privkey));

    // Step 2: Airdrop SOL into your from wallet
    // const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
    // Wait for airdrop confirmation
    // await connection.confirmTransaction(fromAirdropSignature, { commitment: "confirmed" });


    // Step 3: Create new token mint and get the token account of the fromWallet address
    //If the token account does not exist, create it
    // It returns a mint account
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
    // It returns the public key of the token account
    // account to hold a balance of the new token
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet, // payer
        mint, // mint account
        fromWallet.publicKey //owner
    )
    console.log(`From token address/(account address) is ${fromTokenAccount.address}`)
    // Set the token name
    //  await mint.setTokenName(tokenName);

    //Step 4: Mint a new token to the from account
    let signature = await mintTo(
        connection,
        fromWallet, // Payer
        mint, // Mint account
        fromTokenAccount.address, // Token account we are minting to
        fromWallet.publicKey, //Account to give authority
        5000000000, // 5 Tokens
        []
    );
    console.log("================================")
    console.log('mint tx:', signature);
    console.log("================================")
    console.log("Mint address is", mint.toString()) // Unique token identifier


    //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet.publicKey);
    console.log("================================")
    console.log(`To token address/(account address) is ${toTokenAccount.address}`)

    //Step 6: Transfer the new token to the to-wallet's token account that was just created
    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        2000000000, // 2 tokens Equivalent to one token 1e9 decimal
        []
    );
    console.log("================================")
    console.log('transfer tx:', signature);


})();
