'use client';

import React from 'react';
import { ArrowLeft, Calculator, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSettingsPage = pathname === '/settings';

  // タイトルに対応するアイコンを取得
  const getTitleIcon = () => {
    if (pathname === '/') {
      return <Calculator className="h-6 w-6 text-pink-400" />;
    } else if (pathname === '/settings') {
      return <Settings className="h-6 w-6 text-pink-400" />;
    }
    return <Sparkles className="h-6 w-6 text-pink-400" />;
  };

  return (
    <motion.header
      className="sticky top-0 z-10 bg-gray-100/90 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {isSettingsPage && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="戻る"
            onClick={() => router.push('/')}
            className="text-pink-500"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        {!isSettingsPage && <div className="w-10" />}
        
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {getTitleIcon()}
          </motion.div>
          <h1 className="text-2xl font-medium text-pink-500">
            {title}
          </h1>
          <motion.div
            animate={{ 
              y: [0, -2, 0, -2, 0], 
              opacity: [1, 0.8, 1, 0.8, 1],
              scale: [1, 1.05, 1, 1.05, 1] 
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="text-pink-400 text-xl">✨</span>
          </motion.div>
        </motion.div>
        
        <div className="w-10" />
      </div>
    </motion.header>
  );
};

export default Header;