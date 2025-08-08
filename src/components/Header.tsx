"use client";
import { FiGlobe, FiBell, FiUser, FiSun, FiMoon, FiCpu } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative z-50 flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <FiCpu className="w-6 h-6" />
          </div>
          <h1 className="ml-3 text-xl font-bold">LearnMate AI</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <FiGlobe className="mr-1 w-6 h-6" />
          <span>English</span>
        </div>
        <FiBell className="mr-4 w-6 h-6" />
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className={`p-2 rounded-full focus:outline-none ${open
                  ? 'ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 ring-blue-500'
                  : ''
                  }`}
              >
                <FiUser className="w-6 h-6" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/edit-profile"
                          className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Edit Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/logout"
                          className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
        <button onClick={toggleTheme} className="ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
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