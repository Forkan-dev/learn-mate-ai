import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface QuizSettings {
  type: string;
  difficulty: string;
  format: string;
  subject: string;
  topic: string;
}

interface QuizStore {
  settings: QuizSettings;
  setSettings: (settings: QuizSettings) => void;
}

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      (set) => ({
        settings: {
          type: 'Practice',
          difficulty: 'Easy',
          format: 'MCQ',
          subject: 'Islamic Studies',
          topic: 'Science',
        },
        setSettings: (settings) => set({ settings }),
      }),
      { name: 'quiz-storage' } // name for the localStorage key
    ),
    { name: 'QuizStore' }
  )
);
