import { useState, useCallback } from "react";
import { useToast } from "@/hooks/ui/use-toast";
import { settingsService } from "@/lib/services/settings-service";
import { Settings } from "@/types/settings";
import { UseSettingsReturn } from "@/types/hooks";

export function useSettings(): UseSettingsReturn {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await settingsService.getAll();
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setSettings(null);
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to load settings");
      setError(error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const saveSettings = useCallback(
    async (
      group: string,
      values: Record<string, unknown>
    ): Promise<boolean> => {
      try {
        setIsSaving(true);
        setError(null);

        // Special handling for about settings
        if (group === "about") {
          const settings = [
            { key: "about.intro", value: values.intro, group },
            { key: "about.intro_zh", value: values.intro_zh, group },
            {
              key: "about.contact",
              value: JSON.stringify(values.contact),
              group,
            },
            {
              key: "about.skills",
              value: JSON.stringify(values.skills),
              group,
            },
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
            {
              key: "about.social",
              value: JSON.stringify(values.social),
              group,
            },
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
                typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value),
              group,
            })
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

        // Refresh settings after saving
        await fetchSettings();
        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to save settings");
        setError(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [toast, fetchSettings]
  );

  return {
    settings,
    loading,
    isSaving,
    error,
    fetchSettings,
    saveSettings,
  };
}

// Helper function to flatten nested objects
function flattenObject(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, unknown> {
  return Object.keys(obj).reduce((acc: Record<string, unknown>, k: string) => {
    const pre = prefix.length ? prefix + "." : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(
        acc,
        flattenObject(obj[k] as Record<string, unknown>, pre + k)
      );
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}
