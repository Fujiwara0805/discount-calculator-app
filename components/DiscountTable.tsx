'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Percent, Tag, Sparkles, ArrowDown } from 'lucide-react';

interface DiscountTableProps {
  originalPrice: number;
}

// Generate discount percentages from 5% to 95% in 5% increments
const DISCOUNT_PERCENTAGES = Array.from({ length: 19 }, (_, i) => (i + 1) * 5).sort((a, b) => a - b);

const DiscountTable: React.FC<DiscountTableProps> = ({ originalPrice }) => {
  const { taxRate, translations } = useSettings();
  
  // Calculate price without tax
  const calculatePriceWithoutTax = (price: number) => {
    return Math.floor(price / (1 + taxRate / 100));
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (percent: number) => {
    const discountFactor = 1 - percent / 100;
    return Math.floor(originalPrice * discountFactor);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="p-4 shadow-md bg-white overflow-hidden rounded-xl border border-pink-100 cute-bg cute-shadow">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-pink-100 mr-2">
            <Tag className="h-5 w-5 text-pink-500" />
          </div>
          <h2 className="text-xl font-medium text-pink-600">
            {translations.discountTable}
          </h2>
        </div>
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, -3, 0, 3, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Sparkles className="h-5 w-5 text-pink-400" />
        </motion.div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-pink-50">
              <TableHead className="w-1/4 text-center p-3">
                <span className="flex items-center justify-center text-base">
                  <Percent className="h-4 w-4 mr-1 text-pink-500" />
                  {translations.discountRate}
                </span>
              </TableHead>
              <TableHead className="w-2/5 text-center p-3">
                <span className="flex items-center justify-center text-base">
                  {translations.priceWithTax}
                </span>
              </TableHead>
              <TableHead className="w-2/5 text-center p-3">
                <span className="flex items-center justify-center text-base">
                  {translations.priceWithoutTax}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody 
            variants={container} 
            initial="hidden" 
            animate="show"
          >
            {DISCOUNT_PERCENTAGES.map((percent) => {
              const discountedPrice = calculateDiscountedPrice(percent);
              const priceWithoutTax = calculatePriceWithoutTax(discountedPrice);
              return (
              <motion.tr 
                key={percent} 
                variants={item} 
                className="table-row-animate hover:bg-pink-50 relative overflow-hidden"
                whileHover={{ backgroundColor: 'rgba(255, 159, 181, 0.1)' }}
              >
                <TableCell className="text-center p-3">
                  <div className="discount-badge">
                    <span className="text-pink-500 font-medium">{percent}%</span>
                    <ArrowDown className="ml-1 h-3 w-3" />
                  </div>
                </TableCell>
                <TableCell className="text-center p-3 font-medium text-lg">
                  {formatCurrency(discountedPrice, translations.locale)}
                </TableCell>
                <TableCell className="text-center p-3 text-zinc-500">
                  {formatCurrency(priceWithoutTax, translations.locale)}
                </TableCell>
              </motion.tr>
            )})}
          </motion.tbody>
        </Table>
      </div>
      
      <p className="text-sm text-zinc-400 mt-4 text-center px-2">
        {taxRate === 10
          ? translations.taxCalculationInfo10 
          : translations.taxCalculationInfo8}
      </p>
    </Card>
  );
};

export default DiscountTable;