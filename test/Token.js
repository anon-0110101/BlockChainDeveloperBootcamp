const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("Token", () =>{
    //Tests go inside here
    let token, 
        accounts, 
        deployer,
        receiver


    beforeEach(async () => {
        //Code that gets executed before each one of these examples (below)
        //fetch Token from blockchain
        const Token = await ethers.getContractFactory("Token")
        token = await Token.deploy("Rancho Las Monjas", "RLM", "1000000")

        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]


    })

    describe("Deployment", () => {

        const name = "Rancho Las Monjas";
        const symbol = "RLM";
        const decimals = "18";
        const totalSupply = tokens('1000000');

        it("Token has correct name", async () => {
            //read token name
            //check that name is correct
            expect(await token.name()).to.equal(name)
    
        })
    
        it("Token has correct symbol", async () => {
            //read token symbol
            //check that symbol is correct
            expect(await token.symbol()).to.equal(symbol)
    
        })
        
        it("Token has correct decimals", async () => {
            //read token symbol
            //check that symbol is correct
            expect(await token.decimals()).to.equal(decimals)
    
        })
    
        it("Token has correct total Supply", async () => {
            //read token symbol
            //check that symbol is correct
            expect(await token.totalSupply()).to.equal(totalSupply)
        })

        it("Token assign total Supply to deployer", async () => {
            //read token symbol
            //check that symbol is correct
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
        })
    })

    describe("Sending Tokens", () => {
        let amount, transaction, result

        describe("Success", () => {

            beforeEach(async () => {
                //tranfer token
                amount = tokens(100)
                transaction = await token.connect(deployer).transfer(receiver.address, amount)
                result = await transaction.wait()
            })
            
            it("Transfers token balances", async () => {
                expect(await token.balanceOf(deployer.address)).to.equal(tokens("999900"))
                expect(await token.balanceOf(receiver.address)).to.equal(amount)
    
                //ensures that tokens tansfered (balance changed)
            })
            
            it("Emits a transfer event", async () => {
                const event = result.events[0]
                expect(event.event).to.equal('Transfer')
    
                const args = event.args
    
                expect(args.from).to.equal(deployer.address)
                expect(args.to).to.equal(receiver.address)
                expect(args.value).to.equal(amount)
            })

        })

        describe("Failure", () => {

            it("rejects insufficient balances", async () =>{
                //Transfer more tokens than the deployer has
                const invalidAmount = tokens(100000000)
                await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
            })
            
            it("rejects invalid recepient", async () => {
                //Transfer more tokens than the deployer has
                const amount = tokens(100)
                await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
            })
        })
    })
})