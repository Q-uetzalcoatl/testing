import React, { useState } from 'react';
import { User } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border-t-4 border-emerald-500 mt-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Student Access</h2>
        <p className="text-emerald-600 text-sm">Please identify yourself to proceed.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(name); }} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wider font-bold text-emerald-700 mb-2">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border-2 border-emerald-100 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all text-lg placeholder-emerald-200"
            placeholder="e.g. Juan Dela Cruz"
            required 
          />
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          Enter Portal
        </button>
      </form>
    </div>
  );
}
