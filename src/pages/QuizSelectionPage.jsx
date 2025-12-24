import React from 'react';
import { Lock, ChevronRight } from 'lucide-react';

export default function QuizSelectionPage({ onSelectQuiz, quizzes, studentName }) {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 bg-emerald-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {studentName}</h2>
            <p className="text-emerald-200">Select an active examination below to begin.</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <div className="w-64 h-64 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between" onClick={() => onSelectQuiz(quiz.id)}>
            <div>
                <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${quiz.type === 'multiple_choice' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                    {quiz.type === 'multiple_choice' ? 'MC' : 'TF'}
                </div>
                <Lock className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-600 mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-500">{quiz.questions.length} Questions • Locked</p>
            </div>
            
            <button className="mt-6 w-full py-3 rounded-lg bg-emerald-50 text-emerald-700 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                Enter Code <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
              }
