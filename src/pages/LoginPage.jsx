import React, { useState } from 'react';
import { User, Lock, Shield, GraduationCap } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !isAdminMode) return;
    
    if (isAdminMode) {
      onLogin('admin');
    } else {
      const name = email.split('@')[0]; 
      onLogin(name); 
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-10">
      <div className="text-center mb-8">
        <div className="mx-auto h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          {isAdminMode ? <Shield className="h-6 w-6 text-emerald-600" /> : <GraduationCap className="h-6 w-6 text-emerald-600" />}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          {isAdminMode ? 'Instructor Portal' : 'Student Entry'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isAdminMode ? 'Secure access for faculty members' : 'Sign in to access your dashboard'}
        </p>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
        <button
          type="button"
          onClick={() => setIsAdminMode(false)}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isAdminMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => setIsAdminMode(true)}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isAdminMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required={!isAdminMode}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="name@cvsu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
