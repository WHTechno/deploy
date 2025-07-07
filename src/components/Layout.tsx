import { ReactNode, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Tasks', path: '/task', icon: '📋' },
    { name: 'Bind Email', path: '/bind', icon: '🔗' },
  ];

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
    setShowProfileMenu(false);
  };

  if (!isConnected) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">0G</span>
              </div>
              <h1 className="text-white text-xl font-bold">Mining DApp</h1>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {address?.slice(2, 4).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-white text-sm font-medium">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                  <p className="text-white/60 text-xs">Connected</p>
                </div>
                <svg
                  className={`w-4 h-4 text-white transition-transform duration-300 ${
                    showProfileMenu ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-white/20">
                    <p className="text-white text-sm font-medium">Wallet Address</p>
                    <p className="text-white/60 text-xs break-all">{address}</p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white/5 backdrop-blur-md">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}