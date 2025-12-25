import React, { useState, useEffect } from 'react';

const StudentQuizPage = ({ quiz, studentName, onComplete }) => {
  const [answers, setAnswers] = useState({});

  const handleOptionSelect = (qId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    // Calculate Score
    let score = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    // Save Result to "Fake Database" (LocalStorage)
    const resultData = {
      studentName,
      quizId: quiz.id,
      score,
      total: quiz.questions.length,
      released: false,
      timestamp: new Date().toISOString()
    };

    const existingResults = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
    existingResults.push(resultData);
    localStorage.setItem('cvsu_db_results', JSON.stringify(existingResults));

    onComplete();
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
        <p className="text-gray-500">Student: {studentName}</p>
      </div>

      <div className="space-y-8">
        {quiz.questions.map((q, index) => (
          <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">{index + 1}. {q.question}</h3>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(q.id, i)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    answers[q.id] === i 
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900' 
                      : 'bg-white border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 shadow-lg"
        >
          Submit Examination
        </button>
      </div>
    </div>
  );
};

export default StudentQuizPage;
