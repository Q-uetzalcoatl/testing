import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AlertTriangle, LogOut } from 'lucide-react';

// Import Data
import { QUIZZES } from './data/quizzes';

// Import Components
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import PasswordModal from './components/PasswordModal';
import QuizRunner from './components/QuizRunner';
import WaitingRoom from './components/WaitingRoom';
import AdminPanel from './components/AdminPanel';

// --- FIREBASE CONFIGURATION ---
// IMPORTANT: Replace this block with your own Firebase config object from your dashboard
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      // Paste your firebase config object here
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'cvsu-quiz-app';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('loading'); 
  const [studentName, setStudentName] = useState('');
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      // If we have a custom token (mostly for canvas environments), use it.
      // Otherwise use anonymous login.
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const savedName = localStorage.getItem('cvsu_student_name');
        const savedView = localStorage.getItem('cvsu_current_view');
        const savedQuizId = localStorage.getItem('cvsu_active_quiz');
        
        if (savedName) setStudentName(savedName);
        if (savedQuizId) setActiveQuizId(savedQuizId);

        if (savedName && savedName.toLowerCase() === 'admin') {
            setIsAdmin(true);
            setView('admin');
        } else if (savedView) {
            setView(savedView);
        } else {
            setView('login');
        }
      } else {
        setView('login');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (view !== 'loading') localStorage.setItem('cvsu_current_view', view);
    if (activeQuizId) localStorage.setItem('cvsu_active_quiz', activeQuizId);
  }, [view, activeQuizId]);

  const handleLogin = (name) => {
    if (!name.trim()) return;
    localStorage.setItem('cvsu_student_name', name);
    setStudentName(name);

    if (name.toLowerCase() === 'admin') {
      setIsAdmin(true);
      setView('admin');
    } else {
      setIsAdmin(false);
      setView('dashboard');
    }
  };

  const handleSelectQuiz = (quizId) => {
    setActiveQuizId(quizId);
    setView('quiz_password');
  };

  const handlePasswordSuccess = () => {
    const quizKey = `cvsu_quiz_status_${activeQuizId}`;
    const status = localStorage.getItem(quizKey);
    if (status === 'completed' || status === 'cheated') {
      setView('waiting');
    } else {
      setView('quiz');
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    setStudentName('');
    setActiveQuizId(null);
    setIsAdmin(false);
    setView('login');
    await signOut(auth);
    window.location.reload(); 
  };

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  if (view === 'loading') return <div className="min-h-screen flex items-center justify-center bg-emerald-50 text-emerald-800 font-bold">Loading CvSU System...</div>;

  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-900 font-sans selection:bg-yellow-200">
      {notification && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-xl border-l-4 animate-bounce
          ${notification.type === 'error' ? 'bg-red-100 border-red-500 text-red-900' : 'bg-yellow-100 border-yellow-500 text-yellow-900'}
        `}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">{notification.msg}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-lg shadow-sm">C</div>
           <div>
             <h1 className="text-lg font-bold leading-none">CvSU Portal</h1>
             <span className="text-xs text-emerald-200 opacity-80">Online Examination System</span>
           </div>
        </div>
        {studentName && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-emerald-200">Logged in as</span>
                <span className="font-bold text-white text-sm">{studentName}</span>
            </div>
            <button onClick={handleLogout} className="bg-emerald-800 hover:bg-emerald-900 p-2 rounded-lg transition-colors border border-emerald-600" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      <main className="container mx-auto p-4 md:p-8 flex flex-col items-center">
        {view === 'login' && <LoginScreen onLogin={handleLogin} />}
        {view === 'dashboard' && <Dashboard onSelectQuiz={handleSelectQuiz} quizzes={QUIZZES} studentName={studentName} />}
        {view === 'quiz_password' && <PasswordModal quiz={QUIZZES.find(q => q.id === activeQuizId)} onSuccess={handlePasswordSuccess} onBack={() => setView('dashboard')} />}
        {view === 'quiz' && (
          <QuizRunner 
            quiz={QUIZZES.find(q => q.id === activeQuizId)} 
            studentName={studentName} 
            user={user} 
            appId={appId}
            db={db}
            onComplete={() => setView('waiting')}
            notify={showNotification}
          />
        )}
        {view === 'waiting' && <WaitingRoom studentName={studentName} quizId={activeQuizId} appId={appId} db={db} user={user} onBack={() => setView('dashboard')} />}
        {view === 'admin' && <AdminPanel db={db} appId={appId} quizzes={QUIZZES} />}
      </main>
    </div>
  );
    }
