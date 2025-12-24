import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDb } from '../data/mockDb';
import { questions } from '../data/questions';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role: 'student' | 'admin' }
  const [scoresReleased, setScoresReleased] = useState(false);
  const [violations, setViolations] = useState(0);

  // Sync config on load
  useEffect(() => {
    const db = mockDb.getRaw();
    setScoresReleased(db.config.areScoresReleased);
  }, []);

  const login = (id, name) => {
    if (id === 'admin' && name === 'admin') {
      setUser({ id: 'admin', name: 'Instructor', role: 'admin' });
      return { success: true, role: 'admin' };
    }
    
    // Check if student already finished
    const student = mockDb.loginStudent(id, name);
    setUser({ ...student, role: 'student' });
    setViolations(student.violations);
    
    if (student.status === 'completed') {
      return { success: true, role: 'student', finished: true };
    }
    return { success: true, role: 'student', finished: false };
  };

  const logout = () => {
    setUser(null);
    setViolations(0);
  };

  const handleViolation = () => {
    if (user?.role !== 'student') return;
    
    const newCount = mockDb.logViolation(user.id);
    setViolations(newCount);
    
    // PDF Requirement: Auto-submit at 3 violations [cite: 32]
    if (newCount >= 3) {
      alert("❌ VIOLATION LIMIT REACHED (3/3)\n\nYour exam is being auto-submitted due to suspicious activity.");
      return true; // Return true to signal auto-submit
    }
    return false;
  };

  const submitQuiz = (finalAnswers) => {
    if (!user) return;
    
    // Calculate Score
    let score = 0;
    questions.forEach((q, index) => {
      if (finalAnswers[index] === q.correctAnswer) score++;
    });

    mockDb.submitExam(user.id, score, finalAnswers);
    
    // Update local user state
    setUser({ ...user, status: 'completed', score });
  };

  return (
    <QuizContext.Provider value={{ 
      user, 
      login, 
      logout, 
      scoresReleased, 
      setScoresReleased,
      violations,
      handleViolation,
      submitQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
