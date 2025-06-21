// Keep-Alive API response types
export interface KeepAliveStatus {
  isRunning: boolean;      // Croner task status
  isLiving: boolean;       // server alive status
  isStopped: boolean;
  isBusy: boolean;
  nextRun: string | null;
  previousRun: string | null;
  currentRun: string | null;
  msToNext: number | null;
  pattern: string | null;
  lastPingResult: {
    timestamp: string;
    status: number;
    duration: number;
    success: boolean;
    isLiving: boolean;
  } | null;
  config: {
    interval: string;      // Cron expression
    intervalMinutes: number;
    targetUrl: string;
    timezone: string;
  };
}

export interface KeepAliveResponse {
  success: boolean;
  message?: string;
  status: KeepAliveStatus;
}

export interface UpdateIntervalRequest {
  minutes: number;  // 1-14 minutes
}

export interface UpdateIntervalResponse {
  success: boolean;
  message?: string;
  status: KeepAliveStatus;
}

export interface PingResult {
  timestamp: string;
  status: number;
  duration: number;
  success: boolean;
  isLiving: boolean;
}

// Context types
export interface KeepAliveContextType {
  // status
  status: KeepAliveStatus | null;
  isLoading: boolean;
  isStarting: boolean;
  isStopping: boolean;
  isUpdating: boolean;
  
  // local settings
  localPollingInterval: number;
  setLocalPollingInterval: (interval: number) => void;
  
  // methods
  startService: () => Promise<void>;
  stopService: () => Promise<void>;
  updateInterval: (minutes: number) => Promise<void>;
  pingServer: () => Promise<void>;
  refreshStatus: () => Promise<void>;
} 