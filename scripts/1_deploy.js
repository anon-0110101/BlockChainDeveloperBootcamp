async function main () {
    console.log(`Preparing deployment ....\n`)

    const Token = await ethers.getContractFactory("Token")
    const Exchange = await ethers.getContractFactory("Exchange")
    
    const accounts = await ethers.getSigners()

    console.log(`Accounts fetcheds: \n${accounts[0].address}\n${accounts[1].address}\n`)

    //Deploy Contracts ---- Migration script

    const RanchoToken = await Token.deploy("Rancho Las Monjas", "RLM", "1000000")
    await RanchoToken.deployed()

    console.log(`RanchoToken deployed to: ${RanchoToken.address}`)

    const mETH = await Token.deploy("mETH", "mETH", "1000000")
    await mETH.deployed()
    console.log(`mETH deployed to: ${mETH.address}`)

    const mDAI = await Token.deploy("mDAI", "mDAI", "1000000")
    await mDAI.deployed()
    console.log(`mDAI deployed to: ${mDAI.address}`)

    const exchange = await Exchange.deploy(accounts[1].address, 10)
    await exchange.deployed()
    console.log(`Exchange deployed to: ${exchange.address}`)
    

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


  //created a token
  //put it on the blockchain
  //opened the console
  //interacted with the token
  //created solidity source code
  //fetched the solidity created source code
  //learned how to write tests use tests with Hardhat
  //basic solidity codes
  //cleaned up code
  //buidling out an entire function
  //how events work
  //how to check out for events
  //how to throw errors
  //how to trigger functions with ether.js 
  //how to pay for gas costs with each individual account
  //cryptocurrency smart contract 
  //deposited tokens in to the exchange
  //checked the balances
  
