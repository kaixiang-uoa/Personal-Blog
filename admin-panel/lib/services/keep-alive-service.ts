import { apiService } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { 
  KeepAliveStatus, 
  KeepAliveResponse, 
  UpdateIntervalResponse, 
  PingResult 
} from "@/types/keep-alive";

export const keepAliveService = {
  /**
   * Start keep alive service
   */
  async startService(): Promise<ApiResponse<KeepAliveResponse>> {
    try {
      const response = await apiService.post<KeepAliveResponse>("/keep-alive/start");
      return response;
    } catch (error) {
      console.error("Failed to start keep alive service:", error);
      throw error;
    }
  },

  /**
   * Stop keep alive service
   */
  async stopService(): Promise<ApiResponse<KeepAliveResponse>> {
    try {
      const response = await apiService.post<KeepAliveResponse>("/keep-alive/stop");
      return response;
    } catch (error) {
      console.error("Failed to stop keep alive service:", error);
      throw error;
    }
  },

  /**
   * Get keep alive service status
   */
  async getStatus(): Promise<ApiResponse<KeepAliveStatus>> {
    try {
      const response = await apiService.get<{ status: KeepAliveStatus }>("/keep-alive/status");
      // Transform response to extract status from nested structure
      const status = response.data?.status || response.data;
      return {
        success: response.success,
        data: status as KeepAliveStatus,
        message: response.message,
      };
    } catch (error) {
      console.error("Failed to get keep alive status:", error);
      throw error;
    }
  },

  /**
   * Update keep alive service interval
   */
  async updateInterval(minutes: number): Promise<ApiResponse<UpdateIntervalResponse>> {
    try {
      const response = await apiService.put<UpdateIntervalResponse>("/keep-alive/interval", {
        minutes
      });
      return response;
    } catch (error) {
      console.error("Failed to update keep alive interval:", error);
      throw error;
    }
  },

  /**
   * Ping server directly (for testing)
   */
  async pingServer(): Promise<ApiResponse<PingResult>> {
    try {
      const startTime = Date.now();
      const response = await apiService.get("/health");
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const pingResult: PingResult = {
        timestamp: new Date().toISOString(),
        status: 200, // Assuming successful response
        duration,
        success: true,
        isLiving: true,
      };

      return {
        success: true,
        data: pingResult,
        message: "Ping successful",
      };
    } catch (error) {
      console.error("Ping server error:", error);
      const pingResult: PingResult = {
        timestamp: new Date().toISOString(),
        status: 0,
        duration: 0,
        success: false,
        isLiving: false,
      };

      return {
        success: false,
        data: pingResult,
        message: "Ping failed",
      };
    }
  },
}; 