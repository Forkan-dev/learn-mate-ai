import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Here you would typically clear the user's session or token.
    // For this example, we'll just redirect to the login page.
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <p className="text-gray-900 dark:text-gray-100">Logging out...</p>
    </div>
  );
};

export default LogoutPage;
