# onchain-monitor

A deterministic on-chain activity tracker that alerts governance events and transaction anomalies to reduce MTTR in live deployments.

## Outline
- What is onchain-monitor?
- Key concepts
- How it works
- Setup and Quickstart
- Deployment notes
- Testing strategy

## Quickstart
1. Install dependencies and initialize
2. Run Hardhat node and tests
3. Deploy to a network

## Deployment (Hardhat)
- Configure network RPC URLs via .env
- Run script to deploy and verify

## Development notes
- Lean, production-minded Solidity with event emissions for real-time alerts.
- Access control to restrict who can record activity and manage thresholds.
- Tests include revert scenarios to ensure security boundaries.

## Organization
- contracts/: Solidity contracts
- test/: TypeScript tests
- scripts/: deployment and helper scripts
- hardhat.config.ts: Hardhat configuration
- package.json: dependencies and scripts
