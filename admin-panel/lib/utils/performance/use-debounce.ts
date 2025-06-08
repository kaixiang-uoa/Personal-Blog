/**
 * useDebounce Hook
 * 
 * A custom hook that delays invoking a function until after a specified time has elapsed
 * since the last time the function was invoked.
 * 
 * Useful for optimizing performance by preventing excessive function calls.
 */
import { useEffect, useState } from 'react';

/**
 * Creates a debounced value that only updates after the specified delay
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes before the delay expires
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Creates a debounced function that delays invoking the provided function
 * 
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedFn = (...args: Parameters<T>): void => {
    // Clear any existing timeout
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timeout
    const newTimer = setTimeout(() => {
      fn(...args);
    }, delay);

    setTimer(newTimer);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedFn;
} 