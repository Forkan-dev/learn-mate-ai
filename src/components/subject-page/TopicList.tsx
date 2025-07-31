"use client";

import React from 'react';

interface TopicListProps {
  subjectName: string;
  onTopicSelect: (topic: string) => void;
  selectedTopic: string | null;
}

const TopicList: React.FC<TopicListProps> = ({ subjectName, onTopicSelect, selectedTopic }) => {
  // Placeholder for topics related to the subject
  const topics = [
    `Introduction to ${subjectName}`,
    `Core Concepts of ${subjectName}`,
    `Advanced ${subjectName} Theories`,
    `Practical Applications of ${subjectName}`,
    `History and Evolution of ${subjectName}`,
    `Future Trends in ${subjectName}`,
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {topics.map((topic, index) => (
        <div
          key={index}
          onClick={() => onTopicSelect(topic)}
          className={`relative cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-between gap-2
            ${selectedTopic === topic
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          <span>{topic}</span>
        </div>
      ))}
    </div>
  );
};

export default TopicList;