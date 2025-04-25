"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface SortOption {
  label: string;
  value: string;
}

interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange, className = "" }) => {
  const t = useTranslations("common");

  const options: SortOption[] = [
    { label: t("newestFirst"), value: "publishedAt-desc" },
    { label: t("oldestFirst"), value: "publishedAt-asc" },
    { label: t("lastUpdated"), value: "updatedAt-desc" },
    { label: t("oldestUpdated"), value: "updatedAt-asc" },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="sort-selector" className="text-sm text-gray-300">
        {t("sortBy")}:
      </label>
      <select
        id="sort-selector"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;
