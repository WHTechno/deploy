import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  if (isConnected) navigate('/dashboard');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-6">Welcome to 0G Mining</h1>
      <button onClick={() => open()} className="px-6 py-2 bg-blue-500 text-white rounded">
        Connect Wallet
      </button>
    </div>
  );
}
