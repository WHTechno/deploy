import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Chain } from 'wagmi';

const ogGalileo: Chain = {
  id: 16601,
  name: '0G-Galileo-Testnet',
  network: '0g-testnet',
  nativeCurrency: {
    name: 'OG',
    symbol: 'OG',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
    public: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
  },
  blockExplorers: {
    default: { name: '0G Scan', url: 'https://chainscan-galileo.0g.ai' },
  },
  testnet: true,
};

const projectId = 'fd45eb59eb3b04ba52ca7c71db7684ef'; // Ganti sesuai WalletConnect kamu

const { chains, publicClient } = configureChains(
  [ogGalileo],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

async function ensure0GChain() {
  const provider = (window as any).ethereum;
  if (!provider) return;

  const chainId = '0x40E9'; // 16601 in hex
  const currentChainId = await provider.request({ method: 'eth_chainId' });

  if (currentChainId !== chainId) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId,
              chainName: '0G-Galileo-Testnet',
              rpcUrls: ['https://evmrpc-testnet.0g.ai'],
              nativeCurrency: {
                name: 'OG',
                symbol: 'OG',
                decimals: 18,
              },
              blockExplorerUrls: ['https://chainscan-galileo.0g.ai'],
            },
          ],
        });
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        onConnect={ensure0GChain}
      />
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
