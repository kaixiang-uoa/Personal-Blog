'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { SortOrder } from '@/types';
import { validateSortOrder } from '@/utils';

/**
 * Interface for sort option configuration
 * @interface SortOption
 * @property {string} label - Display label for the sort option
 * @property {SortOrder} value - Value of the sort option
 */
interface SortOption {
  label: string;
  value: SortOrder;
}

/**
 * Props interface for the SortSelector component
 * @interface SortSelectorProps
 * @property {SortOrder} value - Current selected sort order
 * @property {function} onChange - Callback function when sort order changes
 * @property {string} [className] - Optional additional CSS classes
 */
interface SortSelectorProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
  className?: string;
}

/**
 * SortSelector Component
 * 
 * A dropdown component for selecting the sort order of articles.
 * Supports internationalization and provides type-safe sort options.
 * 
 * @component
 * @example
 * ```tsx
 * <SortSelector
 *   value="latest"
 *   onChange={handleSortChange}
 *   className="custom-class"
 * />
 * ```
 * 
 * @param {SortSelectorProps} props - The component props
 * @returns {JSX.Element} A sort order selector component
 */
const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange, className = '' }) => {
  const t = useTranslations('common');

  // Define available sort options with translations
  const options: SortOption[] = [
    { label: t('newestFirst'), value: 'latest' },
    { label: t('oldestFirst'), value: 'oldest' },
    { label: t('mostPopular'), value: 'popular' },
  ];

  /**
   * Handle sort order change
   * Validates the selected value before updating
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Validate the sort value to ensure type safety
    const validatedValue = validateSortOrder(e.target.value, 'latest');
    onChange(validatedValue);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Sort label */}
      <label htmlFor="sort-selector" className="text-sm text-gray-300">
        {t('sortBy')}:
      </label>
      {/* Sort dropdown */}
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
