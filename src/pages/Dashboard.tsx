import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import Card3D from '../components/Card3D';
import AnimatedButton from '../components/AnimatedButton';
import StatsCard from '../components/StatsCard';
import { writeContract, readContract } from '../utils/contract';

interface LeaderEntry {
  address: string;
  points: number;
}

export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [lastStart, setLastStart] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [miningActive, setMiningActive] = useState(false);
  const { address } = useAccount();

  const handleStart = async () => {
    setLoading(true);
    try {
      await writeContract('startMining', ['0x0000000000000000000000000000000000000000']);
      setMiningActive(true);
      fetchData();
      addLog('🚀 Mining started successfully!');
    } catch (err) {
      console.error(err);
      addLog('❌ Failed to start mining');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      await writeContract('claimPoints', []);
      fetchData();
      addLog('💎 Points claimed successfully!');
    } catch (err) {
      console.error(err);
      addLog('❌ Failed to claim points');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!address) return;
    try {
      const last = await readContract('getLastStart', [address]);
      const pts = await readContract('getPoints', [address]);
      setLastStart(Number(last));
      setPoints(Number(pts));

      // Check if mining is active (within last 24 hours)
      const now = Math.floor(Date.now() / 1000);
      setMiningActive(now - Number(last) < 86400);

      const entries = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      const updated = entries.filter((e: LeaderEntry) => e.address !== address);
      updated.push({ address, points: Number(pts) });
      const sorted = updated.sort((a, b) => b.points - a.points).slice(0, 10);
      localStorage.setItem('leaderboard', JSON.stringify(sorted));
      setLeaderboard(sorted);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (address) fetchData();
  }, [address]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, Miner! 👋</h1>
          <p className="text-white/60">Monitor your mining progress and claim your rewards</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Points"
            value={points.toLocaleString()}
            icon="💎"
            trend="up"
            trendValue="+12.5%"
          />
          <StatsCard
            title="Mining Status"
            value={miningActive ? "Active" : "Inactive"}
            icon={miningActive ? "🟢" : "🔴"}
          />
          <StatsCard
            title="Last Mining"
            value={lastStart ? new Date(lastStart * 1000).toLocaleDateString() : "Never"}
            icon="⏰"
          />
          <StatsCard
            title="Rank"
            value={`#${leaderboard.findIndex(entry => entry.address === address) + 1 || 'N/A'}`}
            icon="🏆"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mining Control Panel */}
          <div className="lg:col-span-2">
            <Card3D className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Mining Control Center</h2>
                
                {/* 3D Mining Visualization */}
                <div className="relative mb-8">
                  <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-4xl transform transition-all duration-1000 ${miningActive ? 'animate-spin-slow scale-110' : 'scale-100'}`}>
                    {miningActive ? '⚡' : '💎'}
                  </div>
                  {miningActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-ping"></div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton
                    onClick={handleStart}
                    loading={loading}
                    variant="success"
                    size="lg"
                    disabled={miningActive}
                  >
                    {miningActive ? '🟢 Mining Active' : '🚀 Start Mining'}
                  </AnimatedButton>
                  
                  <AnimatedButton
                    onClick={handleClaim}
                    loading={loading}
                    variant="primary"
                    size="lg"
                    disabled={points === 0}
                  >
                    💰 Claim {points} Points
                  </AnimatedButton>
                </div>
              </div>

              {/* Mining Progress */}
              {miningActive && (
                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Mining Progress</span>
                    <span className="text-white font-semibold">Active</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              )}
            </Card3D>
          </div>

          {/* Activity Log */}
          <div>
            <Card3D className="p-6 h-full">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">📜</span>
                Activity Log
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-white/60 text-sm">No activity yet</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="text-sm text-white/80 p-2 bg-white/5 rounded-lg animate-fade-in">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </Card3D>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-8">
          <Card3D className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🏆</span>
              Global Leaderboard
            </h3>
            <div className="grid gap-4">
              {leaderboard.length === 0 ? (
                <p className="text-white/60 text-center py-8">No miners yet. Be the first!</p>
              ) : (
                leaderboard.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      entry.address === address
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        i === 0 ? 'bg-yellow-500 text-black' :
                        i === 1 ? 'bg-gray-400 text-black' :
                        i === 2 ? 'bg-orange-600 text-white' :
                        'bg-white/20 text-white'
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                          {entry.address === address && <span className="ml-2 text-purple-400">(You)</span>}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{entry.points.toLocaleString()}</p>
                      <p className="text-white/60 text-sm">points</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card3D>
        </div>
      </div>
    </Layout>
  );
}