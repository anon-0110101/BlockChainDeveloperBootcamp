const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}


describe("Exchange", () =>{
    //Tests go inside here
    let deployer, feeAccount, exchange, user1

    const feePercent = 10

    beforeEach(async () => {
        
        const Exchange = await ethers.getContractFactory("Exchange")
        const Token = await ethers.getContractFactory("Token")

        token1 = await Token.deploy("Rancho Las Monjas", "RLM", "1000000")

        accounts = await ethers.getSigners()
        deployer = accounts[0]
        feeAccount = accounts[1]
        user1 = accounts[2]

        let transaction = await token1.connect(deployer).transfer(user1.address, tokens(100))
        await transaction.wait()


        //Code that gets executed before each one of these examples (below)
        //fetch Token from blockchain

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

    describe("Depositing tokens", () =>{
        
        let transaction, result
        let amount = tokens(10)

        describe("Success", () => {
            beforeEach(async () => {
                //Approve tokens
                transaction =await token1.connect(user1).approve(exchange.address, amount)
                result = await transaction.wait()
                //Deposit tokens
    
                transaction =await exchange.connect(user1).depositToken(token1.address, amount)
                result = await transaction.wait()
            })
            it("tracks the token deposit", async () => {
                expect(await token1.balanceOf(exchange.address)).to.equal(amount)
                expect(await exchange.tokens(token1.address, user1.address)).to.equal(amount)
                expect(await exchange.balanceOf(token1.address, user1.address)).to.equal(amount)
            })

            it("emits a Deposit event", async () => {
                const event = result.events[1] //2 events are emitted
                expect(event.event).to.equal("Deposit")

                const args = event.args
                expect(args.token).to.equal(token1.address)
                expect(args.user).to.equal(user1.address)
                expect(args.amount).to.equal(amount)
                expect(args.balance).to.equal(amount)

            })
        })

        describe("Failure", () => {

            it("fails when no tokens have been approved", async () => {
                //Dont approve any tokens before depositing
                await expect(exchange.connect(user1).depositToken(token1.address, amount)).to.be.reverted


            })
        })
    })
})