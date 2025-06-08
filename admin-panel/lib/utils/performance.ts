/**
 * Performance Utilities
 * 
 * Collection of utilities focused on improving application performance,
 * including caching, memoization, and optimized rendering.
 */

/**
 * Simple in-memory cache for expensive operations
 */
interface CacheItem<T> {
  data: T;
  expiry: number | null;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds, null for no expiry
  maxSize?: number; // Maximum cache size, default is 100
}

/**
 * Cache for expensive operations
 */
class OperationCache<K extends string | number, V> {
  private cache: Map<K, CacheItem<V>> = new Map();
  private maxSize: number;
  
  constructor(options?: CacheOptions) {
    this.maxSize = options?.maxSize || 100;
  }
  
  /**
   * Get item from cache
   * @param key Cache key
   * @returns Cached value or undefined if not found or expired
   */
  get(key: K): V | undefined {
    const item = this.cache.get(key);
    
    if (!item) return undefined;
    
    // Check if expired
    if (item.expiry !== null && Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.data;
  }
  
  /**
   * Set item in cache
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in milliseconds, null for no expiry
   */
  set(key: K, value: V, ttl?: number | null): void {
    // Ensure cache doesn't exceed max size
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry (first key in the map)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(key, {
      data: value,
      expiry: ttl ? Date.now() + ttl : null
    });
  }
  
  /**
   * Check if key exists in cache and is not expired
   * @param key Cache key
   * @returns Whether key exists in cache and is not expired
   */
  has(key: K): boolean {
    const item = this.cache.get(key);
    
    if (!item) return false;
    
    // Check if expired
    if (item.expiry !== null && Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  /**
   * Delete item from cache
   * @param key Cache key
   */
  delete(key: K): void {
    this.cache.delete(key);
  }
  
  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
  
  /**
   * Get all keys in cache
   */
  keys(): K[] {
    return Array.from(this.cache.keys());
  }
}

/**
 * Create a memoized function with customizable cache key generation
 * @param fn Function to memoize
 * @param keyFn Function to generate cache key from arguments
 * @param options Cache options
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyFn: (...args: Parameters<T>) => string = (...args) => JSON.stringify(args),
  options?: CacheOptions
): T {
  const cache = new OperationCache<string, ReturnType<T>>(options);
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyFn(...args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = fn(...args);
    
    // Handle promises
    if (result instanceof Promise) {
      // Don't cache rejected promises
      result.catch(() => cache.delete(key));
      
      // For resolved promises, cache the resolved value
      result.then((value) => {
        cache.set(key, value as ReturnType<T>, options?.ttl);
      });
    } else {
      cache.set(key, result, options?.ttl);
    }
    
    return result;
  }) as T;
}

/**
 * Creates a debounced function that delays invoking fn until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param fn Function to debounce
 * @param wait Wait time in milliseconds
 * @param immediate Whether to invoke immediately on the leading edge
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 300,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) fn(...args);
    }, wait);
    
    if (callNow) fn(...args);
  };
}

/**
 * Creates a throttled function that only invokes fn at most once per every limit milliseconds.
 * @param fn Function to throttle
 * @param limit Limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit = 300
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(...args: Parameters<T>): void {
    if (!lastRan) {
      fn(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          fn(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Batch multiple requests in a single tick
 * @param callback Function to call with batched items
 * @param delay Delay in milliseconds before processing batch
 * @returns Function to add items to batch
 */
export function batchProcessor<T>(
  callback: (items: T[]) => void,
  delay = 0
): (item: T) => void {
  const batch: T[] = [];
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  const processBatch = () => {
    callback(batch.splice(0));
    timeout = null;
  };
  
  return (item: T): void => {
    batch.push(item);
    
    if (!timeout) {
      timeout = setTimeout(processBatch, delay);
    }
  };
}

/**
 * Execute tasks in sequence with a delay between each
 * @param tasks Array of tasks to execute
 * @param delay Delay in milliseconds between tasks
 * @returns Promise that resolves when all tasks are complete
 */
export function sequentialExecution<T>(
  tasks: Array<() => Promise<T>>,
  delay = 0
): Promise<T[]> {
  return tasks.reduce((promiseChain, currentTask, currentIndex) => {
    return promiseChain.then((chainResults) => {
      // Add delay between tasks (except before the first one)
      const delayPromise = currentIndex === 0
        ? Promise.resolve()
        : new Promise((resolve) => setTimeout(resolve, delay));
      
      return delayPromise
        .then(() => currentTask())
        .then((currentResult) => [...chainResults, currentResult]);
    });
  }, Promise.resolve([] as T[]));
}

/**
 * Execute tasks in parallel with limited concurrency
 * @param tasks Array of tasks to execute
 * @param concurrency Maximum number of tasks to execute at once
 * @returns Promise that resolves when all tasks are complete
 */
export async function limitedConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  concurrency = 3
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;
  
  // Helper function to get the next task
  const getNextTask = (): (() => Promise<void>) | null => {
    if (index >= tasks.length) return null;
    
    const taskIndex = index++;
    const task = tasks[taskIndex];
    
    return async () => {
      const result = await task();
      results[taskIndex] = result;
    };
  };
  
  // Initialize active workers
  const workers = Array(Math.min(concurrency, tasks.length))
    .fill(null)
    .map(async () => {
      while (true) {
        const task = getNextTask();
        if (!task) break;
        await task();
      }
    });
  
  // Wait for all workers to complete
  await Promise.all(workers);
  
  return results;
}

/**
 * Data fetching utilities
 */

/**
 * Simple resource fetcher with caching, retries, and backoff
 * @param url URL to fetch
 * @param options Fetch options and cache/retry settings
 * @returns Promise with fetched data
 */
export async function fetchWithCache<T>(
  url: string,
  options?: {
    fetchOptions?: RequestInit;
    cacheTtl?: number; // Time to live in milliseconds
    retries?: number; // Number of retries
    retryDelay?: number; // Initial delay before retry in milliseconds
    retryBackoff?: number; // Backoff factor for subsequent retries
  }
): Promise<T> {
  const {
    fetchOptions,
    cacheTtl = 5 * 60 * 1000, // 5 minutes default
    retries = 3,
    retryDelay = 1000,
    retryBackoff = 1.5
  } = options || {};
  
  // Setup cache if in browser environment
  const cacheKey = `fetch:${url}:${JSON.stringify(fetchOptions)}`;
  
  if (typeof window !== 'undefined') {
    // Check if we have a cached response
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { data, expiry } = JSON.parse(cached);
      
      // If not expired, return cached data
      if (expiry > Date.now()) {
        return data as T;
      }
      
      // Remove expired cache
      sessionStorage.removeItem(cacheKey);
    }
  }
  
  // Helper function for retries
  const fetchWithRetry = async (attemptsLeft: number, delay: number): Promise<T> => {
    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the response if in browser
      if (typeof window !== 'undefined' && cacheTtl > 0) {
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data,
          expiry: Date.now() + cacheTtl
        }));
      }
      
      return data as T;
    } catch (error) {
      if (attemptsLeft <= 1) throw error;
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry with backoff
      return fetchWithRetry(attemptsLeft - 1, delay * retryBackoff);
    }
  };
  
  return fetchWithRetry(retries + 1, retryDelay);
}

/**
 * Create OperationCache instance for reuse
 */
export function createCache<K extends string | number, V>(options?: CacheOptions): OperationCache<K, V> {
  return new OperationCache<K, V>(options);
}

/**
 * Export OperationCache for direct use
 */
export { OperationCache }; 