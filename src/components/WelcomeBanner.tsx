
import { FaGraduationCap, FaFire, FaStar } from 'react-icons/fa';

const WelcomeBanner = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Sarah! 👋</h2>
        <p className="text-blue-100">Ready to continue your learning journey today?</p>
        <div className="flex items-center mt-4">
          <div className="flex items-center mr-8">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <FaFire className="text-green-700 w-6 h-6" />
            </div>
            <div className="ml-2">
              <p className="font-bold">7 Day Streak</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
              <FaStar className="text-yellow-700 w-6 h-6" />
            </div>
            <div className="ml-2">
              <p className="font-bold">1,240 Points</p>
            </div>
          </div>
        </div>
      </div>
      <FaGraduationCap className="text-white w-24 h-24 opacity-25" />
    </div>
  );
};

export default WelcomeBanner;
