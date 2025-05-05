'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  jaTranslations, 
  enTranslations, 
  type Translations 
} from '@/lib/translations';

interface SettingsContextType {
  language: 'ja' | 'en';
  setLanguage: (language: 'ja' | 'en') => void;
  taxRate: 8 | 10;
  setTaxRate: (rate: 8 | 10) => void;
  translations: Translations;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');
  const [taxRate, setTaxRate] = useState<8 | 10>(10);
  const [translations, setTranslations] = useState<Translations>(jaTranslations);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    const storedTaxRate = localStorage.getItem('taxRate');

    if (storedLanguage) {
      setLanguage(storedLanguage as 'ja' | 'en');
    }

    if (storedTaxRate) {
      setTaxRate(parseInt(storedTaxRate) as 8 | 10);
    }
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setTranslations(language === 'ja' ? jaTranslations : enTranslations);
    localStorage.setItem('language', language);
  }, [language]);

  // Save tax rate to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('taxRate', taxRate.toString());
  }, [taxRate]);

  // Handle language setting
  const handleSetLanguage = (newLanguage: 'ja' | 'en') => {
    setLanguage(newLanguage);
  };

  // Handle tax rate setting
  const handleSetTaxRate = (newRate: number) => {
    setTaxRate(newRate as 8 | 10);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        taxRate,
        setTaxRate: handleSetTaxRate,
        translations,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};