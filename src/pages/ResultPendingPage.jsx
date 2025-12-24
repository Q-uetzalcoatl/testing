import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';

function ResultPendingPage() {
  const { user, scoresReleased, logout } = useQuiz();

  // If instructor released scores, show the actual score
  if (scoresReleased) {
    const percentage = Math.round((user.score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Scores Released!</h1>
          <p className="text-slate-600 mb-6">Here is your final performance.</p>
          
          <div className="bg-slate-100 p-6 rounded-lg mb-6">
            <p className="text-sm uppercase text-slate-500 font-bold">Final Score</p>
            <p className="text-5xl font-bold text-slate-800 my-2">{user.score} / {questions.length}</p>
            <p className="text-green-600 font-medium">{percentage}% Accuracy</p>
          </div>
          
          <button onClick={logout} className="text-indigo-600 hover:underline">Log Out</button>
        </div>
      </div>
    );
  }

  // Otherwise, show the "Pending" message
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Submission Locked</h1>
        <p className="text-slate-600 mb-6">
          Your answers have been submitted securely. 
          <br/><br/>
          <strong>Please wait for the instructor to release the results.</strong>
        </p>
        <div className="animate-pulse bg-indigo-100 text-indigo-700 py-2 px-4 rounded-full text-sm font-semibold inline-block">
          Status: Grading in Progress...
        </div>
      </div>
    </div>
  );
}

export default ResultPendingPage;
