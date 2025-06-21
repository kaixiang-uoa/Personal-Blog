"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/ui/use-toast';
import { keepAliveService } from '@/lib/services/keep-alive-service';
import type { KeepAliveStatus, KeepAliveContextType } from '@/types/keep-alive';

// create context
const KeepAliveContext = createContext<KeepAliveContextType | undefined>(undefined);

// provider component
export function KeepAliveProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  
  // status
  const [status, setStatus] = useState<KeepAliveStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // local settings
  const [localPollingInterval, setLocalPollingInterval] = useState(5);
  
  // polling related
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // load local settings from localStorage
  useEffect(() => {
    const savedInterval = localStorage.getItem('keepAlive_pollingInterval');
    if (savedInterval) {
      const interval = parseInt(savedInterval, 10);
      if (interval >= 1 && interval <= 60) {
        setLocalPollingInterval(interval);
      }
    }
  }, []);

  // save local settings to localStorage
  const handleSetLocalPollingInterval = useCallback((interval: number) => {
    if (interval >= 1 && interval <= 60) {
      setLocalPollingInterval(interval);
      localStorage.setItem('keepAlive_pollingInterval', interval.toString());
      toast({
        title: "Success",
        description: `Status check interval updated to ${interval} minutes`,
      });
    }
  }, [toast]);

  //get status
  const refreshStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await keepAliveService.getStatus();
      if (response.success && response.data) {
        setStatus(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch keep-alive status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // start service
  const startService = useCallback(async () => {
    try {
      setIsStarting(true);
      const response = await keepAliveService.startService();
      if (response.success && response.data) {
        setStatus(response.data.status);
        toast({
          title: "Success",
          description: "Keep-Alive service started successfully",
        });
      } else {
        throw new Error(response.message || 'Failed to start service');
      }
    } catch (error) {
      console.error('Start service error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to start service',
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsStarting(false);
    }
  }, [toast]);

  // stop service
  const stopService = useCallback(async () => {
    try {
      setIsStopping(true);
      const response = await keepAliveService.stopService();
      if (response.success && response.data) {
        setStatus(response.data.status);
        toast({
          title: "Success",
          description: "Keep-Alive service stopped successfully",
        });
      } else {
        throw new Error(response.message || 'Failed to stop service');
      }
    } catch (error) {
      console.error('Stop service error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to stop service',
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsStopping(false);
    }
  }, [toast]);

  // update interval
  const updateInterval = useCallback(async (minutes: number) => {
    try {
      setIsUpdating(true);
      const response = await keepAliveService.updateInterval(minutes);
      if (response.success && response.data) {
        setStatus(response.data.status);
        toast({
          title: "Success",
          description: `Interval updated to ${minutes} minutes successfully`,
        });
      } else {
        throw new Error(response.message || 'Failed to update interval');
      }
    } catch (error) {
      console.error('Update interval error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update interval',
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [toast]);

  // ping server
  const pingServer = useCallback(async () => {
    try {
      const response = await keepAliveService.pingServer();
      if (response.success && response.data) {
        // update ping result in status
        setStatus(prev => prev ? {
          ...prev,
          lastPingResult: response.data,
          isLiving: response.data.isLiving
        } : null);
      }
    } catch (error) {
      console.error('Ping server error:', error);
      // update status to failed
      setStatus(prev => prev ? {
        ...prev,
        lastPingResult: {
          timestamp: new Date().toISOString(),
          status: 0,
          duration: 0,
          success: false,
          isLiving: false,
        },
        isLiving: false
      } : null);
    }
  }, []);

  // initialize
  useEffect(() => {
    if (!isInitializedRef.current) {
      refreshStatus();
      isInitializedRef.current = true;
    }
  }, [refreshStatus]);

  // set polling
  useEffect(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    if (localPollingInterval > 0) {
      pollingIntervalRef.current = setInterval(() => {
        refreshStatus();
      }, localPollingInterval * 60 * 1000);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [localPollingInterval, refreshStatus]);

  const value: KeepAliveContextType = {
    // status
    status,
    isLoading,
    isStarting,
    isStopping,
    isUpdating,
    
    // local settings
    localPollingInterval,
    setLocalPollingInterval: handleSetLocalPollingInterval,
    
    // methods
    startService,
    stopService,
    updateInterval,
    pingServer,
    refreshStatus,
  };

  return (
    <KeepAliveContext.Provider value={value}>
      {children}
    </KeepAliveContext.Provider>
  );
}

// hook
export function useKeepAlive() {
  const context = useContext(KeepAliveContext);
  if (context === undefined) {
    throw new Error('useKeepAlive must be used within a KeepAliveProvider');
  }
  return context;
} 