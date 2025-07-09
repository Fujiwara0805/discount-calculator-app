'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { formatNumberWithCommas } from '@/lib/utils';
import { Coins } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value, onChange, placeholder = '価格を入力' }, ref) => {
    const [focused, setFocused] = useState(false);
    const { translations, language } = useSettings();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only numbers and limit to 10 digits
      const rawValue = e.target.value.replace(/[^\d]/g, '');
      if (rawValue.length <= 10) {
        // Format with commas while typing
        onChange(formatNumberWithCommas(rawValue));
      }
    };

    // Handle focusing and animation
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    return (
      <div className="relative">
        <div className="flex items-center mb-2 ml-1">
          <Coins className="w-5 h-5 mr-2 text-pink-400" />
          <span className="text-pink-600 font-medium">
            {translations.enterPrice}
          </span>
        </div>
        <motion.div
          animate={focused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative"
          whileTap={{ scale: 0.98 }}
        >
          <Input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`text-center text-base py-8 ${
              focused ? 'input-highlight' : ''
            } rounded-xl bg-pink-50/50`}
            inputMode="numeric"
            autoComplete="off"
            style={{ fontSize: '16px' }}
          />
          <motion.div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 font-medium px-2"
            style={{ fontSize: '16px' }}
            animate={{ y: focused ? -2 : 0 }}
            transition={{ duration: 0.2, type: "spring" }}
          >
            {language === 'ja' ? '円' : '¥'}
          </motion.div>
        </motion.div>
      </div>
    );
  }
);

PriceInput.displayName = 'PriceInput';

export default PriceInput;