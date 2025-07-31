"use client";

import React from 'react';
import GradientButton from '@/components/common/GradientButton';

interface QuizGeneratorProps {
  subjectName: string;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ subjectName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600">Generate Quiz</span>
      </h3>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Test your knowledge! Generate a custom quiz based on the topics in {subjectName}.
      </p>
      <GradientButton className="w-full sm:w-auto px-8 py-3">
        Start Quiz
      </GradientButton>
    </div>
  );
};

export default QuizGenerator;
