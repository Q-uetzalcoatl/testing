import React from 'react';
import { useQuiz } from '../context/QuizContext';

function Navbar() {
  const { user, logout, violations } = useQuiz();

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-400">🛡️ Ironclad Proctor</span>
        </div>
        
        {user && (
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-300">
              User: <span className="font-semibold text-white">{user.name}</span>
            </span>
            
            {user.role === 'student' && user.status !== 'completed' && (
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${violations > 0 ? 'bg-red-600' : 'bg-green-600'}`}>
                Violations: {violations}/3
              </div>
            )}

            <button onClick={logout} className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
