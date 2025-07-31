import { FaGraduationCap, FaFire, FaStar } from 'react-icons/fa';

const WelcomeBanner = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-gradient-from to-blue-gradient-to text-white rounded-2xl shadow-lg flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, Sarah! 👋</h2>
        <p className="text-blue-100 mt-1">Ready to continue your learning journey today?</p>
        <div className="flex items-center mt-6">
          <div className="flex items-center mr-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <FaFire className="text-green-500 w-6 h-6" />
            </div>
            <div className="ml-3">
              <p className="font-bold text-xl">7 Day Streak</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <FaStar className="text-yellow-500 w-6 h-6" />
            </div>
            <div className="ml-3">
              <p className="font-bold text-xl">1,240 Points</p>
            </div>
          </div>
        </div>
      </div>
      <FaGraduationCap className="text-white/20 w-32 h-32 opacity-50 hidden md:block" />
    </div>
  );
};

export default WelcomeBanner;
