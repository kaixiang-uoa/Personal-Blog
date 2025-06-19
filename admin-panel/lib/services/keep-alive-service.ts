import apiClient from "@/lib/api";
import type { ApiResponse } from "@/types/api";

export interface KeepAliveConfig {
  interval: number;
  enabled: boolean;
  isRunning: boolean;
  targetUrl: string;
  lastPingTime: string | null;
  lastPingStatus: number | null;
  lastPingError: string | null;
  nextPingTime: string | null;
}

export interface PingResult {
  status: number;
  duration: number;
  timestamp: string;
}

export const keepAliveService = {
  /**
   * Get Keep Alive service configuration
   */
  async getConfig(): Promise<ApiResponse<KeepAliveConfig>> {
    try {
      const response = await apiClient.get<KeepAliveConfig>("/keep-alive/config");
      return {
        success: true,
        data: response.data,
        message: "Configuration retrieved successfully",
      };
    } catch (error) {
      console.error("Failed to get keep alive config:", error);
      throw error;
    }
  },

  /**
   * Update Keep Alive service configuration
   */
  async updateConfig(config: Partial<KeepAliveConfig>): Promise<ApiResponse<KeepAliveConfig>> {
    try {
      const response = await apiClient.put<KeepAliveConfig>("/keep-alive/config", config);
      return {
        success: true,
        data: response.data,
        message: "Configuration updated successfully",
      };
    } catch (error) {
      console.error("Failed to update keep alive config:", error);
      throw error;
    }
  },

  /**
   * Manually trigger a ping
   */
  async triggerPing(): Promise<ApiResponse<PingResult>> {
    try {
      const response = await apiClient.post<PingResult>("/keep-alive/ping");
      return {
        success: true,
        data: response.data,
        message: "Ping triggered successfully",
      };
    } catch (error) {
      console.error("Failed to trigger ping:", error);
      throw error;
    }
  },
}; 