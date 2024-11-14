import { useState } from 'react';
import { Question, Assessment } from './types';
import { questions as initialQuestions } from './questions';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { AssessmentResult } from './components/AssessmentResult';
import { submitAssessment } from './services/api';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (answer: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answer = answer;
    setQuestions(updatedQuestions);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (questions.some(q => q.answer === null)) {
      alert('Please answer all questions');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitAssessment(questions.map(q => q.answer));
      setAssessment(result);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred while processing your assessment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (assessment) {
    return <AssessmentResult assessment={assessment} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900 mb-3 animate-fade-in">
          Mental Health Classifier
        </h1>
        <p className="text-indigo-600 max-w-md mx-auto">
          Please take your time and answer each question honestly for the most accurate assessment
        </p>
      </div>
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <ProgressBar current={currentQuestion} total={questions.length} />
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === questions.length - 1}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          selectedAnswer={questions[currentQuestion].answer}
        />
      </div>
    </div>
  );
}

export default App;