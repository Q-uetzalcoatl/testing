import React, { useState, useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AlertOctagon, CheckCircle } from 'lucide-react';

export default function QuizRunner({ quiz, studentName, user, appId, db, onComplete, notify }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [violations, setViolations] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cheated, setCheated] = useState(false);

  useEffect(() => {
    const savedAns = localStorage.getItem(`cvsu_quiz_ans_${quiz.id}`);
    if (savedAns) setAnswers(JSON.parse(savedAns));
  }, [quiz.id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitting && !cheated) {
        const newCount = violations + 1;
        setViolations(newCount);
        
        if (newCount === 1) {
          notify("Warning (1/5): We noticed you switched tabs. You are being watched.", "warning");
        } else if (newCount === 3) {
          notify("CRITICAL WARNING (3/5): Further violations will result in automatic failure.", "error");
        } else if (newCount >= 5) {
          notify("VIOLATION (5/5): Cheating detected. Quiz Terminated.", "error");
          setCheated(true);
          submitQuiz(true); 
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [violations, isSubmitting, cheated]);

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [quiz.questions[currentQIndex].id]: option };
    setAnswers(newAnswers);
    localStorage.setItem(`cvsu_quiz_ans_${quiz.id}`, JSON.stringify(newAnswers));
  };

  const nextQuestion = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.ans) score++;
    });
    return score;
  };

  const submitQuiz = async (isCheater = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const finalScore = calculateScore();
    const status = isCheater ? 'cheated' : 'submitted';
    const violationsFinal = isCheater ? 5 : violations;

    try {
      if (user) {
        const userRef = doc(db, 'artifacts', appId, 'users', user.uid, 'attempts', quiz.id);
        await setDoc(userRef, {
          quizId: quiz.id,
          quizTitle: quiz.title,
          studentName: studentName,
          score: finalScore,
          total: quiz.questions.length,
          violations: violationsFinal,
          status: status,
          answers: answers,
          timestamp: serverTimestamp()
        });

        const ledgerId = `${user.uid}_${quiz.id}`;
        const ledgerRef = doc(db, 'artifacts', appId, 'public', 'data', 'class_results', ledgerId);
        await setDoc(ledgerRef, {
            uid: user.uid,
            studentName: studentName,
            quizId: quiz.id,
            quizTitle: quiz.title,
            score: finalScore,
            total: quiz.questions.length,
            violations: violationsFinal,
            status: status,
            timestamp: serverTimestamp()
        });
      }
      
      localStorage.setItem(`cvsu_quiz_status_${quiz.id}`, status);
      localStorage.removeItem(`cvsu_quiz_ans_${quiz.id}`); 
      onComplete();
    } catch (err) {
      console.error("Submission error", err);
      notify("Error submitting quiz. Check connection.", "error");
      setIsSubmitting(false);
    }
  };

  const currentQ = quiz.questions[currentQIndex];
  const progress = ((currentQIndex + 1) / quiz.questions.length) * 100;
  const isAnswerSelected = !!answers[currentQ.id];

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white rounded-t-xl p-4 flex justify-between items-center border-b border-emerald-100 shadow-sm">
         <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-800">{quiz.title}</span>
         </div>
         <div className="flex items-center gap-4">
             <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Q {currentQIndex + 1} of {quiz.questions.length}</div>
             {violations > 0 && (
                 <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
                    ${violations >= 3 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
                 `}>
                    <AlertOctagon className="w-3 h-3" /> Violations: {violations}/5
                 </div>
             )}
         </div>
      </div>

      <div className="w-full bg-emerald-100 h-2">
         <div className="bg-yellow-400 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="bg-white p-6 md:p-10 shadow-lg rounded-b-xl min-h-[400px] flex flex-col justify-between">
         <div>
            <h3 className="text-xl md:text-2xl font-bold text-emerald-900 mb-8 leading-relaxed">
              {currentQIndex + 1}. {currentQ.q}
            </h3>

            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    onDoubleClick={() => { handleAnswer(opt); nextQuestion(); }}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all flex items-center justify-between
                      ${isSelected 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md transform scale-[1.01]' 
                        : 'bg-white border-emerald-100 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300'}
                    `}
                  >
                    <span className="font-medium text-lg">{opt}</span>
                    {isSelected && <CheckCircle className="w-6 h-6 text-white" />}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-emerald-400 mt-4 text-center italic opacity-60">Tip: Double-click an answer to auto-advance</p>
         </div>

         <div className="mt-8 flex justify-end">
           {currentQIndex < quiz.questions.length - 1 ? (
             <button 
               onClick={nextQuestion}
               disabled={!isAnswerSelected}
               className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors
                 ${isAnswerSelected ? 'bg-yellow-400 hover:bg-yellow-500 text-emerald-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
               `}
             >
               Next Question
             </button>
           ) : (
             <button 
               onClick={() => submitQuiz(false)}
               className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg"
             >
               {isSubmitting ? 'Submitting...' : 'Finish Quiz'}
             </button>
           )}
         </div>
      </div>
    </div>
  );
                 }
