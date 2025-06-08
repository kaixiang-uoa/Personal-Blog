"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/ui/use-toast"

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Skeleton } from "@/components/ui/data-display/skeleton"

// Custom Components
import GeneralSettingsForm from "@/components/settings/GeneralSettingsForm"
import PostsSettingsForm from "@/components/settings/PostsSettingsForm"
import AboutSettingsForm from "@/components/settings/AboutSettingsForm"
import AppearanceSettingsForm from "@/components/settings/AppearanceSettingsForm"
import PasswordChangeForm from "@/components/settings/PasswordChangeForm"
import SettingsActions from "@/components/settings/SettingsActions"
import SettingHistoryDialog from "@/components/settings/SettingHistoryDialog"

// Types and Schemas
// Temporarily define a Settings type due to import path issues
interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    logo: string;
    favicon: string;
    metaKeywords: string;
  };
  posts: {
    postsPerPage: number;
    defaultCategory: string;
    showAuthor: boolean;
    enableComments: boolean;
    moderateComments: boolean;
    excerptLength: number;
  };
  appearance: {
    theme: string;
    accentColor: string;
    fontFamily: string;
    enableRTL: boolean;
    showSidebar: boolean;
    homeBanner: string;
    aboutBanner: string;
    contactBanner: string;
    homeBannerMobile: string;
    aboutBannerMobile: string;
    contactBannerMobile: string;
  };
  advanced: {
    cacheTimeout: number;
    apiKey: string;
    debugMode: boolean;
  };
  about: {
    intro: string;
    intro_zh: string;
    contact: string;
    skills: string;
    education: string;
    experience: string;
    projects: string;
    social: string;
  };
}

// Utils
import { formatAboutSettingsForApi } from "@/lib/settings/utils"

