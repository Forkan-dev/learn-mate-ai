import Header from '@/components/Header';
import EditProfileForm from '@/components/EditProfileForm';

const EditProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="p-8 max-w-7xl mx-auto">
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfilePage;
