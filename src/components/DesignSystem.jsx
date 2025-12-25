import React from 'react';
import { LogOut, AlertCircle, CheckCircle } from 'lucide-react';

// --- LAYOUT COMPONENTS ---

// 1. PAGE CONTAINER (Includes the Navbar automatically)
export const PageContainer = ({ children, title, user, onLogout }) => (
  <div className="min-h-screen bg-emerald-50 font-sans text-gray-800">
    <nav className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center text-emerald-900 font-bold shadow-sm">
            CVSU
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide">CvSU Portal</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-wider">Examination System</p>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-xs text-emerald-200">Signed in as </p>
                <p className="font-bold text-sm">{user}</p>
             </div>
             <button onClick={onLogout} className="p-2 bg-emerald-800 rounded-md hover:bg-emerald-600 border border-emerald-600 transition-colors">
               <LogOut size={16} />
             </button>
          </div>
        )}
      </div>
    </nav>
    
    <div className="p-4 max-w-4xl mx-auto pb-20">
      {title && <h2 className="text-2xl font-bold text-emerald-900 mb-6">{title}</h2>}
      {children}
    </div>
  </div>
);

// 2. CARDS
export const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white p-5 rounded-xl shadow-sm border border-emerald-100 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all' : ''} ${className}`}
  >
    {children}
  </div>
);

// 3. BADGES (For "Locked", "Completed", etc.)
export const Badge = ({ children, variant = 'neutral' }) => {
  const styles = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error:   "bg-red-100 text-red-800 border-red-200",
    neutral: "bg-gray-100 text-gray-600 border-gray-200",
    info:    "bg-blue-100 text-blue-800 border-blue-200"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[variant]} inline-block`}>
      {children}
    </span>
  );
};

// 4. BUTTONS
export const Button = ({ children, onClick, variant = 'primary', className = "", disabled=false, fullWidth=false, type="button" }) => {
  const base = "py-2.5 px-4 rounded-lg font-bold transition-all active:scale-95 text-sm flex items-center justify-center gap-2";
  const width = fullWidth ? "w-full" : "";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm disabled:bg-emerald-300",
    secondary: "bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "bg-transparent text-gray-500 hover:text-emerald-700"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${width} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// 5. INPUTS
export const InputGroup = ({ label, type = "text", placeholder, value, onChange, icon }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-emerald-800 uppercase mb-1 ml-1">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={`w-full p-3 ${icon ? 'pl-10' : ''} border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-500 transition-all bg-white`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

// 6. TOGGLE SWITCH (For Login Page)
export const ToggleSwitch = ({ leftLabel, rightLabel, isRightActive, onToggle }) => (
  <div className="flex bg-emerald-100 p-1 rounded-lg mb-6 relative">
    <button
      type="button"
      onClick={() => onToggle(false)}
      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all z-10 ${
        !isRightActive ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-700 hover:text-emerald-900'
      }`}
    >
      {leftLabel}
    </button>
    <button
      type="button"
      onClick={() => onToggle(true)}
      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all z-10 ${
        isRightActive ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-700 hover:text-emerald-900'
      }`}
    >
      {rightLabel}
    </button>
  </div>
);

// 7. ALERTS (Notifications)
export const Alert = ({ type, message }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border-l-4 ${isError ? 'bg-red-50 border-red-500 text-red-900' : 'bg-yellow-50 border-yellow-500 text-yellow-900'}`}>
      {isError ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};
