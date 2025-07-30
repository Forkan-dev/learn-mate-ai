
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { FiMail, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import { FaGraduationCap } from 'react-icons/fa'; // Import FaGraduationCap

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    router.push('/');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <FaGraduationCap className="text-blue-500 w-20 h-20 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">LearnMate AI</h1>
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-300" />
            <input
              type="text"
              id="email"
              placeholder="Email or Username"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-300" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
          Don't have an account? <Link href="/register" className="text-blue-600 hover:underline font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
