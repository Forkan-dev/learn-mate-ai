"use client";

import React, { useState } from 'react';
import GradientButton from '@/components/common/GradientButton';

interface AskAIInputProps {
  subjectName: string;
}

const AskAIInput: React.FC<AskAIInputProps> = ({ subjectName }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Asking AI about ${subjectName}: ${prompt}`);
    // In a real application, you would send this prompt to an AI API
    setPrompt('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 border-b pb-3 border-gray-200 dark:border-gray-700">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600">Ask AI about {subjectName}</span>
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Ask anything about ${subjectName}...`}
          className="flex-grow px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
        <GradientButton type="submit">
          Ask AI
        </GradientButton>
      </form>
    </div>
  );
};

export default AskAIInput;
