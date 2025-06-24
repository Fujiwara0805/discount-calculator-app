'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import Header from './Header';
import TabBar from './TabBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { translations, language } = useSettings();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // URLに基づいてタイトルを決定
  const getTitle = () => {
    if (pathname === '/') {
      return language === 'ja' ? '計算画面' : 'Calculator';
    } else if (pathname === '/settings') {
      return language === 'ja' ? '設定画面' : 'Settings';
    }
    return translations.appTitle;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title={getTitle()} />
      <motion.main
        className="flex-1 px-4 py-6 pb-24 max-w-md mx-auto w-full"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key={pathname}
      >
        {children}
      </motion.main>
      <TabBar />
    </div>
  );
};

export default Layout;