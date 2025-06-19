"use client";

import { useState, useEffect } from "react";
import { z } from "zod";

// UI Components

// Custom Components
import AboutSettingsForm from "@/components/settings/AboutSettingsForm";
import AppearanceSettingsForm from "@/components/settings/AppearanceSettingsForm";
import GeneralSettingsForm from "@/components/settings/GeneralSettingsForm";
import KeepAliveSettingsForm from "@/components/settings/KeepAliveSettingsForm";
import PasswordChangeForm from "@/components/settings/PasswordChangeForm";
import PostsSettingsForm from "@/components/settings/PostsSettingsForm";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import { useToast } from "@/hooks/ui/use-toast";
import { settingsService } from "@/lib/services/settings-service";
import { aboutFormSchema } from "@/lib/validators/settings-schemas";
import { Settings } from "@/types/settings";
import { keepAliveService } from "@/lib/services/keep-alive-service";

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [keepAliveConfig, setKeepAliveConfig] = useState({
    interval: 300000,
    enabled: true,
    isRunning: false,
    targetUrl: "",
    lastPingTime: null,
    lastPingStatus: null,
    lastPingError: null,
    nextPingTime: null,
  });

  useEffect(() => {
    fetchSettings();
    fetchKeepAliveConfig();
  }, []);

  // fetch all settings
  async function fetchSettings() {
    try {
      setLoading(true);
      const response = await settingsService.getAll();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // fetch keep alive config
  async function fetchKeepAliveConfig() {
    try {
      const response = await keepAliveService.getConfig();
      if (response.success && response.data) {
        setKeepAliveConfig(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch keep alive config:", error);
    }
  }

  // Helper function to flatten nested objects
  function flattenObject(obj: any, prefix = ""): Record<string, any> {
    return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
      const pre = prefix.length ? prefix + "." : "";
      if (
        typeof obj[k] === "object" &&
        obj[k] !== null &&
        !Array.isArray(obj[k])
      ) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  }

  // save settings
  async function saveSettings(group: string, values: any) {
    try {
      setIsSaving(true);
      // Special handling for about settings
      if (group === "about") {
        // Convert nested objects to flattened key-value pairs
        const settings = [
          { key: "about.intro", value: values.intro, group },
          { key: "about.intro_zh", value: values.intro_zh, group },
          {
            key: "about.contact",
            value: JSON.stringify(values.contact),
            group,
          },
          { key: "about.skills", value: JSON.stringify(values.skills), group },
          {
            key: "about.education",
            value: JSON.stringify(values.education),
            group,
          },
          {
            key: "about.experience",
            value: JSON.stringify(values.experience),
            group,
          },
          {
            key: "about.projects",
            value: JSON.stringify(values.projects),
            group,
          },
          { key: "about.social", value: JSON.stringify(values.social), group },
        ];
        const response = await settingsService.batchUpdate(settings);
        if (!response.success) {
          throw new Error(response.message || "Failed to save settings");
        }
      } else {
        // Flatten nested objects for other settings
        const flattenedValues = flattenObject(values);

        // Convert to settings array
        const settings = Object.entries(flattenedValues).map(
          ([key, value]) => ({
            key: `${group}.${key}`,
            value:
              typeof value === "object" ? JSON.stringify(value) : String(value),
            group,
          }),
        );

        const response = await settingsService.batchUpdate(settings);
        if (!response.success) {
          throw new Error(response.message || "Failed to save settings");
        }
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });

      await fetchSettings(); // Refresh settings after save
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  // save keep alive settings
  async function saveKeepAliveSettings(values: any) {
    try {
      setIsSaving(true);
      const response = await keepAliveService.updateConfig(values);
      if (response.success && response.data) {
        setKeepAliveConfig(response.data);
        toast({
          title: "Success",
          description: "Keep alive settings saved successfully",
        });
      }
    } catch (error) {
      console.error("Error saving keep alive settings:", error);
      toast({
        title: "Error",
        description: "Failed to save keep alive settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  // refresh settings
  async function refreshSettings() {
    await fetchSettings();
    toast({
      title: "Success",
      description: "Settings refreshed",
    });
  }

  // Default about settings
  const defaultAboutSettings: z.infer<typeof aboutFormSchema> = {
    intro: "",
    intro_zh: "",
    contact: {
      email: "",
      phone: "",
      location: "",
    },
    skills: [],
    education: [],
    experience: [],
    projects: [],
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {loading && !settings ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettingsForm
              defaultValues={settings?.general || {}}
              onSubmit={(values) => saveSettings("general", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="posts">
            <PostsSettingsForm
              defaultValues={settings?.posts || {}}
              onSubmit={(values) => saveSettings("posts", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="appearance">
            <AppearanceSettingsForm
              defaultValues={settings?.appearance || {}}
              onSubmit={(values) => saveSettings("appearance", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="security">
            <PasswordChangeForm />
          </TabsContent>

          <TabsContent value="about">
            <AboutSettingsForm
              defaultValues={settings?.about || defaultAboutSettings}
              onSubmit={(values) => saveSettings("about", values)}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="system">
            <div className="space-y-6">
              <KeepAliveSettingsForm
                defaultValues={keepAliveConfig}
                onSubmit={saveKeepAliveSettings}
                loading={loading}
                isSaving={isSaving}
              />
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
