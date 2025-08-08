"use client";

import React, { useState } from 'react';
import TopicList from '@/components/subject-page/TopicList';
import QuizGenerator from '@/components/subject-page/QuizGenerator';
import QuestionDisplay from '@/components/subject-page/QuestionDisplay';
import AskAIInput from '@/components/subject-page/AskAIInput';
import Header from '@/components/Header';

interface SubjectPageProps {
  params: { subjectName: string };
}

const SubjectPage: React.FC<SubjectPageProps> = ({ params }) => {
  const { subjectName } = params;
  const decodedSubjectName = decodeURIComponent(subjectName);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleStartQuiz = () => {
    if (selectedTopic) {
      console.log(`Starting quiz for topic: ${selectedTopic}`);
      // Logic to start quiz, e.g., navigate to quiz page or open quiz modal
    }
  };

  const handleAskQuestion = () => {
    if (selectedTopic) {
      console.log(`Asking question about topic: ${selectedTopic}`);
      // Logic to populate AskAIInput or navigate to a specific AI chat
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-blue-gradient-from to-blue-gradient-to flex items-center justify-center text-white shadow-lg">
        <div className="text-center p-4">
          <h1 className="text-5xl font-extrabold capitalize mb-2 animate-fade-in-up">
            {decodedSubjectName}
          </h1>
          <p className="text-xl opacity-90 animate-fade-in-up animation-delay-200">
            Dive deep into the world of {decodedSubjectName}
          </p>
        </div>
      </section>

      <main className="container mx-auto p-4 py-8">
        {/* Quiz Generator Section (Top) */}
        <QuizGenerator subjectName={decodedSubjectName} />

        {/* Topics Section */}
        <div className="relative bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700 flex flex-col">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 border-b pb-3 border-gray-200 dark:border-gray-700">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Select a Topic</span>
          </h3>
          <div className="flex-grow">
            <TopicList subjectName={decodedSubjectName} onTopicSelect={setSelectedTopic} selectedTopic={selectedTopic} />
          </div>
          {selectedTopic && (
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={handleAskQuestion}
                className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-200"
              >
                Ask Question
              </button>
            </div>
          )}
        </div>

        {/* Questions and Ask AI */}
        <QuestionDisplay subjectName={decodedSubjectName} />
        <AskAIInput subjectName={decodedSubjectName} />
      </main>
    </div>
  );
};

export default SubjectPage;
