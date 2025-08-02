'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { internalApi } from '@/services/api';
import { Settings, SettingItem } from '@/types/models';

type SettingsObject = Record<string, string | number | boolean | object | null>;

interface SettingsContextType {
  settings: SettingsObject;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
  getSetting: <T>(key: string, defaultValue: T) => T;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsObject>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Cache related functions
  const CACHE_KEY = 'blog_settings_cache';
  const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour cache
  
  const saveToCache = useCallback((data: SettingsObject) => {
    try {
      const cacheData = {
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch {
      // Silently handle cache save error
    }
  }, []);
  
  const loadFromCache = useCallback((): SettingsObject | null => {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (!cache) return null;
      
      const { timestamp, data } = JSON.parse(cache);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return data;
    } catch {
      // Silently handle cache load error
      return null;
    }
  }, [CACHE_EXPIRY]);
  
  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to load from cache first
      const cachedSettings = loadFromCache();
      if (cachedSettings) {
        setSettings(cachedSettings);
        setIsLoading(false);
        
        // Refresh cache in background
        try {
          const response = await internalApi.get<Settings>('/settings');
          const settingsData = Array.isArray(response) 
            ? response.reduce((acc: SettingsObject, item: SettingItem) => {
                acc[item.key] = item.value;
                return acc;
              }, {})
            : response;
          setSettings(settingsData);
          saveToCache(settingsData);
        } catch {
          // Silently handle background refresh error
        }
          
        return;
      }
      
      // If no cache, fetch from API
      const response = await internalApi.get<Settings>('/settings');
      const settingsData = Array.isArray(response)
        ? response.reduce((acc: SettingsObject, item: SettingItem) => {
            acc[item.key] = item.value;
            return acc;
          }, {})
        : response;
      
      setSettings(settingsData);
      saveToCache(settingsData);
    } catch {
      // Silently handle error
    } finally {
      setIsLoading(false);
    }
  }, [loadFromCache, saveToCache]);
  
  const getSetting = useCallback(function getSetting<T>(key: string, defaultValue: T): T {
    // Check if setting exists and is not empty
    const value = settings[key];
    
    // Handle object values that might have a 'value' property
    let processedValue = value;
    if (typeof value === 'object' && value !== null && 'value' in value) {
      processedValue = (value as { value: string | number | boolean | object | null }).value;
    }
    
    // Special handling for string type, return default value if empty string
    if (typeof processedValue === 'string' && processedValue.trim() === '' && typeof defaultValue === 'string') {
      return defaultValue;
    }
    
    return (processedValue !== undefined && processedValue !== null) ? processedValue as T : defaultValue;
  }, [settings]);
  
  useEffect(() => {
    // Ensure client-side execution only
    if (typeof window !== 'undefined') {
      fetchSettings();
    }
  }, [fetchSettings]);
  
  return (
    <SettingsContext.Provider value={{ 
      settings, 
      isLoading, 
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