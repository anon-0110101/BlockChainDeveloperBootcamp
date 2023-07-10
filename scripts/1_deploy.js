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
  //learned how to write tests
  //basic things with ERC-20 tokens
  //cleaned up code
  