import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";


describe("Daosmartcontract", function () {
 
  async function deployNfttokenfixture() {

        const [admin,bob] = await hre.ethers.getSigners();

        const Token = await hre.ethers.getContractFactory("Nfttoken");
        const token = await Token.deploy();

        const Controler = await hre.ethers.getContractFactory("Voting");
        const controler= await Controler.deploy(token.getAddress());

        const Proposal = await hre.ethers.getContractFactory("Proposal");
        const proposal = await Proposal.deploy(token.getAddress(),controler.getAddress());

         return { admin,bob,token,controler,proposal};
  }
  it("should mint nfttoken", async function () {
    const { bob, token } = await loadFixture(deployNfttokenfixture);
   const safemint = await token.safeMint(bob.address);
    const nfttoken = await token.balanceOf(bob);
    expect(nfttoken).to.equal(1);
  })

  it("should createproposal", async function () {
    const { bob,token, proposal, controler } = await loadFixture(deployNfttokenfixture);
    const safemint=await token.safeMint(bob.getAddress());
    const canpropose = await controler.Canpropose(bob.getAddress());
    const proposalDesc = "Description of my proposal";
    const proposalTitle = "Proposal Title"; 
    const timePeriod = 1800;
    const proposals =await proposal.connect(bob).createproposal(proposalDesc,proposalTitle,timePeriod);
  })

  it("should vote for proposals", async function () {
    const { bob,token, proposal, controler } = await loadFixture(deployNfttokenfixture);
    const nftmint=await token.safeMint(bob.getAddress());
    const validvoter = await controler.IsVoter(bob);
    const voteForProposal = await proposal.connect(bob).Votingproposal(0,1); 
    await voteForProposal.wait();
  })
})
