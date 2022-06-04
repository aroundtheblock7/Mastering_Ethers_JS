const { ethers } = require("ethers");

const INFURA_ID = '5fc3736954c847d18acfb32d5c762cb7'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];

const address = '0xF411903cbC70a74d22900a5DE66A2dda66507255' //Verasity (VRA) address
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()

    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}\n`)
    console.log(`Total Supply Formatted: ${ethers.utils.formatEther(totalSupply)}\n`)

    const balance = await contract.balanceOf('0xF411903cbC70a74d22900a5DE66A2dda66507255')
    console.log(`Balance Returned: ${balance}`) //unformated balance
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
}

main()
