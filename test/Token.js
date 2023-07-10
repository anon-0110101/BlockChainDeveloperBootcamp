const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("Token", () =>{
    //Tests go inside here
    let token, 
        accounts, 
        deployer


    beforeEach(async () => {
        //Code that gets executed before each one of these examples (below)
        //fetch Token from blockchain
        const Token = await ethers.getContractFactory("Token")
        token = await Token.deploy("Rancho Las Monjas", "RLM", "1000000")

        accounts = await ethers.getSigners()
        deployer = accounts[0]

    })

    describe('Deployment', () => {

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
})