import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QUIZZES } from './data/quizzes';
import { Alert } from './components/DesignSystem';

// Import Pages
import LoginPage from './pages/LoginPage';
import QuizSelectionPage from './pages/QuizSelectionPage';
import StudentQuizPage from './pages/StudentQuizPage';
import ResultPendingPage from './pages/ResultPendingPage';
import AdminDashboard from './pages/AdminDashboard';
import PasswordModal from './components/PasswordModal';

export default function App() {
  const [view, setView] = useState('login'); 
  const [studentName, setStudentName] = useState('');
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedName = localStorage.getItem('cvsu_student_name');
    const savedView = localStorage.getItem('cvsu_current_view');
    const savedQuizId = localStorage.getItem('cvsu_active_quiz');
    
    if (savedName) setStudentName(savedName);
    if (savedQuizId) setActiveQuizId(savedQuizId);

    if (savedName && savedName.toLowerCase() === 'admin') {
        setView('admin');
    } else if (savedView) {
        setView(savedView);
    }
  }, []);

  // Save State
  useEffect(() => {
    if (view !== 'login') localStorage.setItem('cvsu_current_view', view);
    if (activeQuizId) localStorage.setItem('cvsu_active_quiz', activeQuizId);
  }, [view, activeQuizId]);

  const handleLogin = (name) => {
    if (!name) return;
    localStorage.setItem('cvsu_student_name', name);
    setStudentName(name);

    if (name.toLowerCase() === 'admin') {
      setView('admin');
    } else {
      setView('dashboard');
    }
  };

  const handleSelectQuiz = (quizId) => {
    const allResults = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
    const existingAttempt = allResults.find(r => r.studentName === studentName && r.quizId === quizId);

    if (existingAttempt) {
      if (existingAttempt.released) {
        setActiveQuizId(quizId);
        setView('waiting');
      } else {
        alert("You have already taken this quiz. Please wait for the instructor to release your score.");
      }
    } else {
      setActiveQuizId(quizId);
      setView('quiz_password');
    }
  };

  const handlePasswordSuccess = () => {
    const allResults = JSON.parse(localStorage.getItem('cvsu_db_results') || '[]');
    const existing = allResults.find(r => r.studentName === studentName && r.quizId === activeQuizId);

    if (existing) {
       alert("You have already taken this quiz. Please wait for the instructor to release your score.");
       setView('dashboard');
    } else {
      setView('quiz');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setStudentName('');
    setActiveQuizId(null);
    setView('login');
    window.location.reload(); 
  };

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <BrowserRouter>
      {/* Global Notification */}
      {notification && <Alert type={notification.type} message={notification.msg} />}

      {/* Pages */}
      {view === 'login' && <LoginPage onLogin={handleLogin} />}
      
      {view === 'dashboard' && (
        <QuizSelectionPage 
          studentName={studentName}
          quizzes={QUIZZES} 
          onSelectQuiz={handleSelectQuiz}
          onLogout={handleLogout}
        />
      )}

      {view === 'quiz_password' && (
        <PasswordModal 
          quiz={QUIZZES.find(q => q.id === activeQuizId)} 
          onSuccess={handlePasswordSuccess} 
          onBack={() => setView('dashboard')} 
        />
      )}

      {view === 'quiz' && (
        <StudentQuizPage 
          quiz={QUIZZES.find(q => q.id === activeQuizId)} 
          studentName={studentName} 
          onComplete={() => setView('waiting')}
          notify={showNotification}
        />
      )}

      {view === 'waiting' && (
        <ResultPendingPage 
          studentName={studentName} 
          quizId={activeQuizId} 
          onBack={() => setView('dashboard')}
          onLogout={handleLogout}
        />
      )}

      {view === 'admin' && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </BrowserRouter>
  );
}
