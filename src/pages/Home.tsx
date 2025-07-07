import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AnimatedButton from '../components/AnimatedButton';

export default function Home() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-500 animate-pulse-slow shadow-2xl">
            <span className="text-white font-bold text-4xl">0G</span>
          </div>
        </div>

        {/* Title with Gradient Text */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
          0G Mining
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-4 animate-fade-in-delay">
          Next-Generation Decentralized Mining Platform
        </p>
        
        <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2">
          Join the future of blockchain mining with advanced 3D visualization, 
          real-time analytics, and seamless Web3 integration.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-delay-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-white/60 text-sm">Optimized mining algorithms for maximum efficiency</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-white font-semibold mb-2">Secure & Safe</h3>
            <p className="text-white/60 text-sm">Enterprise-grade security with Web3 integration</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-white font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-white/60 text-sm">Advanced dashboard with live mining statistics</p>
          </div>
        </div>

        {/* Connect Button */}
        <div className="animate-fade-in-delay-4">
          <AnimatedButton
            onClick={() => open()}
            size="lg"
            className="text-xl px-12 py-4 shadow-2xl"
          >
            <span className="mr-2">🚀</span>
            Connect Wallet & Start Mining
          </AnimatedButton>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-delay-5">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">1,234</div>
            <div className="text-white/60 text-sm">Active Miners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5.67M</div>
            <div className="text-white/60 text-sm">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-white/60 text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-white/60 text-sm">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}