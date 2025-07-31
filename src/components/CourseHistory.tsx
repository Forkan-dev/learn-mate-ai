import { FiCheckCircle, FiCalendar } from 'react-icons/fi';

const CourseHistory = () => {
  const courses = [
    {
      title: 'Advanced React',
      date: '2024-05-20',
      description: 'Mastered advanced concepts including hooks, context, and performance optimization.',
    },
    {
      title: 'State Management with Redux',
      date: '2024-04-15',
      description: 'Learned to manage complex application state with Redux and middleware.',
    },
    {
      title: 'Introduction to TypeScript',
      date: '2024-03-10',
      description: 'Gained a solid foundation in TypeScript for building scalable and robust applications.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Course History</h2>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <div className="flex-shrink-0 mr-4">
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{course.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                <FiCalendar className="mr-2" />
                <span>Completed on {course.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHistory;