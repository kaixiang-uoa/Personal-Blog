'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { SortOrder } from '@/types';
import { validateSortOrder } from '@/utils';

interface SortOption {
  label: string;
  value: SortOrder;
}

interface SortSelectorProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
  className?: string;
}

const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange, className = '' }) => {
  const t = useTranslations('common');

  const options: SortOption[] = [
    { label: t('newestFirst'), value: 'latest' },
    { label: t('oldestFirst'), value: 'oldest' },
    { label: t('mostPopular'), value: 'popular' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 使用验证函数确保类型安全
    const validatedValue = validateSortOrder(e.target.value, 'latest');
    onChange(validatedValue);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="sort-selector" className="text-sm text-gray-300">
        {t('sortBy')}:
      </label>
      <select
        id="sort-selector"
        value={value}
        onChange={handleChange}
        className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;
