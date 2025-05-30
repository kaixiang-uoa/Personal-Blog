"use client"

import { useState, useRef } from "react"
import { 
  Database, 
  Download, 
  Upload, 
  History, 
  FileText, 
  Code, 
  Loader2 
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { settingsService } from "@/lib/services/settings-service"

import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { downloadSettingsJSON } from "@/lib/settings/utils"

interface SettingsActionsProps {
  onHistoryOpen: (key?: string) => void
  onRefresh: () => void
}

export default function SettingsActions({ onHistoryOpen, onRefresh }: SettingsActionsProps) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 导出设置为JSON文件
  const exportSettings = async () => {
    try {
      setIsExporting(true)
      
      // 1. 获取所有设置数据
      const response = await settingsService.getAll()
      const settingsData = response.data
      
      if (!settingsData) {
        throw new Error('No settings data available for export')
      }
      
      // 2. 为JSON添加元数据
      const exportData = {
        metadata: {
          exportDate: new Date().toISOString(),
          version: '1.0',
          environment: process.env.NODE_ENV || 'development'
        },
        settings: settingsData
      }
      
      // 3. 下载文件
      downloadSettingsJSON(
        exportData, 
        `blog-settings-${new Date().toISOString().slice(0, 10)}.json`
      )
      
      toast({
        title: "Export Successful",
        description: "Settings have been exported to JSON file",
      })
    } catch (error) {
      console.error("Failed to export settings", error)
      toast({
        title: "Export Failed",
        description: "Unable to export settings, please try again",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }
  
  // 导出环境特定的设置
  const exportEnvironmentSettings = async (env: 'development' | 'production' | 'staging') => {
    try {
      setIsExporting(true)
      
      // 获取环境特定的设置
      const exportData = await settingsService.exportForEnvironment(env)
      
      // 下载文件
      downloadSettingsJSON(
        exportData,
        `blog-settings-${env}-${new Date().toISOString().slice(0, 10)}.json`
      )
      
      toast({
        title: "Export Successful",
        description: `Settings have been exported for ${env} environment`,
      })
    } catch (error) {
      console.error(`Failed to export ${env} settings`, error)
      toast({
        title: "Export Failed",
        description: "Unable to export environment settings",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }
  
  // 触发文件选择对话框
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImportFile(file)
    if (file) {
      setShowImportDialog(true)
    }
  }
  
  // 从JSON文件导入设置
  const importSettings = async () => {
    if (!importFile) {
      toast({
        title: "No File Selected",
        description: "Please select a settings file to import",
        variant: "destructive",
      })
      return
    }
    
    try {
      setIsImporting(true)
      
      // 1. 读取文件内容
      const fileContent = await importFile.text()
      const importData = JSON.parse(fileContent)
      
      // 2. 验证导入数据格式
      if (!importData.settings) {
        throw new Error('Invalid settings file format')
      }
      
      // 3. 转换为可导入的格式
      const settingsToImport = []
      
      for (const [key, value] of Object.entries(importData.settings)) {
        // 根据点号分割将扁平化的设置分组
        if (key.includes('.')) {
          settingsToImport.push({ key, value })
        } else {
          // 对于对象类型的设置，如general, posts等，进行展开
          const obj = value as Record<string, any>
          if (typeof obj === 'object' && obj !== null) {
            for (const [subKey, subValue] of Object.entries(obj)) {
              settingsToImport.push({
                key: `${key}.${subKey}`,
                value: subValue
              })
            }
          }
        }
      }
      
      // 4. 使用批量更新API保存设置
      await settingsService.batchUpdate(settingsToImport)
      
      // 5. 刷新页面以获取最新设置
      onRefresh()
      
      toast({
        title: "Import Successful",
        description: "Settings have been imported and applied",
      })
      
      setShowImportDialog(false)
    } catch (error) {
      console.error("Failed to import settings", error)
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unable to import settings, please check file format",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
      setImportFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

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
                <DropdownMenuItem onClick={() => exportEnvironmentSettings('development')}>
                  <Code className="h-4 w-4 mr-2" />
                  Development
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportEnvironmentSettings('staging')}>
                  <Code className="h-4 w-4 mr-2" />
                  Staging
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportEnvironmentSettings('production')}>
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

      {/* 隐藏的文件输入元素 */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* 导入确认对话框 */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to import settings from <strong>{importFile?.name}</strong>?
              <br />
              This action will overwrite your current settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setImportFile(null)}>Cancel</AlertDialogCancel>
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
  )
} 