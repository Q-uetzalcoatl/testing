import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertOctagon, Home } from 'lucide-react';

export default function ResultPendingPage({ studentName, quizId, onBack }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const allResults = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
      const myResult = allResults.find(r => r.studentName === studentName && r.quizId === quizId);
      
      if (myResult) {
        setResult(myResult);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkStatus(); 
    const interval = setInterval(checkStatus, 2000); 
    return () => clearInterval(interval);
  }, [studentName, quizId]);

  if (loading) return <div className="text-emerald-600 font-bold animate-pulse text-center mt-20">Syncing with system...</div>;

  if (!result) {
      return (
          <div className="max-w-lg bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-red-500 mt-20">
             <h2 className="text-2xl font-bold text-red-600 mb-2">Record Not Found</h2>
             <p className="text-gray-600 mb-6">Your quiz record seems to be missing or was reset by the admin.</p>
             <button onClick={onBack} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Back to Dashboard</button>
          </div>
      )
  }

  const isReleased = result.released === true;
  const isCheater = result.status === 'cheated';

  return (
    <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-emerald-100 text-center mt-10">
      {isCheater ? (
        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-500 mb-6">
           <div className="mb-4">
              <AlertOctagon className="w-16 h-16 text-red-500 mx-auto" />
           </div>
           <h2 className="text-3xl font-extrabold text-red-600 mb-2">VIOLATION DETECTED</h2>
           <p className="text-red-800 font-medium">Your quiz was terminated due to excessive tab switching (5/5).</p>
           <div className="mt-4 text-4xl font-black text-red-900 bg-red-100 py-4 rounded-lg">SCORE: 0 / {result.total}</div>
        </div>
      ) : isReleased ? (
        <div className="mb-6">
           <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
           </div>
           <h2 className="text-3xl font-bold text-emerald-800 mb-2">Quiz Results</h2>
           <p className="text-emerald-600 mb-6">Great job completing the {result.quizTitle}.</p>
           <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200 inline-block min-w-[200px]">
              <span className="block text-emerald-600 text-sm font-bold uppercase tracking-wider">Your Score</span>
              <span className="block text-5xl font-black text-emerald-900 mt-2">{result.score} <span className="text-2xl text-emerald-400">/ {result.total}</span></span>
           </div>
        </div>
      ) : (
        <div className="mb-6 py-12">
           <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-emerald-600 rounded-full mx-auto mb-6"></div>
           <h2 className="text-2xl font-bold text-emerald-800 mb-2">Submission Successful</h2>
           <p className="text-emerald-600">Please wait for the instructor to release the results.</p>
           <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold">
             Status: Pending Release
           </div>
        </div>
      )}

      <div className="border-t border-emerald-100 pt-6">
         <button onClick={onBack} className="flex items-center justify-center gap-2 w-full bg-white border-2 border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-bold py-3 rounded-lg transition-colors">
            <Home className="w-5 h-5" /> Return to Dashboard
         </button>
      </div>
    </div>
  );
              }
