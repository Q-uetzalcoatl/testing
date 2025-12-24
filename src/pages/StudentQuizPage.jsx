import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';
import TabMonitor from '../components/TabMonitor';

function StudentQuizPage() {
  const { submitQuiz } = useQuiz();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 Minutes (600s)

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (optionIndex) => {
    setAnswers({ ...answers, [currentQ]: optionIndex });
  };

  const handleSubmit = () => {
    // Convert answers object to array
    const finalAnswers = questions.map((_, idx) => answers[idx] ?? -1);
    submitQuiz(finalAnswers);
    navigate('/pending');
  };

  // Format Timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <TabMonitor onAutoSubmit={handleSubmit} />
      
      {/* Timer Bar */}
      <div className="sticky top-0 bg-white shadow-sm p-4 z-10 flex justify-center">
        <div className={`text-xl font-mono font-bold px-6 py-2 rounded-full ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-indigo-50 text-indigo-700'}`}>
          ⏰ Time Remaining: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 px-4">
        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6 flex justify-between items-center text-sm text-slate-500">
            <span>Question {currentQ + 1} of {questions.length}</span>
            <span>Progress: {Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-8">
            {questions[currentQ].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQ] === idx 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <span className="mr-3 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="px-6 py-2 text-slate-600 disabled:opacity-50"
            >
              Previous
            </button>
            
            {currentQ === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-bold"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQ(prev => Math.min(questions.length - 1, prev + 1))}
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-2 rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentQuizPage;
