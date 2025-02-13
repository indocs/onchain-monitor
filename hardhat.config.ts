import { HardhatUserConfig } from 'hardhat/types';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        enabled: false
      }
    },
    localhost: {
      url: 'http://127.0.0.1:8545'
    }
  },
  solidity: {
    compilers: [{ version: '0.8.20', settings: { optimizer: { enabled: true, runs: 200 } } }]
  },
  paths: {
    tests: './test',
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 20000
  }
};

export default config;
