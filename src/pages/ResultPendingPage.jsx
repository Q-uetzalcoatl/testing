import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { PageContainer, Card, Button, Badge } from '../components/DesignSystem';

const ResultPendingPage = ({ studentName, quizId, onBack, onLogout }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const allResults = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
    const myResult = allResults.find(r => r.studentName === studentName && r.quizId === quizId);
    setResult(myResult);
  }, [studentName, quizId]);

  if (!result) return <div>Loading...</div>;

  return (
    <PageContainer user={studentName} onLogout={onLogout}>
      <Card className="text-center py-10">
        
        {/* If Released: Show Score. If Not: Show Clock */}
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${result.released ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
          {result.released ? <CheckCircle size={40} /> : <Clock size={40} />}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {result.released ? "Examination Results" : "Submission Successful"}
        </h2>
        
        <p className="text-gray-500 mb-8 px-4">
          {result.released 
            ? "Your instructor has released the scores for this examination." 
            : "Your answers have been recorded. Please wait for the instructor to release the scores."}
        </p>

        {/* The Score Box */}
        {result.released && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8 max-w-xs mx-auto">
            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-1">Your Score</p>
            <p className="text-5xl font-extrabold text-emerald-600">
              {result.score} <span className="text-xl text-emerald-400">/ {result.total}</span>
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button onClick={onBack} variant="secondary">Back to Dashboard</Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default ResultPendingPage;
