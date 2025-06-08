/**
 * useMemoCompare Hook
 * 
 * A custom hook that memoizes a value and only updates it if the comparison function
 * determines that the next value is different from the previous one.
 * 
 * Useful for optimizing renders when working with objects or complex values
 * that maintain referential identity despite having the same content.
 */
import { useEffect, useRef } from 'react';

/**
 * Memoizes a value using a custom comparison function
 * 
 * @param value - The value to memoize
 * @param compare - Function that compares previous and next value
 * @returns Memoized value that only changes when the comparison returns false
 */
export function useMemoCompare<T>(
  value: T,
  compare: (prev: T | undefined, next: T) => boolean
): T {
  // Ref for storing previous value
  const previousRef = useRef<T | undefined>(undefined);
  // Ref for storing the value that we return
  const currentRef = useRef<T>(value);

  useEffect(() => {
    // If previous value is undefined (first run) or
    // comparison function returns false (values are different)
    if (previousRef.current === undefined || !compare(previousRef.current, value)) {
      // Update currentRef to the new value
      currentRef.current = value;
    }
    
    // Update previousRef to the new value regardless,
    // so we can compare it in the next run
    previousRef.current = value;
  }, [value, compare]);

  return currentRef.current;
}

/**
 * Deep comparison of objects for use with useMemoCompare
 * 
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @returns True if objects are equal in content, false otherwise
 */
export function deepCompare(obj1: unknown, obj2: unknown): boolean {
  // If either is null/undefined, compare directly
  if (obj1 === null || obj2 === null || obj1 === undefined || obj2 === undefined) {
    return obj1 === obj2;
  }
  
  // Primitive value comparison
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }
  
  // If either is null after the previous check (typeof null === 'object')
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  
  // Check if they're arrays
  const isArray1 = Array.isArray(obj1);
  const isArray2 = Array.isArray(obj2);
  
  // One is array, one is not
  if (isArray1 !== isArray2) {
    return false;
  }
  
  // Cast to objects since we know they're objects or arrays at this point
  const objA = obj1 as Record<string, unknown>;
  const objB = obj2 as Record<string, unknown>;
  
  // Both are objects or arrays, compare recursively
  const keys1 = Object.keys(objA);
  const keys2 = Object.keys(objB);
  
  // Different number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  // Check each key
  for (const key of keys1) {
    // Key doesn't exist in the other object
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    
    // Recursively compare values
    if (!deepCompare(objA[key], objB[key])) {
      return false;
    }
  }
  
  return true;
} 