"use client";
import { FiGlobe, FiBell, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <h1 className="ml-2 text-xl font-bold">LearnMate AI</h1>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <FiGlobe className="mr-1 w-6 h-6" />
          <span>English</span>
        </div>
        <FiBell className="mr-4 w-6 h-6" />
        <Link href="/login">
          <FiUser className="w-6 h-6" />
        </Link>
        <button onClick={toggleTheme} className="ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300">
          {theme === 'light' ? (
            <FiMoon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <FiSun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;