// Services
import { settingsService } from "@/lib/services/settings-service"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [selectedSettingKey, setSelectedSettingKey] = useState<string | undefined>(undefined)
  const [loadingAbout, setLoadingAbout] = useState(false)

  // fetch settings - declared before useEffect
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      
      // fetch all settings from api
      const response = await settingsService.getAll();
      const data = response.data;

      if (data) {
     
        // ensure data is of type Settings
        const settingsData: Settings = {
          general: {
            siteName: String(data['general.siteName'] || ""),
            siteDescription: String(data['general.siteDescription'] || ""),
            siteUrl: String(data['general.siteUrl'] || ""),
            logo: String(data['general.logo'] || ""),
            favicon: String(data['general.favicon'] || ""),
            metaKeywords: String(data['general.metaKeywords'] || ""),
          },
          posts: {
            postsPerPage: Number(data['posts.perPage']) || 10,
            defaultCategory: String(data['posts.defaultCategory'] || ""),
            showAuthor: data['posts.showAuthor'] === 'true' || true,
            enableComments: data['posts.enableComments'] === 'true' || true,
            moderateComments: data['posts.moderateComments'] === 'true' || true,
            excerptLength: Number(data['posts.excerptLength']) || 200,
          },
          appearance: {
            theme: String(data['appearance.theme'] || "light"),
            accentColor: String(data['appearance.accentColor'] || ""),
            fontFamily: String(data['appearance.fontFamily'] || ""),
            enableRTL: data['appearance.enableRTL'] === 'true' || false,
            showSidebar: data['appearance.showSidebar'] === 'true' || true,
            homeBanner: String(data['appearance.homeBanner'] || ""),
            aboutBanner: String(data['appearance.aboutBanner'] || ""),
            contactBanner: String(data['appearance.contactBanner'] || ""),
            homeBannerMobile: String(data['appearance.homeBannerMobile'] || ""),
            aboutBannerMobile: String(data['appearance.aboutBannerMobile'] || ""),
            contactBannerMobile: String(data['appearance.contactBannerMobile'] || ""),
          },
          advanced: {
            cacheTimeout: Number(data['advanced.cacheTimeout']) || 3600,
            apiKey: String(data['advanced.apiKey'] || ""),
            debugMode: data['advanced.debugMode'] === 'true' || false,
          },
          about: {
            intro: String(data['about.intro'] || ""),
            intro_zh: String(data['about.intro_zh'] || ""),
            contact: String(data['about.contact'] || ""),
            skills: String(data['about.skills'] || ""),
            education: String(data['about.education'] || ""),
            experience: String(data['about.experience'] || ""),
            projects: String(data['about.projects'] || ""),
            social: String(data['about.social'] || ""),
          },
        };
        
        setSettings(settingsData);
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
      toast({
        title: "Failed to load settings",
        description: "Please check your network connection and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  // handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // when switch to about tab, ensure about settings are loaded
    if (tab === "about" && (!settings?.about?.intro && !settings?.about?.intro_zh)) {
      fetchAboutSettings();
    }
  };

  // fetch about settings
  async function fetchAboutSettings() {
    try {
      setLoadingAbout(true);
      
      // fetch about settings
      const response = await settingsService.getByGroup('about');
      const data = response.data;
      
      if (data && settings) {
        // ensure data has correct structure  
        const aboutData = {
          intro: String(data['about.intro'] || ""),
          intro_zh: String(data['about.intro_zh'] || ""),
          contact: String(data['about.contact'] || ""),
          skills: String(data['about.skills'] || ""),
          education: String(data['about.education'] || ""),
          experience: String(data['about.experience'] || ""),
          projects: String(data['about.projects'] || ""),
          social: String(data['about.social'] || ""),
        };

        console.log('reformatted aboutData:', aboutData);
        
        setSettings({
          ...settings,
          about: aboutData
        });
      }
    } catch (error) {
      console.error("Failed to fetch about settings", error);
    } finally {
      setLoadingAbout(false);
    }
  }

  // save settings
  const saveSettings = async (section: keyof Settings, values: Record<string, unknown>) => {
    try {
      // simple validation
      if (section === 'general') {
        if (!values.siteName) {
          toast({
            title: "Validation Error",
            description: "Site name is required",
            variant: "destructive",
          });
          return;
        }
      } else if (section === 'posts') {
        if (typeof values.postsPerPage === 'number' && values.postsPerPage <= 0) {
          toast({
            title: "Validation Error",
            description: "Posts per page must be greater than 0",
            variant: "destructive",
          });
          return;
        }
      }
      
      setIsSaving(true)
      
      // 对于appearance部分，我们需要特殊处理
      if (section === 'appearance') {
        const settingsArray: { key: string; value: unknown; group: string }[] = [];
        
        // 转换为API需要的格式，将扁平对象转换为键值对数组
        Object.entries(values).forEach(([key, value]) => {
          const fullKey = `appearance.${key}`;
          // 对于布尔值，转换为字符串
          const formattedValue = typeof value === 'boolean' ? String(value) : value;
          
          settingsArray.push({
            key: fullKey,
            value: formattedValue,
            group: 'appearance'
          });
        });
        
        // 使用批量更新API
        await settingsService.batchUpdate(settingsArray);
        
        // 重新加载设置
        await fetchSettings();
        
        toast({
          title: "Saved Successfully", 
          description: "Appearance settings have been updated",
        });
        
        setIsSaving(false);
        return;
      }
      
      // save settings - 修复类型问题，确保section是字符串
      const response = await settingsService.update(String(section), values)

      // update local state
      if (settings) {
        setSettings({
          ...settings,
          [section]: response.data,
        })
      }

      toast({
        title: "Saved Successfully",
        description: "Settings have been updated",
      })
    } catch (error) {
      console.error(`Failed to save ${String(section)} settings`, error)
      toast({
        title: "Save Failed",
        description: "Unable to save settings, please try again",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // save about settings
  const saveAboutSettings = async (values: Record<string, unknown>) => {
    try {
      setIsSaving(true);
      // use format function to convert form data to api needed format
      const formattedSettings = formatAboutSettingsForApi(values);
      
      // batch update settings
      await settingsService.batchUpdate(formattedSettings);
      
     
      await fetchSettings();

      toast({
        title: "Saved Successfully",
        description: "About page settings have been updated",
      });
    } catch (error) {
      console.error("Failed to save About settings", error);
      toast({
        title: "Save Failed",
        description: "Unable to save settings, please try again",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  // view setting history
  const viewSettingHistory = (key?: string) => {
    setSelectedSettingKey(key)
    setShowHistoryDialog(true)
  }
  
  // refresh settings
  const refreshSettings = () => {
    fetchSettings()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Manage global configurations and preferences</p>
      </div>
        
        <SettingsActions 
          onHistoryOpen={viewSettingHistory}
          onRefresh={refreshSettings}
        />
      </div>
      
      {/* setting history dialog */}
      <SettingHistoryDialog 
        open={showHistoryDialog}
        onOpenChange={setShowHistoryDialog}
        settingKey={selectedSettingKey}
        onRollback={refreshSettings}
      />

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <GeneralSettingsForm
              defaultValues={settings?.general || {
                siteName: "",
                siteDescription: "",
                siteUrl: "",
                logo: "",
                favicon: "",
                metaKeywords: "",
              }}
              onSubmit={(values) => saveSettings("general", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          {/* Posts Settings */}
          <TabsContent value="posts" className="space-y-4">
            <PostsSettingsForm
              defaultValues={settings?.posts || {
                postsPerPage: 10,
                defaultCategory: "",
                showAuthor: true,
                enableComments: true,
                moderateComments: true,
                excerptLength: 200,
              }}
              onSubmit={(values) => saveSettings("posts", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <AppearanceSettingsForm
              defaultValues={{
                theme: settings?.appearance?.theme || "light",
                accentColor: settings?.appearance?.accentColor || "",
                fontFamily: settings?.appearance?.fontFamily || "",
                enableRTL: settings?.appearance?.enableRTL || false,
                showSidebar: settings?.appearance?.showSidebar || true,
                homeBanner: settings?.appearance?.homeBanner || "",
                aboutBanner: settings?.appearance?.aboutBanner || "",
                contactBanner: settings?.appearance?.contactBanner || "",
                homeBannerMobile: settings?.appearance?.homeBannerMobile || "",
                aboutBannerMobile: settings?.appearance?.aboutBannerMobile || "",
                contactBannerMobile: settings?.appearance?.contactBannerMobile || "",
              }}
              onSubmit={(values: Record<string, unknown>) => saveSettings("appearance", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <PasswordChangeForm />
          </TabsContent>

          {/* About Settings */}
          <TabsContent value="about" className="space-y-4">
            {loadingAbout ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <AboutSettingsForm
                defaultValues={{
                  intro: settings?.about?.intro || "",
                  intro_zh: settings?.about?.intro_zh || "",
                  contact: (() => {
                    try {
                      return settings?.about?.contact ? JSON.parse(settings.about.contact as string) : { email: "", phone: "", location: "" };
                    } catch (err) {
                      console.error('Error parsing contact JSON:', err);
                      return { email: "", phone: "", location: "" };
                    }
                  })(),
                  skills: (() => {
                    try {
                      return settings?.about?.skills ? JSON.parse(settings.about.skills as string) : [];
                    } catch (err) {
                      console.error('Error parsing skills JSON:', err);
                      return [];
                    }
                  })(),
                  education: (() => {
                    try {
                      return settings?.about?.education ? JSON.parse(settings.about.education as string) : [];
                    } catch (err) {
                      console.error('Error parsing education JSON:', err);
                      return [];
                    }
                  })(),
                  experience: (() => {
                    try {
                      return settings?.about?.experience ? JSON.parse(settings.about.experience as string) : [];
                    } catch (err) {
                      console.error('Error parsing experience JSON:', err);
                      return [];
                    }
                  })(),
                  projects: (() => {
                    try {
                      return settings?.about?.projects ? JSON.parse(settings.about.projects as string) : [];
                    } catch (err) {
                      console.error('Error parsing projects JSON:', err);
                      return [];
                    }
                  })(),
                  social: (() => {
                    try {
                      return settings?.about?.social ? JSON.parse(settings.about.social as string) : { github: "", linkedin: "", twitter: "", website: "" };
                    } catch (err) {
                      console.error('Error parsing social JSON:', err);
                      return { github: "", linkedin: "", twitter: "", website: "" };
                    }
                  })()
                }}
                onSubmit={saveAboutSettings}
                loading={false}
                isSaving={isSaving}
              />
            )}
          </TabsContent>

            {/* other tabs content... */}
            {/* you can continue to add other tab components here */}
        </Tabs>
      )}
    </div>
  )
}
