import { useCallback } from 'react';
import { fetchPageContent } from './services/api';
import { useContent } from './hooks/useContent';

import HeroSection, { HeroSkeleton } from './sections/HeroSection';
import FeaturesSection, { FeaturesSkeleton } from './sections/FeaturesSection';
import ErrorState from './components/ui/ErrorState';
import styles from './App.module.css';

function App() {
  const fetcher = useCallback(() => fetchPageContent(), []);
  const { data, isLoading, isError, error, retry } = useContent(fetcher);

  if (isError) {
    return (
      <main className={styles.centered}>
        <ErrorState message={error?.message} onRetry={retry} />
      </main>
    );
  }

  if (isLoading || !data) {
    return (
      <main>
        <HeroSkeleton />
        <FeaturesSkeleton />
      </main>
    );
  }

  return (
    <main>
      <HeroSection hero={data.hero} />
      <FeaturesSection
        features={{ ...data.featuresSection, carousel: data.carousel }}
      />
    </main>
  );
}

export default App;
