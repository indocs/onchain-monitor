import { ethers } from 'hardhat';

// Small utility to estimate gas for interacting with the OnchainMonitor contract
//Usage: ts-node scripts/monitorGasHelpers.ts <contractAddress> <functionName> <args...>

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: ts-node scripts/monitorGasHelpers.ts <contractAddress> <functionName> [args...]');
    process.exit(1);
  }
  const [contractAddress, functionName, ...funcArgs] = args;

  const [signer] = await ethers.getSigners();
  const abi = [
    // Minimal ABI to call any public non-constant function and estimate gas
    // This is a generic helper; replace with the exact ABI if needed for precise typing
    "function" // placeholder to satisfy TS; actual ABI is determined by hardhat at runtime
  ];

  // Fallback: use a generic interface
  // We won't strictly require ABI here; instead, attempt to estimate by calling with empty data
  try {
    const contract = new ethers.Contract(contractAddress, ["function " + functionName + "()"], signer);
    const gas = await contract.estimateGas[functionName](...funcArgs);
    const tx = {
      to: contractAddress,
      data: contract.interface.encodeFunctionData(functionName, funcArgs.map((a) => a)),
      from: await signer.getAddress(),
      gasLimit: gas.mul(110).div(100),
    };
    console.log("Estimated gas for", functionName, "->", gas.toString());
    console.log("Preview tx:", tx);
  } catch (e) {
    console.error("Could not estimate gas with generic helper:", e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
