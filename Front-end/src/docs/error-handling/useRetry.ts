/**
 * 重试钩子
 * 
 * 这个文件展示了如何创建一个自动重试的自定义 Hook
 * 当 API 请求失败时，可以自动或手动重试，提高应用的可靠性
 */

import { useState, useEffect, useCallback } from 'react';

export function useRetry<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = [],
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
      setRetryCount(0); // 重置重试计数
    } catch (err) {
      setError(err instanceof Error ? err : new Error('未知错误'));
      
      // 如果未达到最大重试次数，则安排重试
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
  }, [...dependencies, retryCount]);
  
  // 手动重试的函数
  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);
  
  return { data, loading, error, retry };
}