'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Calculator, Settings, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

const TabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { translations } = useSettings();

  const tabs = [
    {
      id: 'calculator',
      label: translations.calculator,
      icon: <Calculator size={20} />,
      path: '/',
    },
    {
      id: 'settings',
      label: translations.settings,
      icon: <Settings size={20} />,
      path: '/settings',
    },
  ];

  const handleTabClick = (path: string) => {
    // 設定画面から計算画面に遷移する場合は、スプラッシュをスキップするためのパラメータを追加
    if (pathname === '/settings' && path === '/') {
      router.push('/?skipSplash=true');
    } else {
      router.push(path);
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 safe-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <nav className="max-w-md mx-auto">
        <ul className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <li key={tab.id} className="relative flex-1">
                <button
                  onClick={() => handleTabClick(tab.path)}
                  className={`w-full py-3 flex flex-col items-center space-y-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-gray-500'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {tab.icon}
                  </motion.div>
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="h-3 w-3 text-pink-400 fill-pink-200" />
                    </motion.div>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="tab-line-indicator"
                      className="absolute bottom-0 h-0.5 w-1/2 bg-pink-500 rounded-t-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
};

export default TabBar;