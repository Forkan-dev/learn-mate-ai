import Link from 'next/link';
import { FiBook, FiPenTool } from 'react-icons/fi';
import { FaFlask, FaLandmark, FaGraduationCap } from 'react-icons/fa';

const subjects = [
  {
    name: 'Mathematics',
    description: 'Numbers, equations, and problem solving',
    icon: <FiBook className="text-white w-10 h-10" />,
    color: 'blue',
  },
  {
    name: 'Science',
    description: 'Discover the wonders of our world',
    icon: <FaFlask className="text-white w-10 h-10" />,
    color: 'green',
  },
  {
    name: 'English',
    description: 'Reading, writing, and literature',
    icon: <FiPenTool className="text-white w-10 h-10" />,
    color: 'purple',
  },
  {
    name: 'History',
    description: 'Journey through time and cultures',
    icon: <FaLandmark className="text-white w-10 h-10" />,
    color: 'orange',
  },
];

const colorClasses = {
  blue: 'bg-gradient-to-r from-blue-gradient-from to-blue-gradient-to',
  green: 'bg-gradient-to-r from-green-gradient-from to-green-gradient-to',
  purple: 'bg-gradient-to-r from-purple-gradient-from to-purple-gradient-to',
  orange: 'bg-gradient-to-r from-orange-gradient-from to-orange-gradient-to',
};

const Subjects = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Explore Subjects</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject) => (
          <Link href={`/subject/${encodeURIComponent(subject.name)}`} key={subject.name}>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center h-full justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <div className={`w-24 h-24 ${colorClasses[subject.color]} rounded-full flex items-center justify-center`}>
                {subject.icon}
              </div>
              <h3 className="mt-4 font-bold text-gray-800 dark:text-white">{subject.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center text-sm">{subject.description}</p>
              <button className={`mt-4 w-full py-2 text-white dark:text-gray-800 ${colorClasses[subject.color]} rounded-lg font-semibold text-sm`}>
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