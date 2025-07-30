
const courses = [
  {
    name: 'Algebra Basics',
    subject: 'Mathematics',
    progress: 75,
  },
  {
    name: 'Solar System',
    subject: 'Science',
    progress: 40,
  },
];

const ContinueLearning = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Continue Learning</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        {courses.map((course) => (
          <div key={course.name} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{course.name}</p>
                <p className="text-gray-500 dark:text-gray-300">{course.subject}</p>
              </div>
              <p className="font-bold text-green-500">{course.progress}% Complete</p>
            </div>
            <div className="w-full h-2 mt-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <button className="mt-4 w-full py-2 text-white bg-blue-500 rounded-lg font-semibold">Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearning;
