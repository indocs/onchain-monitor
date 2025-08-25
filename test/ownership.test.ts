import { ethers } from "hardhat";
import { expect } from "chai";

describe("OnchainMonitor ownership", function() {
  it("non-owner cannot transfer ownership", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const OnchainMonitor = await ethers.getContractFactory("OnchainMonitor");
    const contract = await OnchainMonitor.deploy();
    await contract.deployed();

    // attempt from non-owner
    const contractAsNonOwner = contract.connect(addr1);
    await expect(contractAsNonOwner.transferOwnership(addr1.address)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
