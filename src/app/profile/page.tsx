import Header from "@/components/Header";
import ProfileHeader from "@/components/ProfileHeader";
import LearningProgress from "@/components/LearningProgress";
import CourseHistory from "@/components/CourseHistory";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="p-8 max-w-7xl mx-auto">
        <ProfileHeader />
        <LearningProgress />
        <CourseHistory />
      </div>
    </div>
  );
};

export default ProfilePage;
