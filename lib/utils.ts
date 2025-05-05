import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with commas as thousand separators
 */
export function formatNumberWithCommas(value: string): string {
  // First remove any existing commas
  const cleanValue = value.replace(/,/g, '');
  
  // Then add commas for thousands
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format a number as currency based on locale
 */
export function formatCurrency(value: number, locale = 'ja-JP'): string {
  // 常に日本円記号で表示するように修正
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'JPY',  // 常にJPYを使用
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Calculate price with tax
 */
export function calculatePriceWithTax(price: number, taxRate: number): number {
  return price * (1 + taxRate / 100);
}

/**
 * Calculate price without tax
 */
export function calculatePriceWithoutTax(price: number, taxRate: number): number {
  return price / (1 + taxRate / 100);
}

/**
 * Calculate discounted price
 */
export function calculateDiscountedPrice(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}