import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

import { 
  PageContainer, 
  Card, 
  Button, 
  InputGroup, 
  ToggleSwitch 
} from '../components/DesignSystem';

const LoginPage = ({ onLogin }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password && !isAdminMode) return; // Basic check
    
    // Auto-login logic for testing
    if (isAdminMode) {
      onLogin('admin');
    } else {
      const name = email ? email.split('@')[0] : "Student"; 
      onLogin(name); 
    }
  };

  return (
    <PageContainer>
      <Card className="mt-8 max-w-md mx-auto">
        
        {/* TITLE SECTION (Fixed: Using standard HTML instead of missing components) */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            {isAdminMode ? 'Instructor Portal' : 'Student Entry'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isAdminMode ? 'Manage quizzes and view results' : 'Sign in to start your examination'}
          </p>
        </div>

        {/* The Toggle Switch */}
        <ToggleSwitch 
          leftLabel="Student" 
          rightLabel="Instructor" 
          isRightActive={isAdminMode} 
          onToggle={setIsAdminMode} 
        />

        {/* The Form */}
        <form onSubmit={handleSubmit}>
          <InputGroup 
            label="Email Address" 
            placeholder="name@cvsu.edu.ph" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<User size={18} />}
          />

          <InputGroup 
            label="Password" 
            type="password"
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
          />

          <div className="mt-6">
            <Button type="submit" variant="primary" fullWidth>
              Sign In
            </Button>
          </div>
        </form>

      </Card>
      
      <p className="text-center text-xs text-emerald-600 mt-8 opacity-60">
        © 2025 Cavite State University - Bacoor Campus
      </p>
    </PageContainer>
  );
};

export default LoginPage;
