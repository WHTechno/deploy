import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import Card3D from '../components/Card3D';
import AnimatedButton from '../components/AnimatedButton';

export default function Bind() {
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [discord, setDiscord] = useState('');
  const [binded, setBinded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    // Load existing bindings
    const savedEmail = localStorage.getItem('user_email');
    const savedTelegram = localStorage.getItem('user_telegram');
    const savedDiscord = localStorage.getItem('user_discord');
    
    if (savedEmail) {
      setEmail(savedEmail);
      setBinded(true);
    }
    if (savedTelegram) setTelegram(savedTelegram);
    if (savedDiscord) setDiscord(savedDiscord);
  }, []);

  const handleBind = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem('user_email', email);
    if (telegram) localStorage.setItem('user_telegram', telegram);
    if (discord) localStorage.setItem('user_discord', discord);
    
    setBinded(true);
    setLoading(false);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canBind = email && isValidEmail(email);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Account Binding 🔗</h1>
          <p className="text-white/80 drop-shadow">Connect your social accounts to unlock additional features and rewards</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Binding Form */}
          <Card3D className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center drop-shadow">
              <span className="mr-3">📧</span>
              Connect Your Accounts
            </h2>

            <div className="space-y-6">
              {/* Email Binding */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  />
                  {binded && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-green-300">✓</span>
                    </div>
                  )}
                </div>
                {email && !isValidEmail(email) && (
                  <p className="text-red-300 text-sm mt-1">Please enter a valid email address</p>
                )}
              </div>

              {/* Telegram Binding */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Telegram Username (Optional)
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Discord Binding */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Discord Username (Optional)
                </label>
                <input
                  type="text"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  placeholder="username#1234"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Bind Button */}
              <AnimatedButton
                onClick={handleBind}
                loading={loading}
                disabled={!canBind}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {binded ? '🔄 Update Binding' : '🔗 Bind Accounts'}
              </AnimatedButton>

              {binded && (
                <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg animate-fade-in backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-300">✅</span>
                    <span className="text-green-300 font-medium">Accounts successfully bound!</span>
                  </div>
                </div>
              )}
            </div>
          </Card3D>

          {/* Account Info & Benefits */}
          <div className="space-y-6">
            {/* Current Wallet */}
            <Card3D className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center drop-shadow">
                <span className="mr-2">👛</span>
                Connected Wallet
              </h3>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <p className="text-white/80 text-sm mb-1">Wallet Address</p>
                <p className="text-white font-mono text-sm break-all drop-shadow">{address}</p>
              </div>
            </Card3D>

            {/* Benefits */}
            <Card3D className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center drop-shadow">
                <span className="mr-2">🎁</span>
                Binding Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-300">✓</span>
                  <span className="text-white/90">Receive important notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-300">✓</span>
                  <span className="text-white/90">Access to exclusive airdrops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-300">✓</span>
                  <span className="text-white/90">Priority customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-300">✓</span>
                  <span className="text-white/90">Community events access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-300">⭐</span>
                  <span className="text-white/90">+50 bonus points for binding</span>
                </div>
              </div>
            </Card3D>

            {/* Security Notice */}
            <Card3D className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center drop-shadow">
                <span className="mr-2">🔒</span>
                Privacy & Security
              </h3>
              <div className="text-white/80 text-sm space-y-2">
                <p>• Your data is encrypted and stored securely</p>
                <p>• We never share your information with third parties</p>
                <p>• You can unbind accounts at any time</p>
                <p>• All communications are opt-in only</p>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </Layout>
  );
}