"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import GradientButton from '@/components/common/GradientButton';
import CustomQuizSelect from './CustomQuizSelect';
import { FiLock } from 'react-icons/fi';

interface QuizGeneratorProps {
  subjectName: string;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ subjectName }) => {
  const router = useRouter();
  const { setSettings } = useQuizStore();
  const [difficulty, setDifficulty] = useState('easy');
  const [questionFormat, setQuestionFormat] = useState('mcq');
  const [quizType, setQuizType] = useState('practice');

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const questionFormatOptions = [
    { value: 'mcq', label: 'Multiple Choice (MCQ)' },
    { value: 'true-false', label: 'True/False' },
    { value: 'open-ended', label: 'Open Ended' },
  ];

  const quizTypeOptions = [
    { value: 'practice', label: 'Practice' },
    { value: 'mock', label: 'Mock', disabled: true, icon: FiLock },
    { value: 'timed', label: 'Timed', disabled: true, icon: FiLock },
  ];

  const handleGenerateQuiz = () => {
    setSettings({ type: quizType, difficulty, format: questionFormat, subject: subjectName, topic: subjectName });
    router.push('/quiz');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 mb-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">Generate Quiz</span>
      </h3>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
        Test your knowledge! Generate a custom quiz based on the topics in {subjectName}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
          <CustomQuizSelect
            options={difficultyOptions}
            value={difficulty}
            onChange={setDifficulty}
          />
        </div>
        <div>
          <label htmlFor="questionFormat" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Question Format</label>
          <CustomQuizSelect
            options={questionFormatOptions}
            value={questionFormat}
            onChange={setQuestionFormat}
          />
        </div>
        <div>
          <label htmlFor="quizType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <CustomQuizSelect
            options={quizTypeOptions}
            value={quizType}
            onChange={setQuizType}
          />
        </div>
      </div>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
        <FiLock className="inline h-4 w-4 mr-1" />
        Mock and Timed quizzes are a Premium feature.
      </p>
      <div className="text-center">
        <GradientButton
          onClick={handleGenerateQuiz}
          className="w-full sm:w-auto px-10 py-4 text-lg font-semibold"
        >
          Start Quiz
        </GradientButton>
      </div>
    </div>
  );
};

export default QuizGenerator;
