/**
 * retry hook
 *
 * this file shows how to create a custom hook that automatically retries when API requests fail
 * it can be used to improve the reliability of the application
 */

import { useState, useEffect, useCallback } from 'react';

export function useRetry<T>(
  fetchFunction: () => Promise<T>,
  // dependencies: unknown[] = [],
  options = { maxRetries: 3, retryDelay: 5000 }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
      setError(null);
      setRetryCount(0); // reset retry count
    } catch (err) {
      setError(err instanceof Error ? err : new Error('unknown error'));

      // if the maximum number of retries has not been reached, schedule a retry
      if (retryCount < options.maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, options.retryDelay);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, retryCount, options.maxRetries, options.retryDelay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // function to manually retry
  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  return { data, loading, error, retry };
}
