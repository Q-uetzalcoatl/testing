import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

// IMPORT YOUR NEW DESIGN SYSTEM
import { 
  PageContainer, 
  Card, 
  PageTitle, 
  PageSubtitle, 
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
      <Card className="mt-8">
        
        {/* Title Section */}
        <PageTitle>
          {isAdminMode ? 'Instructor Portal' : 'Student Entry'}
        </PageTitle>
        <PageSubtitle>
          {isAdminMode ? 'Manage quizzes and view results' : 'Sign in to start your examination'}
        </PageSubtitle>

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
            <Button type="submit" variant="primary">
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
