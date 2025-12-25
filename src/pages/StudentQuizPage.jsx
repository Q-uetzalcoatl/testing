import React, { useState } from 'react';
import { PageContainer, Card, Button } from '../components/DesignSystem';

const StudentQuizPage = ({ quiz, studentName, onComplete, notify }) => {
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length < quiz.questions.length) {
      notify("Please answer all questions!", "error");
      return;
    }
    
    // Save Result Logic
    const score = quiz.questions.reduce((acc, q) => 
      acc + (answers[q.id] === q.answer ? 1 : 0), 0);

    const result = {
      studentName,
      quizId: quiz.id,
      score,
      total: quiz.questions.length,
      answers,
      date: new Date().toISOString(),
      released: false
    };

    const existingResults = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
    localStorage.setItem('cvsu_db_results', JSON.stringify([...existingResults, result]));

    onComplete();
  };

  return (
    <PageContainer title={quiz.title} user={studentName}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {quiz.questions.map((q, index) => (
          <Card key={q.id}>
            <div className="flex gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <p className="font-medium text-gray-800 pt-1">{q.question}</p>
            </div>

            <div className="space-y-2 pl-11">
              {q.options.map((option) => (
                <label key={option} className={`block p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[q.id] === option ? 'border-emerald-500 bg-emerald-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${answers[q.id] === option ? 'border-emerald-600' : 'border-gray-400'}`}>
                      {answers[q.id] === option && <div className="w-2 h-2 bg-emerald-600 rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-700">{option}</span>
                  </div>
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={option}
                    onChange={() => handleOptionChange(q.id, option)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </Card>
        ))}

        <div className="pt-4 pb-8">
          <Button type="submit" fullWidth>Submit Examination</Button>
        </div>
      </form>
    </PageContainer>
  );
};

export default StudentQuizPage;
