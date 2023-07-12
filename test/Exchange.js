const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("Exchange", () =>{
    //Tests go inside here
    let deployer, feeAccount, exchange

    const feePercent = 10

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        feeAccount = accounts[1]

        //Code that gets executed before each one of these examples (below)
        //fetch Token from blockchain
        const Exchange = await ethers.getContractFactory("Exchange")
        exchange = await Exchange.deploy(feeAccount.address, feePercent)


    })

    describe("Deployment", () => {
        it("Tracks the fee Account", async () => {
            expect(await exchange.feeAccount()).to.equal(feeAccount.address)
    
        })

        it("Tracks the fee percent", async () => {
            expect(await exchange.feePercent()).to.equal(feePercent)
    
        })
    })
})