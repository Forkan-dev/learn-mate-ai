
import Header from '@/components/Header';
import WelcomeBanner from '@/components/WelcomeBanner';
import Subjects from '@/components/Subjects';
import ContinueLearning from '@/components/ContinueLearning';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="p-8 max-w-7xl mx-auto">
        <WelcomeBanner />
        <Subjects />
        <ContinueLearning />
      </main>
    </div>
  );
}
