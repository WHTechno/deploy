import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
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
  const { address } = useAccount();
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      await writeContract('startMining', ['0x0000000000000000000000000000000000000000']);
      fetchData();
      addLog('Started mining');
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaim = async () => {
    try {
      await writeContract('claimPoints', []);
      fetchData();
      addLog('Claimed points');
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    if (!address) return;
    const last = await readContract('getLastStart', [address]);
    const pts = await readContract('getPoints', [address]);
    setLastStart(Number(last));
    setPoints(Number(pts));

    const entries = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const updated = entries.filter((e: LeaderEntry) => e.address !== address);
    updated.push({ address, points: Number(pts) });
    const sorted = updated.sort((a, b) => b.points - a.points).slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(sorted));
    setLeaderboard(sorted);
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (address) fetchData();
  }, [address]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <button onClick={handleStart} className="px-4 py-2 bg-green-500 text-white rounded">Start Mining</button>
      <button onClick={handleClaim} className="ml-4 px-4 py-2 bg-purple-500 text-white rounded">Claim Points</button>

      <div className="mt-4">Points: {points}</div>
      <div className="mt-2">Last Start: {new Date(lastStart * 1000).toLocaleString()}</div>

      <h3 className="text-xl mt-6 mb-2">🏆 Leaderboard</h3>
      <ul className="list-decimal pl-6">
        {leaderboard.map((entry, i) => (
          <li key={i}>{entry.address.slice(0, 6)}...{entry.address.slice(-4)} - {entry.points} pts</li>
        ))}
      </ul>

      <h3 className="text-xl mt-6 mb-2">📜 Activity Log</h3>
      <ul className="pl-4 list-disc text-sm">
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>

      <button onClick={() => navigate('/')} className="mt-6 text-red-500 underline">Logout</button>
    </div>
  );
}
