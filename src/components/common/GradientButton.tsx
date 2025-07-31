"use client";

import React from 'react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`inline-flex justify-center items-center py-3 px-6 border border-transparent rounded-full shadow-lg text-base font-medium text-white
        bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out
        ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GradientButton;
