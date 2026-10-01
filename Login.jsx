import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@fleetos.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    if (email.includes('admin')) onLogin({ name: 'Suraj Admin', role: 'ADMIN', email });
    else if (email.includes('staff')) onLogin({ name: 'Ramesh Dispatcher', role: 'STAFF', email });
    else onLogin({ name: 'Guest User', role: 'STAFF', email });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white">Fleet OS</h1>
        <p className="text-gray-400 text-sm mt-1">for Modern Fleets</p>
        
        <div className="bg-[#1a1a1a] p-3 rounded-lg text-xs text-gray-300 mt-6 border border-[#222]">
          <p className="font-bold text-green-400">Demo Accounts - pass: 123456</p>
          <p className="mt-2">ADMIN: admin@fleetos.com</p>
          <p>STAFF: staff@fleetos.com</p>
        </div>

        <input 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          placeholder="Email"
          className="w-full mt-4 bg-[#1a1a1a] border border-[#222] p-3 rounded-lg text-white outline-none focus:border-white"
        />
        <input 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          type="password" 
          placeholder="Password"
          className="w-full mt-3 bg-[#1a1a1a] border border-[#222] p-3 rounded-lg text-white outline-none focus:border-white"
        />
        <button 
          onClick={handleLogin} 
          className="w-full mt-4 bg-white text-black font-bold p-3 rounded-lg text-sm hover:bg-gray-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}