'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowLeft, Sparkles, Heart, AlertCircle } from 'lucide-react';
import PriceInput from './PriceInput';
import DiscountTable from './DiscountTable';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CalculatorPage: React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { translations, taxRate, language } = useSettings();
  const { toast } = useToast();

  const handleCalculate = () => {
    setError('');
    
    if (!price || parseFloat(price.replace(/,/g, '')) <= 0) {
      toast({
        title: language === 'ja' ? '入力エラー' : 'Input Error',
        description: translations.priceInputError,
        variant: "default",
      });
      return;
    }
    
    const numericPrice = parseFloat(price.replace(/,/g, ''));
    setCalculatedPrice(numericPrice);
    setIsCalculating(true);
  };

  const handleBack = () => {
    setIsCalculating(false);
    setPrice('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <AnimatePresence mode="wait">
        {!isCalculating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 shadow-md bg-white rounded-xl border border-pink-100 cute-bg cute-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-pink-500" />
                </div>
                <h2 className="text-xl font-medium text-pink-600">
                  {translations.appTitle}
                </h2>
              </div>
              <div className="relative mb-6 p-4 bg-pink-50/70 rounded-lg border border-pink-100">
                <p className="text-base text-zinc-600">
                  {translations.appDescription}
                </p>
                <motion.div 
                  className="absolute -top-2 -right-2 p-1.5 bg-pink-100 rounded-full"
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </motion.div>
              </div>
              <div className="space-y-5">
                <PriceInput 
                  value={price} 
                  onChange={setPrice} 
                  ref={inputRef}
                  placeholder={translations.pricePlaceholder}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full text-lg py-6"
                    size="lg"
                    onClick={handleCalculate}
                  >
                    <Sparkles className="mr-2 h-5 w-5" /> {translations.calculateButton}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 shadow-md bg-white rounded-xl border border-pink-100 cute-bg cute-shadow">
              <div className="text-center mb-6 py-4">
                <p className="text-base text-zinc-500">
                  {translations.currentPrice}
                </p>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative inline-block"
                >
                  <p className="text-3xl font-bold text-pink-600 mt-2">
                    {formatCurrency(calculatedPrice, translations.locale)}
                  </p>
                  <motion.div
                    className="absolute -top-3 -right-3"
                    animate={{ 
                      rotate: [0, 15, 0, -15, 0],
                      y: [0, -2, 0, -2, 0] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    <Heart className="h-6 w-6 text-pink-400" fill="#ffb7c9" />
                  </motion.div>
                </motion.div>
                <p className="text-sm text-zinc-400 mt-1">
                  {taxRate === 10 
                    ? translations.includingTax10 
                    : translations.includingTax8}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-lg py-5"
                  onClick={handleBack}
                >
 {translations.reenterPrice}
                </Button>
              </motion.div>
            </Card>

            <DiscountTable originalPrice={calculatedPrice} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CalculatorPage;