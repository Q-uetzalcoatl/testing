import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { PageContainer, Card, Button, InputGroup } from './DesignSystem';

const PasswordModal = ({ quiz, onSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === quiz.accessCode) {
      onSuccess();
    } else {
      setError('Incorrect access code. Please try again.');
      setPassword('');
    }
  };

  return (
    <PageContainer>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
          
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-3">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Enter Access Code</h3>
            <p className="text-sm text-gray-500 mt-1">
              Please enter the code for <strong>{quiz.title}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <InputGroup 
              label="Access Code"
              type="password"
              placeholder="Enter code provided by instructor"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {error && <p className="text-red-500 text-sm font-bold mb-4 text-center">{error}</p>}

            <div className="flex gap-3 mt-6">
              <Button type="button" onClick={onBack} variant="secondary" className="flex-1">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Start Quiz
              </Button>
            </div>
          </form>

        </Card>
      </div>
    </PageContainer>
  );
};

export default PasswordModal;
