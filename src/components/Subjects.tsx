
"use client";

import Link from 'next/link';
import { FiBook, FiPenTool } from 'react-icons/fi';
import { FaFlask, FaLandmark, FaGraduationCap, FaBookOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { set } from 'zod';


// const subjects = useState([])

const iconClasses = {
  FiBook: <FiBook className="text-white w-10 h-10" />,
  FaFlask: <FaFlask className="text-white w-10 h-10" />,
  GiAncientRuins: <FiPenTool className="text-white w-10 h-10" />,
  FaBookOpen: <FaBookOpen className="text-white w-10 h-10" />,
}
const colorOptions = ['blue', 'green', 'purple', 'orange'];
const colorClasses = {
  blue: 'bg-gradient-to-r from-blue-gradient-from to-blue-gradient-to',
  green: 'bg-gradient-to-r from-green-gradient-from to-green-gradient-to',
  purple: 'bg-gradient-to-r from-purple-gradient-from to-purple-gradient-to',
  orange: 'bg-gradient-to-r from-orange-gradient-from to-orange-gradient-to',
};

const Subjects = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch('/api/subjects', {
      method: 'GET',
    }).then((res) => res.json()).then((data) => {
      setSubjects(data.data)
      console.log(data.data)
      setLoading(false)
    })
  }, [])
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Explore Subjects</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject, index) => (
          <Link href={`/subject/${encodeURIComponent(subject.slug)}`} key={subject.slug}>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center h-full justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <div className={`w-24 h-24 ${colorClasses[colorOptions[index]]} rounded-full flex items-center justify-center`}>
                {iconClasses[subject.icon]}
              </div>
              <h3 className="mt-4 font-bold text-gray-800 dark:text-white">{subject.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center text-sm">{subject.description}</p>
              <button className={`mt-4 w-full py-2 text-white dark:text-gray-800 ${colorClasses[colorOptions[index]]} rounded-lg font-semibold text-sm`}>
                Start Learning
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subjects;