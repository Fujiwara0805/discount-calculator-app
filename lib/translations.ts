export interface Translations {
  locale: string;
  appTitle: string;
  calculator: string;
  settings: string;
  enterPrice: string;
  pricePlaceholder: string;
  currentPrice: string;
  includingTax10: string;
  includingTax8: string;
  discountTable: string;
  discountRate: string;
  priceWithTax: string;
  priceWithoutTax: string;
  off: string;
  taxCalculationInfo10: string;
  taxCalculationInfo8: string;
  language: string;
  taxSettings: string;
  taxRate8: string;
  taxRate10: string;
  appInfo: string;
  version: string;
  appDescription: string;
  calculateButton: string;
  reenterPrice: string;
  priceInputError: string;
  calculatorScreenTitle: string;
  settingsScreenTitle: string;
  currency: string;
}

export const jaTranslations: Translations = {
  locale: 'ja-JP',
  appTitle: '割引計算アプリ',
  calculator: '計算',
  settings: '設定',
  enterPrice: '金額を入力してください',
  pricePlaceholder: '価格を入力',
  currentPrice: '現在の価格',
  includingTax10: '税込(10%)',
  includingTax8: '税込(8%)',
  discountTable: '割引表',
  discountRate: '割引率',
  priceWithTax: '税込価格',
  priceWithoutTax: '税抜価格',
  off: 'オフ',
  taxCalculationInfo10: '※価格は消費税10%で計算されています',
  taxCalculationInfo8: '※価格は消費税8%で計算されています',
  language: '言語',
  taxSettings: '消費税設定',
  taxRate8: '消費税率 8%',
  taxRate10: '消費税率 10%',
  appInfo: 'アプリ情報',
  version: 'バージョン',
  appDescription: '税込価格を入力することで割引価格を計算できます。税込・税抜両方の価格を確認することができ、消費税率の切り替えにも対応しています。',
  calculateButton: '計算する',
  reenterPrice: '価格を再入力',
  priceInputError: '価格を入力してください',
  calculatorScreenTitle: '計算画面',
  settingsScreenTitle: '設定画面',
  currency: '円'
};

export const enTranslations: Translations = {
  locale: 'en-US',
  appTitle: 'Discount Calculator',
  calculator: 'Calculator',
  settings: 'Settings',
  enterPrice: 'Please enter amount',
  pricePlaceholder: 'Enter price',
  currentPrice: 'Current Price',
  includingTax10: 'Including 10% tax',
  includingTax8: 'Including 8% tax',
  discountTable: 'Discount Table',
  discountRate: 'Discount',
  priceWithTax: 'Price with tax',
  priceWithoutTax: 'Price without tax',
  off: 'off',
  taxCalculationInfo10: '* Prices are calculated with 10% consumption tax',
  taxCalculationInfo8: '* Prices are calculated with 8% consumption tax',
  language: 'Language',
  taxSettings: 'Tax Settings',
  taxRate8: 'Tax rate 8%',
  taxRate10: 'Tax rate 10%',
  appInfo: 'App Information',
  version: 'Version',
  appDescription: 'Enter the tax-inclusive price to calculate the discount price. You can check both tax-inclusive and tax-exclusive prices, and switch between different consumption tax rates.',
  calculateButton: 'Calculate',
  reenterPrice: 'Re-enter price',
  priceInputError: 'Please enter a price',
  calculatorScreenTitle: 'Calculator',
  settingsScreenTitle: 'Settings',
  currency: '円'
};