"use client";
import { useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import GradientButton from "@/components/common/GradientButton";
import { motion, AnimatePresence } from "framer-motion";
import { FiTag, FiBarChart2, FiLayout } from 'react-icons/fi';
import Header from "@/components/Header";

const sampleQuestions = {
  "mcq": [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
  ],
  "open-ended": [
    {
      question: "Explain the theory of relativity.",
      answer: "A detailed explanation of the theory of relativity.",
    },
  ],
  "true-false": [
    {
      question: "The sky is blue.",
      answer: "True",
    },
    {
      question: "Water boils at 90 degrees Celsius.",
      answer: "False",
    },
  ],
};

const QuizPage = () => {
  const { settings } = useQuizStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = sampleQuestions[settings.format as keyof typeof sampleQuestions] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-2xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Quiz Results</h1>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-white mb-3">{q.question}</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-3">Your answer:</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${userAnswers[index] === q.answer
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        }`}>
                      {userAnswers[index]}
                    </span>
                  </div>
                  {userAnswers[index] !== q.answer && (
                    <div className="flex items-center mt-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-3">Correct answer:</p>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        {q.answer}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-4 shadow-sm">
            <div className="flex justify-around items-center">
              <div className="text-center flex flex-col items-center">
                <FiTag className="w-5 h-5 mb-1 text-blue-500" />
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Type</p>
                <p className="text-xs font-semibold text-gray-800 dark:text-white">{settings.type}</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <FiBarChart2 className="w-5 h-5 mb-1 text-purple-500" />
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Difficulty</p>
                <p className="text-xs font-semibold text-gray-800 dark:text-white">{settings.difficulty}</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <FiLayout className="w-5 h-5 mb-1 text-green-500" />
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Format</p>
                <p className="text-xs font-semibold text-gray-800 dark:text-white">{settings.format}</p>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center text-gray-900 dark:text-white mb-4">
                <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-700 mb-6">
                <p className="font-semibold text-gray-900 dark:text-white text-lg">{currentQuestion?.question}</p>
              </div>
              <div className="space-y-4">
                {settings.format === "mcq" &&
                  currentQuestion?.options?.map((option: string) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${userAnswers[currentQuestionIndex] === option ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                      {option}
                    </button>
                  ))}
                {settings.format === "open-ended" && (
                  <textarea
                    className="w-full p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    onChange={(e) => handleAnswer(e.target.value)}
                    value={userAnswers[currentQuestionIndex] || ""}
                    placeholder="Type your answer here..."
                  />
                )}
                {settings.format === "true-false" && (
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => handleAnswer("True")}
                      className={`w-full p-6 rounded-lg transition-colors text-lg font-semibold ${userAnswers[currentQuestionIndex] === "True" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                      True
                    </button>
                    <button
                      onClick={() => handleAnswer("False")}
                      className={`w-full p-6 rounded-lg transition-colors text-lg font-semibold ${userAnswers[currentQuestionIndex] === "False" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                      False
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-6">
            <GradientButton onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </GradientButton>
            {currentQuestionIndex < questions.length - 1 ? (
              <GradientButton onClick={handleNext}>
                Next
              </GradientButton>
            ) : (
              <GradientButton onClick={handleSubmit}>
                Submit Quiz
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;