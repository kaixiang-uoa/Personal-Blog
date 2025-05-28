'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
        fetch('/api/settings')
          .then(res => res.json())
          .then(data => {
            setSettings(data.data || {});
            saveToCache(data.data || {});
          })
          .catch(console.error);
          
        return;
      }
      
      // 没有缓存则从API获取
      const response = await fetch('/api/settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      const settingsData = data.data || {};
      
      setSettings(settingsData);
      saveToCache(settingsData);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching settings:', err);
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
      console.error('Error saving settings to cache', e);
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
      console.error('Error loading settings from cache', e);
      return null;
    }
  }
  
  function getSetting<T>(key: string, defaultValue: T): T {
    return (settings[key] !== undefined ? settings[key] : defaultValue) as T;
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