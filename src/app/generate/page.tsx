"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import CustomSelect from "@/components/CustomSelect";
import GradientButton from "@/components/common/GradientButton";

const GeneratePage = () => {
  const router = useRouter();
  const { setSettings } = useQuizStore();
  const [type, setType] = useState("Practice");
  const [difficulty, setDifficulty] = useState("Easy");
  const [format, setFormat] = useState("MCQ");

  const handleGenerateQuiz = () => {
    setSettings({ type, difficulty, format });
    router.push("/quiz");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Generate Quiz
        </h1>
        <div className="space-y-4">
          <CustomSelect
            label="Type"
            value={type}
            onChange={setType}
            options={["Practice", "Mock"]}
          />
          <CustomSelect
            label="Difficulty"
            value={difficulty}
            onChange={setDifficulty}
            options={["Easy", "Medium", "Hard"]}
          />
          <CustomSelect
            label="Format"
            value={format}
            onChange={setFormat}
            options={["MCQ", "Open-ended", "True/False"]}
          />
        </div>
        <GradientButton onClick={handleGenerateQuiz} className="w-full">
          Generate Quiz
        </GradientButton>
      </div>
    </div>
  );
};

export default GeneratePage;
