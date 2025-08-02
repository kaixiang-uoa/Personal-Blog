'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  locale: string;
  initialSearch?: string;
}

/**
 * SearchBar Component
 * 
 * A search input component with debounced search functionality
 * 
 * @component
 * @param {SearchBarProps} props - Component props
 * @returns {JSX.Element} Search input with debounced functionality
 */
export default function SearchBar({ locale, initialSearch = '' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearch);

  // Debounced search handler with ref to store timeout
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  const debouncedSearch = useCallback((searchValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const urlParams = new URLSearchParams(searchParams.toString());
      if (searchValue.trim()) {
        urlParams.set('search', searchValue);
      } else {
        urlParams.delete('search');
      }
      urlParams.delete('page'); // Reset to page 1 when searching
      router.push(`/${locale}?${urlParams.toString()}`);
    }, 300); // 300ms delay
  }, [searchParams, router, locale]);

  // Effect to update searchInput when URL parameters change
  useEffect(() => {
    setSearchInput(initialSearch);
  }, [initialSearch]);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="w-full pl-8"
        value={searchInput}
        onChange={(e) => {
          const searchValue = e.target.value;
          setSearchInput(searchValue);
          debouncedSearch(searchValue);
        }}
      />
    </div>
  );
} 