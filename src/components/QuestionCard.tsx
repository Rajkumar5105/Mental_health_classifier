import React from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: number) => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  selectedAnswer: number | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onPrevious,
  isFirst,
  isLast,
  isSubmitting,
  onSubmit,
  selectedAnswer,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
      {question.text}
    </h2>

    <div className="space-y-4">
      <button
        onClick={() => onAnswer(1)}
        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300
          ${selectedAnswer === 1
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
      >
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300
            ${selectedAnswer === 1
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
            }`}
          />
          <span className="text-lg">Yes</span>
        </div>
      </button>
      
      <button
        onClick={() => onAnswer(0)}
        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300
          ${selectedAnswer === 0
            ? 'border-red-500 bg-red-50 text-red-700'
            : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
          }`}
      >
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300
            ${selectedAnswer === 0
              ? 'border-red-500 bg-red-500'
              : 'border-gray-300'
            }`}
          />
          <span className="text-lg">No</span>
        </div>
      </button>
    </div>

    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="px-6 py-2 text-sm font-medium text-indigo-600 rounded-lg transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-indigo-50 active:bg-indigo-100"
      >
        Previous
      </button>
      {isLast && (
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium
            transition-all duration-300 transform hover:bg-indigo-700
            active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Submit Assessment'}
        </button>
      )}
    </div>
  </motion.div>
);