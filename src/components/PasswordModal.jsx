import React, { useState } from 'react';

export default function PasswordModal({ quiz, onSuccess, onBack }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === quiz.password) {
      onSuccess();
    } else {
      setError('Invalid Access Code');
      setCode('');
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-emerald-100 mt-10">
      <button onClick={onBack} className="text-xs font-bold text-gray-400 hover:text-emerald-600 mb-6 flex items-center gap-1">
          ← BACK TO DASHBOARD
      </button>
      <h2 className="text-xl font-bold text-emerald-800 mb-1">Enter Quiz Password</h2>
      <p className="text-gray-500 mb-6 text-sm">Restricted access for <strong>{quiz.title}</strong>.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
            <input 
            type="password" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 border-2 border-emerald-100 rounded-lg text-center text-2xl tracking-[0.5em] font-mono font-bold focus:border-yellow-400 focus:outline-none transition-colors"
            placeholder="••••••"
            autoFocus
            />
        </div>
        {error && <p className="text-red-500 text-center font-bold text-sm bg-red-50 py-2 rounded">{error}</p>}
        <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-4 rounded-lg shadow transition-colors uppercase tracking-wide text-sm">
          Unlock & Start
        </button>
      </form>
    </div>
  );
}
