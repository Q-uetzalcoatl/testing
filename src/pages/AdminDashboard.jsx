import React, { useState, useEffect } from 'react';
import { PageContainer, Card, Badge, Button } from '../components/DesignSystem';

const AdminDashboard = ({ onLogout }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
    setResults(data);
  }, []);

  const releaseAll = () => {
    const updated = results.map(r => ({ ...r, released: true }));
    setResults(updated);
    localStorage.setItem('cvsu_db_results', JSON.stringify(updated));
    alert("All scores released to students!");
  };

  return (
    <PageContainer title="Instructor Dashboard" user="Admin" onLogout={onLogout}>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-500 text-sm">Overview of student performance</p>
        <div className="w-40">
          <Button onClick={releaseAll} variant="secondary">Release All</Button>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-emerald-50 text-emerald-900 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Quiz ID</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400">No submissions yet.</td>
                </tr>
              ) : (
                results.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{r.studentName}</td>
                    <td className="px-6 py-4 text-gray-500">{r.quizId}</td>
                    <td className="px-6 py-4 font-bold text-emerald-700">{r.score} / {r.total}</td>
                    <td className="px-6 py-4">
                      <Badge variant={r.released ? "success" : "warning"}>
                        {r.released ? "Released" : "Pending"}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AdminDashboard;
