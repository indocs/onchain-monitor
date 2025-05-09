import { ethers } from 'hardhat';

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error('Please set CONTRACT_ADDRESS environment variable to the OnchainMonitor contract address.');
    process.exit(1);
  }

  // Try to load the ABI from artifacts
  const OnchainMonitor = await import("../typechain-types/OnchainMonitor");
  let abi: any;
  try {
    // If typechain artifacts are available
    abi = OnchainMonitor?.OnchainMonitor?.abi ?? (await import("../artifacts/contracts/OnchainMonitor.sol/OnchainMonitor.json")).abi;
  } catch {
    // Fallback: try dynamic import of artifact JSON
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const artifact = require("../artifacts/contracts/OnchainMonitor.sol/OnchainMonitor.json");
      abi = artifact.abi;
    } catch {
      console.error("Unable to load ABI for OnchainMonitor. Ensure artifacts exist.");
      process.exit(1);
    }
  }

  const provider = ethers.provider;
  const signer = provider.getSigner ? provider.getSigner() : ethers.constants.AddressZero;

  const contract = new ethers.Contract(contractAddress, abi, signer.isSigner ? signer : provider);

  // Attempt to read owner() if present
  try {
    const owner = await contract.owner();
    console.log(`OnchainMonitor owner: ${owner}`);
  } catch (err) {
    console.error("Contract does not expose an 'owner' function or access denied.");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
