import { artifacts } from 'hardhat';

async function main() {
  try {
    const artifact = await artifacts.readArtifact('OnchainMonitor');
    console.log(JSON.stringify(artifact.abi, null, 2));
  } catch (err) {
    console.error('Failed to read artifact for OnchainMonitor:', err);
    process.exit(1);
  }
}

main();
