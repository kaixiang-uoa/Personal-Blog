"use client";

import { useState } from "react";
import { z } from "zod";

// UI Components

// Custom Components
import AppearanceSettingsForm from "@/components/settings/AppearanceSettingsForm";
import GeneralSettingsForm from "@/components/settings/GeneralSettingsForm";
import PasswordChangeForm from "@/components/settings/PasswordChangeForm";
import PostsSettingsForm from "@/components/settings/PostsSettingsForm";
import AboutSettingsForm from "@/components/settings/about/AboutSettingsForm";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import { useSettings } from "@/hooks/useSettings";
import { aboutFormSchema } from "@/lib/validators/settings-schemas";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  // Use custom hooks to fetch settings data
  const { settings, loading, isSaving, saveSettings } = useSettings();

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
              onSubmit={async values => {
                await saveSettings("general", values);
              }}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="posts">
            <PostsSettingsForm
              defaultValues={settings?.posts || {}}
              onSubmit={async values => {
                await saveSettings("posts", values);
              }}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="appearance">
            <AppearanceSettingsForm
              defaultValues={settings?.appearance || {}}
              onSubmit={async values => {
                await saveSettings("appearance", values);
              }}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="security">
            <PasswordChangeForm />
          </TabsContent>

          <TabsContent value="about">
            <AboutSettingsForm
              defaultValues={
                (settings?.about as z.infer<typeof aboutFormSchema>) ||
                defaultAboutSettings
              }
              onSubmit={async values => {
                await saveSettings(
                  "about",
                  values as unknown as Record<string, unknown>
                );
              }}
              loading={loading}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="system">
            <div className="space-y-6">
              <div className="text-center py-8 text-muted-foreground">
                <p>System settings will be available in future updates.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
