const { isCommunityResourcable } = require("@ethersproject/providers");
const { ethers } = require("ethers");
require('dotenv').config();

const INFURA_ID = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

const account1 = '0xFF985509Aa523FE9cd3d0A6891fCB9f2A4134feE'
const account2 = '0x3404446637B0Ec81eb53E9F1B48c907de0860287'

const privateKey1 = process.env.PRIVATE_KEY1

const wallet = new ethers.Wallet(privateKey1, provider)


const main = async () => {
    //Show account 1 balnce before transfer 
    const senderBalanceBefore = await provider.getBalance(account1)
    //Show account 2 balnce before transfer 
    const receiverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`\nReceiver balance before: ${ethers.utils.formatEther(receiverBalanceBefore)}`)


    //Send Ether 
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.015")
    })
    //Wait for Transaction to be mined
    await tx.wait()
    console.log(tx)

    //Show account 1 balnce afer transfer 
    const senderBalanceAfter = await provider.getBalance(account1)
    const receiverBalanceAfter = await provider.getBalance(account2)

    console.log(`n\Sender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}\n`)

}

main()