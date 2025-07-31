import React, { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiChevronDown, FiMapPin } from 'react-icons/fi';

const iconMap: { [key: string]: React.ElementType } = {
  country: FiGlobe,
  state: FiMapPin, // Assuming you might want an icon for state as well
  // Add more mappings here as needed
};

interface CustomSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any; // From useForm
  error: any; // From formState.errors
  currentValue: string; // To display selected value
  setValue: (name: string, value: string) => void; // To update form value
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, name, options, register, error, currentValue, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setValue(name, value);
    setIsOpen(false);
  };

  const displayValue = options.find(option => option.value === currentValue)?.label || options[0].label;

  return (
    <div className="relative" ref={selectRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 text-left relative"
      >
        {iconMap[name] && React.createElement(iconMap[name], { className: "h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" })}
        <span className={iconMap[name] ? 'pl-8' : ''}>{displayValue}</span>
        <FiChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="text-gray-900 dark:text-white relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {/* Hidden input for React Hook Form registration */}
      <input type="hidden" {...register(name)} value={currentValue} />
    </div>
  );
};

export default CustomSelect;