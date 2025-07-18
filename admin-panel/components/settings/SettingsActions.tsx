"use client";

import {
  Database,
  Download,
  Upload,
  History,
  FileText,
  Code,
  Loader2,
} from "lucide-react";
import { useState, useRef } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/feedback/alert-dialog";
import { Button } from "@/components/ui/inputs/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/navigation/dropdown-menu";
import { useToast } from "@/hooks/ui/use-toast";
import { apiService } from "@/lib/api";
import { downloadSettingsJSON } from "@/lib/utils";

interface SettingsActionsProps {
  onHistoryOpen: (key?: string) => void;
  onRefresh: () => void;
}

export default function SettingsActions({
  onHistoryOpen,
  onRefresh,
}: SettingsActionsProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // export settings to json file
  const exportSettings = async () => {
    try {
      setIsExporting(true);

      // 1. get all settings data
      const response = await apiService.get("/settings");
      const settingsData = response.data;

      if (!settingsData) {
        throw new Error("No settings data available for export");
      }

      // 2. add metadata to json
      const exportData = {
        metadata: {
          exportDate: new Date().toISOString(),
          version: "1.0",
          environment: process.env.NODE_ENV || "development",
        },
        settings: settingsData,
      };

      // 3. download file
      downloadSettingsJSON(
        exportData,
        `blog-settings-${new Date().toISOString().slice(0, 10)}.json`,
      );

      toast({
        title: "Export Successful",
        description: "Settings have been exported to JSON file",
      });
    } catch (error) {
      console.error("Failed to export settings", error);
      toast({
        title: "Export Failed",
        description: "Unable to export settings, please try again",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // export environment specific settings
  const exportEnvironmentSettings = async (
    env: "development" | "production" | "staging",
  ) => {
    try {
      setIsExporting(true);

      // get environment specific settings
      const exportData = await apiService.get("/settings/export", {
        params: { environment: env },
      });

      // download file
      downloadSettingsJSON(
        exportData,
        `blog-settings-${env}-${new Date().toISOString().slice(0, 10)}.json`,
      );

      toast({
        title: "Export Successful",
        description: `Settings have been exported for ${env} environment`,
      });
    } catch (error) {
      console.error(`Failed to export ${env} settings`, error);
      toast({
        title: "Export Failed",
        description: "Unable to export environment settings",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // trigger file select dialog
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // handle file select
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImportFile(file);
    if (file) {
      setShowImportDialog(true);
    }
  };

  // import settings from json file
  const importSettings = async () => {
    if (!importFile) {
      toast({
        title: "No File Selected",
        description: "Please select a settings file to import",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsImporting(true);

      // 1. read file content
      const fileContent = await importFile.text();
      const importData = JSON.parse(fileContent);

      // 2. validate import data format
      if (!importData.settings) {
        throw new Error("Invalid settings file format");
      }

      // 3. convert to importable format
      const settingsToImport = [];

      for (const [key, value] of Object.entries(importData.settings)) {
        // split by dot and group flattened settings
        if (key.includes(".")) {
          settingsToImport.push({ key, value });
        } else {
          // for object type settings, such as general, posts, etc., expand
          const obj = value as Record<string, any>;
          if (typeof obj === "object" && obj !== null) {
            for (const [subKey, subValue] of Object.entries(obj)) {
              settingsToImport.push({
                key: `${key}.${subKey}`,
                value: subValue,
              });
            }
          }
        }
      }

      // 4. use batch update api to save settings
      await apiService.put("/settings/batch", settingsToImport);

      // 5. refresh page to get latest settings
      onRefresh();

      toast({
        title: "Import Successful",
        description: "Settings have been imported and applied",
      });

      setShowImportDialog(false);
    } catch (error) {
      console.error("Failed to import settings", error);
      toast({
        title: "Import Failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to import settings, please check file format",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      setImportFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Settings Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings Management</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={exportSettings} disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Settings"}
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileText className="h-4 w-4 mr-2" />
              Export for Environment
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => exportEnvironmentSettings("development")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Development
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => exportEnvironmentSettings("staging")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Staging
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => exportEnvironmentSettings("production")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Production
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem onClick={triggerFileSelect}>
            <Upload className="h-4 w-4 mr-2" />
            Import Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onHistoryOpen()}>
            <History className="h-4 w-4 mr-2" />
            View Settings History
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* hidden file input element */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* import confirm dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to import settings from{" "}
              <strong>{importFile?.name}</strong>?
              <br />
              This action will overwrite your current settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setImportFile(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={importSettings} disabled={isImporting}>
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Import"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
