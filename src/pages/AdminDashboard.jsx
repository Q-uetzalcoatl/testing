import React, { useState, useEffect } from 'react';
import { mockDb } from '../data/mockDb';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [isReleased, setIsReleased] = useState(false);

  // Load data periodically to simulate real-time updates
  const refreshData = () => {
    const db = mockDb.getRaw();
    setStudents(db.students);
    setIsReleased(db.config.areScoresReleased);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 2000); // Auto-refresh every 2s
    return () => clearInterval(interval);
  }, []);

  const handleToggleRelease = () => {
    const newState = mockDb.toggleRelease();
    setIsReleased(newState);
  };

  const handleReset = () => {
    if(confirm("Are you sure? This deletes ALL student data.")) {
      mockDb.resetSystem();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Instructor Dashboard</h1>
            <p className="text-slate-500">Monitor student progress and violations in real-time.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleToggleRelease}
              className={`px-6 py-3 rounded-lg font-bold shadow-sm transition ${
                isReleased 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isReleased ? '✅ Scores Released' : '🔒 Release Results'}
            </button>
            <button onClick={handleReset} className="text-red-500 hover:underline">
              Reset System
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Violations (Tab Switches)</th>
                <th className="p-4">Score</th>
                <th className="p-4">Time Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">No students have joined yet.</td>
                </tr>
              )}
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-slate-600">{s.id}</td>
                  <td className="p-4 font-medium text-slate-800">{s.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      s.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    {/* PDF Requirement: Highlight Violations */}
                    <span className={`px-3 py-1 rounded-full font-bold ${
                      s.violations > 0 ? 'bg-red-100 text-red-600' : 'text-slate-400'
                    }`}>
                      {s.violations}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">
                    {s.status === 'completed' ? s.score : '-'}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {s.timestamp || 'In Progress...'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
