import React from 'react';
import { Assessment } from '../types';
import { motion } from 'framer-motion';

interface AssessmentResultProps {
  assessment: Assessment;
}

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.8) return 'text-red-600 bg-red-50 border-red-200';
  if (confidence >= 0.6) return 'text-orange-600 bg-orange-50 border-orange-200';
  return 'text-yellow-600 bg-yellow-50 border-yellow-200';
};

const getSuggestions = (disorder: string): { title: string; items: string[] } => {
  const suggestions = {
    'Anxiety': {
      title: 'Suggestions for Managing Anxiety',
      items: [
        'Practice deep breathing exercises daily',
        'Limit caffeine and sugar intake',
        'Break tasks into smaller, manageable steps',
        'Exercise regularly, especially yoga or walking',
        'Consider Cognitive Behavioral Therapy (CBT)',
        'Try progressive muscle relaxation'
      ]
    },
    'Depression': {
      title: 'Suggestions for Managing Depression',
      items: [
        'Establish a consistent daily routine',
        'Maintain a healthy, nutrient-rich diet',
        'Engage in activities you once enjoyed',
        'Stay connected with supportive people',
        'Consider professional help or counseling',
        'Get regular exposure to sunlight'
      ]
    },
    'Loneliness': {
      title: 'Suggestions for Managing Loneliness',
      items: [
        'Join local clubs or online communities',
        'Volunteer for causes you care about',
        'Consider adopting a pet if feasible',
        'Reach out to old friends or family',
        'Practice self-care activities',
        'Join group activities or classes'
      ]
    },
    'Stress': {
      title: 'Suggestions for Managing Stress',
      items: [
        'Use to-do lists to prioritize tasks',
        'Practice meditation or mindfulness',
        'Exercise regularly to reduce stress hormones',
        'Set healthy boundaries in relationships',
        'Take regular breaks during work',
        'Share your concerns with trusted friends'
      ]
    },
    'Normal': {
      title: 'Suggestions for Maintaining Well-being',
      items: [
        'Maintain work-life balance',
        'Stay physically active',
        'Learn new skills or hobbies',
        'Practice gratitude daily',
        'Ensure quality sleep',
        'Nurture your relationships'
      ]
    }
  };

  return suggestions[disorder as keyof typeof suggestions] || suggestions['Normal'];
};

export const AssessmentResult: React.FC<AssessmentResultProps> = ({ assessment }) => {
  const suggestions = getSuggestions(assessment.disorder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 my-8"
      >
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-indigo-900 mb-6 text-center"
        >
          Assessment Result
        </motion.h2>

        <div className="space-y-6">
          <motion.div 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100"
          >
            <p className="text-lg text-indigo-900">
              Based on your responses, you may be experiencing:
            </p>
            <p className="text-3xl font-bold text-indigo-700 mt-3">
              {assessment.disorder}
            </p>
          </motion.div>

          <div className={`p-4 rounded-lg border ${getConfidenceColor(assessment.confidence)}`}>
            <p className="font-medium">
              Confidence Level: {Math.round(assessment.confidence * 100)}%
            </p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-6"
          >
            <div className="bg-white/50 rounded-lg p-6 border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                {suggestions.title}
              </h3>
              <ul className="space-y-3">
                {suggestions.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <p className="font-medium text-yellow-800 mb-2">Important Notice</p>
                <p className="text-sm text-yellow-700">
                  This is not a clinical diagnosis. If you're concerned about your mental health,
                  please consult with a qualified mental health professional.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="font-medium text-blue-800 mb-2">Need Support?</p>
                <p className="text-sm text-blue-700">
                  For immediate support, contact:<br />
                  National Crisis Hotline: <span className="font-semibold">988</span>
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-indigo-600 mt-8 p-4 border-t border-indigo-100"
            >
              <p className="text-lg font-medium">Thank you for completing the assessment.</p>
              <p className="text-sm mt-2">Have a wonderful day! Remember, taking care of your mental health is important.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};