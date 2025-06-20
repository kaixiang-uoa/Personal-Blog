import apiClient from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  Setting,
  SettingFormData,
  Settings,
  SettingsResponse,
  AboutSettings,
} from "@/types/settings";

// Helper function to safely parse JSON
function safeParseJSON<T>(value: string | null, defaultValue: T): T {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return defaultValue;
  }
}

// Helper function to process about settings
function processAboutSettings(data: SettingsResponse): AboutSettings {
  return {
    intro: data["about.intro"] || "",
    intro_zh: data["about.intro_zh"] || "",
    contact: safeParseJSON(data["about.contact"], {
      email: "",
      phone: "",
      location: "",
    }),
    skills: safeParseJSON(data["about.skills"], []),
    education: safeParseJSON(data["about.education"], []),
    experience: safeParseJSON(data["about.experience"], []),
    projects: safeParseJSON(data["about.projects"], []),
    social: safeParseJSON(data["about.social"], {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    }),
  };
}

// Helper function to process settings response
function processSettingsResponse(data: SettingsResponse): Settings {
  return {
    general: {
      siteName: data["general.siteName"] || "",
      siteDescription: data["general.siteDescription"] || "",
      siteUrl: data["general.siteUrl"] || "",
      logo: data["general.logo"] || "",
      favicon: data["general.favicon"] || "",
      metaKeywords: data["general.metaKeywords"] || "",
    },
    posts: {
      postsPerPage: Number(data["posts.postsPerPage"]) || 10,
    },
    appearance: {
      homeBanner: data["appearance.homeBanner"] || "",
      aboutBanner: data["appearance.aboutBanner"] || "",
      contactBanner: data["appearance.contactBanner"] || "",
      homeBannerMobile: data["appearance.homeBannerMobile"] || "",
      aboutBannerMobile: data["appearance.aboutBannerMobile"] || "",
      contactBannerMobile: data["appearance.contactBannerMobile"] || "",
    },
    about: processAboutSettings(data),
    system: {
      keepAlive: {
        interval: Number(data["system.keepAlive.interval"]) || 1 * 60 * 1000,
        enabled: data["system.keepAlive.enabled"] === "true",
        isRunning: data["system.keepAlive.isRunning"] === "true",
      },
    },
  };
}

export const settingsService = {
  getAll: async (): Promise<ApiResponse<Settings>> => {
    try {
      const response = await apiClient.get<SettingsResponse>("/settings");
      return {
        success: true,
        data: processSettingsResponse(response.data),
        message: "Settings retrieved successfully",
      };
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    }
  },

  getByGroup: async (
    group: string,
  ): Promise<ApiResponse<Record<string, any>>> => {
    try {
      const response = await apiClient.get<SettingsResponse>("/settings", {
        params: { group },
      });

      // Process group-specific data
      let processedData: Record<string, any> = {};
      if (group === "about") {
        processedData = processAboutSettings(response.data);
      } else {
        processedData = response.data;
      }

      return {
        success: true,
        data: processedData,
        message: `${group} settings retrieved successfully`,
      };
    } catch (error) {
      console.error(`Error fetching ${group} settings:`, error);
      throw error;
    }
  },

  getByKey: async (key: string): Promise<ApiResponse<Setting>> => {
    return apiClient.get(`/settings/${key}`);
  },

  create: async (data: SettingFormData): Promise<ApiResponse<Setting>> => {
    return apiClient.post("/settings", data);
  },

  update: async (
    key: string,
    data: Partial<SettingFormData>,
  ): Promise<ApiResponse<Setting>> => {
    return apiClient.put(`/settings/${key}`, data);
  },

  batchUpdate: async (
    settings: SettingFormData[],
  ): Promise<ApiResponse<Setting[]>> => {
    return apiClient.post("/settings/batch", { settings });
  },

  delete: async (key: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/settings/${key}`);
  },

  exportForEnvironment: async (
    env: "development" | "production" | "staging",
  ): Promise<{
    metadata: {
      exportDate: string;
      version: string;
      environment: string;
    };
    settings: Record<string, any>;
  }> => {
    const response = (await apiClient.get("/settings")) as {
      data: Record<string, any>;
    };
    const settingsData = response.data;

    if (!settingsData) {
      throw new Error("No settings data available for export");
    }

    const environmentOverrides: Record<string, any> = {};

    if (env === "production") {
      environmentOverrides["advanced.debugMode"] = false;
      environmentOverrides["advanced.cacheTimeout"] = 3600;
    } else if (env === "staging") {
      environmentOverrides["advanced.debugMode"] = true;
      environmentOverrides["general.siteName"] =
        `[STAGING] ${settingsData["general.siteName"] || "Blog"}`;
    } else {
      environmentOverrides["advanced.debugMode"] = true;
      environmentOverrides["advanced.cacheTimeout"] = 0;
    }

    return {
      metadata: {
        exportDate: new Date().toISOString(),
        version: "1.0",
        environment: env,
      },
      settings: {
        ...settingsData,
        ...environmentOverrides,
      },
    };
  },
};
