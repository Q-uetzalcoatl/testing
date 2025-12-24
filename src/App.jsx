import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider, useQuiz } from './context/QuizContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import StudentQuizPage from './pages/StudentQuizPage';
import ResultPendingPage from './pages/ResultPendingPage';
import AdminDashboard from './pages/AdminDashboard';

// Route Guards
function PrivateRoute({ children, role }) {
  const { user } = useQuiz();
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/quiz" element={
          <PrivateRoute role="student">
            <StudentQuizPage />
          </PrivateRoute>
        } />
        
        <Route path="/pending" element={
          <PrivateRoute role="student">
            <ResultPendingPage />
          </PrivateRoute>
        } />
        
        <Route path="/admin" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <AppContent />
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;
