'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Layout from '@/components/Layout';
import CalculatorPage from '@/components/CalculatorPage';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const searchParams = useSearchParams();
  const skipSplash = searchParams.get('skipSplash') === 'true';

  useEffect(() => {
    // スキップパラメータがある場合はスプラッシュをスキップ
    if (skipSplash) {
      setShowSplash(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [skipSplash]);

  return (
    <main>
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <Layout>
            <CalculatorPage />
          </Layout>
        )}
      </AnimatePresence>
    </main>
  );
}