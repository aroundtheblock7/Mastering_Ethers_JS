const { ethers } = require("ethers");
require('dotenv').config();

const INFURA_ID = process.env.PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const address = '0xe92d1a43df510f82c66382592a047d288f85226f'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()