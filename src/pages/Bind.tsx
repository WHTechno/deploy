import { useState } from 'react';

export default function Bind() {
  const [email, setEmail] = useState('');
  const [binded, setBinded] = useState(false);

  const handleBind = () => {
    localStorage.setItem('user_email', email);
    setBinded(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Bind Email & Address</h2>
      <input
        type="email"
        className="border p-2"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleBind} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
        Bind
      </button>
      {binded && <div className="mt-4 text-green-500">Email bound successfully!</div>}
    </div>
  );
}
