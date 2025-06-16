import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using signer:", deployer.address);

  // Assumes OnchainMonitor contract is deployed and address is known via env var or Hardhat config
  // If you have a deployment artifact, adjust the import accordingly.
  const contractFactory = await ethers.getContractFactory("OnchainMonitor");
  // Replace with your deployed address if needed, or fetch from artifacts.
  const address = process.env.ONCHAIN_MONITOR_ADDRESS || "";
  if (!address) {
    console.error("Please set ONCHAIN_MONITOR_ADDRESS in your env to a deployed contract address.");
    process.exit(1);
  }
  const contract = contractFactory.attach(address);

  try {
    // Access restricted function name inferred from typical owner-only patterns.
    // If the contract does not expose this exact function, replace with a known read-only getter.
    // This call should be a view/pure if used for verification without state changes.
    // Example: await contract.ownerDate(); // replace with actual function if available
    const owner = await contract.owner?.();
    console.log("Contract owner:", owner?.toString?.() ?? owner);
  } catch (err) {
    console.error("Failed to read owner information. Ensure the contract has an owner() or equivalent function exposed.");
    console.error(err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
