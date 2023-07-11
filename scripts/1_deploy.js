async function main () {
    const Token = await ethers.getContractFactory("Token")

    const token = await Token.deploy()
    
    await token.deployed()

    console.log(`Token deployed to: ${token.address}`)

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
