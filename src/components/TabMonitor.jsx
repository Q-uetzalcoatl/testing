import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

function TabMonitor({ onAutoSubmit }) {
  const { handleViolation } = useQuiz();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const shouldSubmit = handleViolation();
        if (shouldSubmit) {
          onAutoSubmit();
        } else {
          alert("⚠️ WARNING: Tab Switching Detected!\n\nThis incident has been logged. 3 strikes will result in auto-submission.");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleViolation, onAutoSubmit]);

  return null; // Invisible component
}

export default TabMonitor;
