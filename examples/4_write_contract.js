const { ethers } = require("ethers");
require('dotenv').config();

const INFURA_ID = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

const account1 = '0xFF985509Aa523FE9cd3d0A6891fCB9f2A4134feE'
const account2 = '0x3404446637B0Ec81eb53E9F1B48c907de0860287'

const privateKey2 = process.env.PRIVATE_KEY2
const privateKey1 = process.env.PRIVATE_KEY1

const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709' //LINK TOKEN
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account2)

    //Lets log the balance before the tx
    console.log(`\nReading from ${address}\n`)
    console.log(`Initial Balance of sender: ${balance}\n`)

    //we can't just call transfer on the contract. First we need to connect our wallet...
    const contractWithWallet = contract.connect(wallet)

    //now we can call transfer on it with the wallet
    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait() // we want to wait for it to be mined.

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReceiver = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${ethers.utils.formatEther(balanceOfSender)}`)
    console.log(`Balance of receiver: ${ethers.utils.formatEther(balanceOfReceiver)}\n`)
}

main()