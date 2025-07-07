import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import Bind from './pages/Bind';
import Home from './pages/Home';

function App() {
  const { isConnected } = useAccount();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isConnected ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/task" element={isConnected ? <Task /> : <Navigate to="/" />} />
        <Route path="/bind" element={isConnected ? <Bind /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
