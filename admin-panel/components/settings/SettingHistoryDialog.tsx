import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Clock, RotateCcw, Eye, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ApiService from "@/lib/api-service"
import { formatDistanceToNow } from 'date-fns'
import type { ApiResponse } from "@/types/api"

interface SettingHistoryItem {
  _id: string
  key: string
  oldValue: any
  newValue: any
  action: 'create' | 'update' | 'delete'
  description: string
  createdAt: string
  changedBy?: {
    _id: string
    name: string
    email: string
  }
}

interface SettingHistoryResponse extends ApiResponse {
  data: {
    history: SettingHistoryItem[]
    pagination: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
}

interface SettingHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settingKey?: string
  onRollback?: () => void
}

export default function SettingHistoryDialog({ 
  open, 
  onOpenChange,
  settingKey,
  onRollback
}: SettingHistoryDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<SettingHistoryItem[]>([])
  const [isRollingBack, setIsRollingBack] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<SettingHistoryItem | null>(null)
  const [activeTab, setActiveTab] = useState<'history' | 'compare'>('history')
  const isSpecificKey = !!settingKey
  
  // 加载历史记录
  useEffect(() => {
    if (open) {
      loadHistory()
    }
  }, [open, settingKey])
  
  // 根据是否有设置键确定标题
  const title = isSpecificKey 
    ? `History for "${settingKey}"` 
    : "Settings History"
  
  // 加载历史数据
  const loadHistory = async () => {
    try {
      setLoading(true)
      
      const params = settingKey 
        ? { key: settingKey, limit: 20 }
        : { limit: 20 }
        
      // 由于API客户端已返回处理过的响应数据，需要指明类型
      const response = await ApiService.settings.getHistory(params) as unknown as {
        success: boolean;
        data: {
          history: SettingHistoryItem[];
          pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
          };
        };
        message?: string;
      }
      
      if (response.success) {
        setHistory(response.data?.history || [])
      } else {
        toast({
          title: "Failed to load history",
          description: "Unable to retrieve setting history data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading setting history:", error)
      toast({
        title: "Error",
        description: "An error occurred while loading history",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  
  // 执行回滚操作
  const handleRollback = async (historyId: string) => {
    try {
      setIsRollingBack(true)
      
      // 由于API客户端已返回处理过的响应数据，需要指明类型
      const response = await ApiService.settings.rollback(historyId) as unknown as ApiResponse
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Setting has been rolled back to the selected version",
        })
        
        // 重新加载历史记录
        await loadHistory()
        
        // 通知父组件刷新设置
        if (onRollback) {
          onRollback()
        }
      } else {
        toast({
          title: "Rollback Failed",
          description: response.message || "Unable to rollback to the selected version",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rolling back setting:", error)
      toast({
        title: "Error",
        description: "An error occurred during rollback",
        variant: "destructive",
      })
    } finally {
      setIsRollingBack(false)
    }
  }
  
  // 选择版本进行比较
  const handleSelectVersion = (item: SettingHistoryItem) => {
    setSelectedVersion(item)
    setActiveTab('compare')
  }
  
  // 格式化数据值为可读字符串
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) {
      return 'null'
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2)
    }
    
    return String(value)
  }
  
  // 获取操作的颜色样式
  const getActionColor = (action: string): string => {
    switch (action) {
      case 'create': return 'text-green-500'
      case 'update': return 'text-blue-500'
      case 'delete': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }
  
  // 格式化时间
  const formatTime = (dateString: string): string => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return dateString
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            View and manage setting history
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'history' | 'compare')} className="mt-4">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="compare" disabled={!selectedVersion}>Compare</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No history records found</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item._id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className={`font-medium ${getActionColor(item.action)} capitalize`}>
                            {item.action}
                          </span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {item.key}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSelectVersion(item)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {item.action !== 'create' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRollback(item._id)}
                              disabled={isRollingBack}
                            >
                              {isRollingBack ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              ) : (
                                <RotateCcw className="h-4 w-4 mr-1" />
                              )}
                              Rollback
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTime(item.createdAt)}</span>
                        {item.changedBy && (
                          <>
                            <span className="mx-1">•</span>
                            <span>By {item.changedBy.name || item.changedBy.email}</span>
                          </>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-sm mt-2 italic">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
          
          <TabsContent value="compare" className="mt-4">
            {selectedVersion && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {selectedVersion.key}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getActionColor(selectedVersion.action)} bg-opacity-10 border border-current`}>
                    {selectedVersion.action.toUpperCase()}
                  </span>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Previous Value</h4>
                    <div className="border rounded-md p-3 bg-muted/30">
                      <pre className="text-xs overflow-auto whitespace-pre-wrap">
                        {formatValue(selectedVersion.oldValue)}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">New Value</h4>
                    <div className="border rounded-md p-3 bg-muted/30">
                      <pre className="text-xs overflow-auto whitespace-pre-wrap">
                        {formatValue(selectedVersion.newValue)}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Changed {formatTime(selectedVersion.createdAt)}</p>
                  {selectedVersion.description && (
                    <p className="mt-1 italic">{selectedVersion.description}</p>
                  )}
                </div>
                
                {selectedVersion.action !== 'create' && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleRollback(selectedVersion._id)}
                      disabled={isRollingBack}
                    >
                      {isRollingBack ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Rolling Back...
                        </>
                      ) : (
                        <>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Rollback to This Version
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 