"use client";

import React, { useState } from 'react';

interface QuestionDisplayProps {
  subjectName: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ subjectName }) => {
  // Placeholder for generated questions
  const questions = [
    `What are the fundamental concepts of ${subjectName}?`,
    `Can you explain the historical development of ${subjectName}?`,
    `How does ${subjectName} intersect with other disciplines?`,
    `What are the current challenges and future directions in ${subjectName}?`,
    `Provide an example of ${subjectName} in everyday life.`,
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleGetAnswer = () => {
    if (selectedQuestion) {
      console.log(`Getting answer for: ${selectedQuestion}`);
      // Logic to fetch and display the answer
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 pb-20 mb-6 border border-gray-200 dark:border-gray-700 relative">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 border-b pb-3 border-gray-200 dark:border-gray-700">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">Questions</span>
      </h3>
      <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
        {questions.map((question, index) => (
          <li
            key={index}
            onClick={() => setSelectedQuestion(question)}
            className={`flex items-start cursor-pointer
              ${selectedQuestion === question ? 'text-blue-500 font-medium' : ''}
            `}
          >
            <svg className="w-5 h-5 text-purple-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5L7 11h4l.867-3.5A1 1 0 1010 7zm-1 7a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd"></path>
            </svg>
            <span>{question}</span>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
        <button
          onClick={handleGetAnswer}
          disabled={!selectedQuestion}
          className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Get Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;