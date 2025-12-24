import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

function LoginPage() {
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { login } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdminMode) {
      // Admin Login
      if (formData.id === 'admin123') { // Simple password check
        login('admin', 'admin');
        navigate('/admin');
      } else {
        alert('Invalid Password (Try: admin123)');
      }
    } else {
      // Student Login
      if (!formData.id || !formData.name) return alert("Fill all fields");
      const result = login(formData.id, formData.name);
      if (result.finished) {
        navigate('/pending');
      } else {
        navigate('/quiz');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          {isAdminMode ? 'Instructor Portal' : 'Student Entry'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdminMode && (
            <div>
              <label className="block text-sm font-medium text-slate-600">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Juan Dela Cruz"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-600">
              {isAdminMode ? 'Admin Password' : 'Student ID'}
            </label>
            <input
              type={isAdminMode ? "password" : "text"}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder={isAdminMode ? "Enter Password" : "e.g. 2023-001"}
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition">
            {isAdminMode ? 'Access Dashboard' : 'Start Exam'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="text-sm text-slate-500 hover:text-indigo-600 underline"
          >
            {isAdminMode ? 'Back to Student Login' : 'Instructor Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
