import { FiMapPin, FiUser, FiAward, FiEdit } from 'react-icons/fi';
import { FaFire, FaStar } from 'react-icons/fa';
import Link from 'next/link';

const ProfileHeader = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
    bio: 'A passionate lifelong learner dedicated to mastering web development and exploring the frontiers of AI technology.',
    profilePicture: null,
    stats: {
      courses: 12,
      points: 1800,
      certificates: 3,
      streak: 7,
    },
  };

  return (
    <div className="bg-gradient-to-r from-blue-gradient-from to-blue-gradient-to text-white shadow-lg rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0 mr-0 md:mr-8 mb-4 md:mb-0">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-4 border-white/50 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-white/50 shadow-md flex items-center justify-center bg-white/20">
              <FiUser className="w-20 h-20 text-white/70" />
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <Link href="/edit-profile" className="ml-3 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center">
              <FiEdit className="w-6 h-6 text-blue-200" />
            </Link>
          </div>
          <p className="text-lg text-blue-100">{user.email}</p>
          <div className="flex items-center justify-center md:justify-start mt-2 text-blue-100">
            <FiMapPin className="mr-2" />
            <span>{user.location}</span>
          </div>
          <p className="mt-4 text-blue-50 max-w-xl">
            {user.bio}
          </p>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/20 flex justify-around text-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <FiAward className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{user.stats.courses}</p>
            <p className="text-sm text-blue-200">Courses</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <FaStar className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{user.stats.points}</p>
            <p className="text-sm text-blue-200">Points</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <FaFire className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{user.stats.streak}</p>
            <p className="text-sm text-blue-200">Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
