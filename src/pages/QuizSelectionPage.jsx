import React from 'react';
import { Lock, Unlock, ChevronRight } from 'lucide-react';
import { PageContainer, Card, Badge, Button } from '../components/DesignSystem';

const QuizSelectionPage = ({ studentName, quizzes, onSelectQuiz, onLogout }) => {
  return (
    <PageContainer user={studentName} onLogout={onLogout} title="Available Examinations">
      <div className="grid gap-4 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} onClick={() => onSelectQuiz(quiz.id)} className="relative group">
            <div className="flex justify-between items-start mb-2">
              <Badge variant={quiz.locked ? "neutral" : "success"}>
                {quiz.locked ? "Locked" : "Open"}
              </Badge>
              {!quiz.locked && <ChevronRight className="text-emerald-400" />}
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors">
              {quiz.title}
            </h3>
            <p className="text-sm text-gray-500">{quiz.questions.length} Questions • {quiz.timeLimit || "No"} mins</p>
            
            {quiz.locked && (
              <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center backdrop-blur-[1px] rounded-xl">
                <Lock className="text-gray-400" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default QuizSelectionPage;
