import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Shield, GraduationCap } from 'lucide-react';

const LoginPage = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic goes here.
    // For now, it just logs to console to prevent the crash.
    console.log("Logging in as:", isAdminMode ? "Instructor" : "Student", email);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {isAdminMode ? (
              <Shield className="h-6 w-6 text-blue-600" />
            ) : (
              <GraduationCap className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isAdminMode ? 'Instructor Portal' : 'Student Entry'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdminMode 
              ? 'Secure access for faculty members' 
              : 'Sign in to access your dashboard'}
          </p>
        </div>

        {/* Toggle Admin/Student Mode */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setIsAdminMode(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              !isAdminMode 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setIsAdminMode(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              isAdminMode 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Instructor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
