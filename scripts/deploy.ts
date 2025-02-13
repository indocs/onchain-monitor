// deploy.ts
import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying from', deployer.address);

  const Monitor = await ethers.getContractFactory('OnchainMonitor');
  // initial threshold: 100 blocks
  const monitor = await Monitor.deploy(100);
  await monitor.deployed();

  console.log('OnchainMonitor deployed at:', monitor.address);
  // Optional: set a watcher (the deployer) for demonstration
  await monitor.setWatcher(deployer.address, true);
  console.log('Watcher enabled for deployer');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
