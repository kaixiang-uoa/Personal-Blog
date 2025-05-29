"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Custom Components
import GeneralSettingsForm from "@/components/settings/GeneralSettingsForm"
import PostsSettingsForm from "@/components/settings/PostsSettingsForm"
import AboutSettingsForm from "@/components/settings/AboutSettingsForm"
import PasswordChangeForm from "@/components/settings/PasswordChangeForm"
import SettingsActions from "@/components/settings/SettingsActions"
import SettingHistoryDialog from "@/components/settings/SettingHistoryDialog"

// Types and Schemas
import { Settings } from "@/types/settings"

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

  useEffect(() => {
    fetchSettings()
  }, [])

  // 获取设置
  async function fetchSettings() {
    try {
      setLoading(true)
      
      // 从API获取所有设置
      const response = await settingsService.getAll()
      const data = response.data
      
      if (data) {
        // 确保数据符合 Settings 类型
        const settingsData: Settings = {
          general: data.general || {
            siteName: "",
            siteDescription: "",
            siteUrl: "",
            logo: "",
            favicon: "",
            metaKeywords: "",
          },
          posts: data.posts || {
            postsPerPage: 10,
            defaultCategory: "",
            showAuthor: true,
            enableComments: true,
            moderateComments: true,
            excerptLength: 200,
          },
          appearance: data.appearance || {
            theme: "light",
            accentColor: "",
            fontFamily: "",
            enableRTL: false,
            showSidebar: true,
          },
          advanced: data.advanced || {
            cacheTimeout: 3600,
            apiKey: "",
            debugMode: false,
          },
          about: data.about || {
            intro: "",
            intro_zh: "",
            contact: "",
            skills: "",
            education: "",
            experience: "",
            projects: "",
            social: "",
          },
        }
        setSettings(settingsData)
      }
    } catch (error) {
      console.error("Failed to fetch settings", error)
      toast({
        title: "Failed to load settings",
        description: "Please check your network connection and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // 保存设置通用方法
  const saveSettings = async (section: keyof Settings, values: any) => {
    try {
      setIsSaving(true)

      // 保存设置
      const response = await settingsService.update(section, values)

      // 更新本地状态
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
      console.error(`Failed to save ${section} settings`, error)
      toast({
        title: "Save Failed",
        description: "Unable to save settings, please try again",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // 保存About设置（特殊处理）
  const saveAboutSettings = async (values: any) => {
    try {
      setIsSaving(true)

      // 使用格式化函数将表单数据转换为API需要的格式
      const formattedSettings = formatAboutSettingsForApi(values)
      
      // 批量更新设置
      await settingsService.batchUpdate(formattedSettings)
      
      // 刷新设置
      await fetchSettings()

      toast({
        title: "Saved Successfully",
        description: "About page settings have been updated",
      })
    } catch (error) {
      console.error("Failed to save About settings", error)
      toast({
        title: "Save Failed",
        description: "Unable to save settings, please try again",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // 查看设置历史记录
  const viewSettingHistory = (key?: string) => {
    setSelectedSettingKey(key)
    setShowHistoryDialog(true)
  }
  
  // 刷新设置
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
      
      {/* 设置历史记录对话框 */}
      <SettingHistoryDialog 
        open={showHistoryDialog}
        onOpenChange={setShowHistoryDialog}
        settingKey={selectedSettingKey}
        onRollback={refreshSettings}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <PasswordChangeForm />
        </TabsContent>

        {/* About Settings */}
        <TabsContent value="about" className="space-y-4">
          <AboutSettingsForm
            defaultValues={{
              intro: settings?.about?.intro || "",
              intro_zh: settings?.about?.intro_zh || "",
              contact: settings?.about?.contact ? 
                JSON.parse(settings.about.contact as string) : 
                { email: "", phone: "", location: "" },
              skills: settings?.about?.skills ? 
                JSON.parse(settings.about.skills as string) : 
                [],
              education: settings?.about?.education ? 
                JSON.parse(settings.about.education as string) : 
                [],
              experience: settings?.about?.experience ? 
                JSON.parse(settings.about.experience as string) : 
                [],
              projects: settings?.about?.projects ? 
                JSON.parse(settings.about.projects as string) : 
                [],
              social: settings?.about?.social ? 
                JSON.parse(settings.about.social as string) : 
                { github: "", linkedin: "", twitter: "", website: "" }
            }}
            onSubmit={saveAboutSettings}
            loading={loading}
            isSaving={isSaving}
          />
        </TabsContent>

        {/* 其他标签页内容... */}
        {/* 这里可以继续添加其他标签页的组件 */}
      </Tabs>
    </div>
  )
}
