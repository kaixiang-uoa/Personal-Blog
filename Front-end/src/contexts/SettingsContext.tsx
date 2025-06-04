'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInternalApiData } from '@/services/api';

interface SettingsContextType {
  settings: Record<string, any>;
  isLoading: boolean;
  error: Error | null;
  refreshSettings: () => Promise<void>;
  getSetting: <T>(key: string, defaultValue: T) => T;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  async function fetchSettings() {
    try {
      setIsLoading(true);
      
      // 先尝试从缓存加载
      const cachedSettings = loadFromCache();
      if (cachedSettings) {
        setSettings(cachedSettings);
        setIsLoading(false);
        
        // 后台刷新缓存
        try {
          const data = await getInternalApiData<Record<string, any>>('/settings');
          setSettings(data);
          saveToCache(data);
        } catch (error) {
          // 静默处理后台刷新错误
        }
          
        return;
      }
      
      // 没有缓存则从API获取
      const settingsData = await getInternalApiData<Record<string, any>>('/settings');
      
      setSettings(settingsData);
      saveToCache(settingsData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  // 缓存相关函数
  const CACHE_KEY = 'blog_settings_cache';
  const CACHE_EXPIRY = 60 * 60 * 1000; // 1小时缓存
  
  function saveToCache(data: Record<string, any>) {
    try {
      const cacheData = {
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (e) {
      // 静默处理缓存保存错误
    }
  }
  
  function loadFromCache(): Record<string, any> | null {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (!cache) return null;
      
      const { timestamp, data } = JSON.parse(cache);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return data;
    } catch (e) {
      // 静默处理缓存加载错误
      return null;
    }
  }
  
  function getSetting<T>(key: string, defaultValue: T): T {
    // 检查设置是否存在且不为空
    const value = settings[key];
    
    // 特殊处理字符串类型，如果是空字符串则返回默认值
    if (typeof value === 'string' && value.trim() === '' && typeof defaultValue === 'string') {
      return defaultValue;
    }
    
    return (value !== undefined && value !== null) ? value : defaultValue;
  }
  
  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window !== 'undefined') {
      fetchSettings();
    }
  }, []);
  
  return (
    <SettingsContext.Provider value={{ 
      settings, 
      isLoading, 
      error, 
      refreshSettings: fetchSettings,
      getSetting 
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export function useSetting<T>(key: string, defaultValue: T): T {
  const { getSetting } = useSettings();
  return getSetting(key, defaultValue);
} 