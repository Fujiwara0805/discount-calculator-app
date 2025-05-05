'use client';

import { useEffect, useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Layout from '@/components/Layout';
import CalculatorPage from '@/components/CalculatorPage';
import { useSearchParams } from 'next/navigation';

// SearchParamsを取得するためのクライアントコンポーネント
function HomeContent() {
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
    <AnimatePresence>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Layout>
          <CalculatorPage />
        </Layout>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>読み込み中...</div>}>
        <HomeContent />
      </Suspense>
    </main>
  );
}