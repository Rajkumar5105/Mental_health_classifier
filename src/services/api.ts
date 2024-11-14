import { Assessment } from '../types';

// Mock API response for StackBlitz demo
export const submitAssessment = async (answers: (number | null)[]): Promise<Assessment> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple mock logic to determine disorder based on answers
  const yesCount = answers.filter(a => a === 1).length;
  const total = answers.length;
  const ratio = yesCount / total;
  
  let disorder: string;
  let confidence: number;
  
  if (ratio > 0.75) {
    disorder = 'Anxiety';
    confidence = 0.85;
  } else if (ratio > 0.5) {
    disorder = 'Depression';
    confidence = 0.75;
  } else if (ratio > 0.25) {
    disorder = 'Stress';
    confidence = 0.65;
  } else {
    disorder = 'Normal';
    confidence = 0.9;
  }
  
  return { disorder, confidence };
};