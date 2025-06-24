'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: 'spring',
          stiffness: 200,
        }}
        className="flex flex-col items-center"
      >
        <div className="bg-pink-500 p-5 rounded-full mb-4 shadow-lg shadow-pink-200">
          <Calculator className="h-12 w-12 text-white" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-2xl font-bold text-pink-500 mb-2"
        >
          割引計算アプリ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="text-zinc-500 text-sm"
        >
          Discount Calculator
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;