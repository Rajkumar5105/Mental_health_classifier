import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className="mb-8">
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />
    </div>
    <div className="flex justify-between mt-2">
      <p className="text-sm font-medium text-indigo-600">
        Question {current + 1} of {total}
      </p>
      <p className="text-sm font-medium text-indigo-600">
        {Math.round(((current + 1) / total) * 100)}% Complete
      </p>
    </div>
  </div>
);