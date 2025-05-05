'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Info, Globe, Percent } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    taxRate, 
    setTaxRate,
    translations 
  } = useSettings();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 rounded-xl border border-pink-100 dark:border-pink-900/20">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-pink-500 mr-2" />
            <h2 className="text-xl font-medium text-pink-600 dark:text-pink-300">
              {translations.language}
            </h2>
          </div>
          
          <RadioGroup
            value={language}
            onValueChange={(value) => setLanguage(value as 'ja' | 'en')}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 rounded hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors">
              <RadioGroupItem value="ja" id="lang-ja" className="h-5 w-5" />
              <Label htmlFor="lang-ja" className="cursor-pointer w-full text-lg">日本語</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors">
              <RadioGroupItem value="en" id="lang-en" className="h-5 w-5" />
              <Label htmlFor="lang-en" className="cursor-pointer w-full text-lg">English</Label>
            </div>
          </RadioGroup>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 rounded-xl border border-pink-100 dark:border-pink-900/20">
          <div className="flex items-center mb-4">
            <Percent className="h-6 w-6 text-pink-500 mr-2" />
            <h2 className="text-xl font-medium text-pink-600 dark:text-pink-300">
              {translations.taxSettings}
            </h2>
          </div>
          
          <RadioGroup
            value={taxRate.toString()}
            onValueChange={(value) => setTaxRate(parseInt(value) as 8 | 10)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 rounded hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors">
              <RadioGroupItem value="8" id="tax-8" className="h-5 w-5" />
              <Label htmlFor="tax-8" className="cursor-pointer w-full text-lg">
                {translations.taxRate8}
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors">
              <RadioGroupItem value="10" id="tax-10" className="h-5 w-5" />
              <Label htmlFor="tax-10" className="cursor-pointer w-full text-lg">
                {translations.taxRate10}
              </Label>
            </div>
          </RadioGroup>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="p-6 shadow-md bg-white dark:bg-zinc-900 rounded-xl border border-pink-100 dark:border-pink-900/20">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium text-pink-600 dark:text-pink-300">
                {translations.appInfo}
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 mt-1">
                {translations.version}: 1.0.0
              </p>
            </div>
            <Info className="h-6 w-6 text-pink-400" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;