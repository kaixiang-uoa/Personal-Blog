import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Clock, RotateCcw, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { settingsService } from "@/lib/services"
import { formatDistanceToNow } from 'date-fns'
import type { SettingHistory } from "@/lib/services/settings-service"

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
  const [history, setHistory] = useState<SettingHistory[]>([])
  const [isRollingBack, setIsRollingBack] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<SettingHistory | null>(null)
  const [activeTab, setActiveTab] = useState<'history' | 'compare'>('history')
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  })
  
  // 加载历史记录
  useEffect(() => {
    if (open) {
      loadHistory()
    }
  }, [open, settingKey])
  
  // 根据是否有设置键确定标题
  const title = settingKey 
    ? `History for "${settingKey}"` 
    : "Settings History"
  
  // 加载历史数据
  const loadHistory = async () => {
    try {
      setLoading(true)
      
      const params = settingKey 
        ? { key: settingKey, limit: pagination.limit, page: pagination.page }
        : { limit: pagination.limit, page: pagination.page }
        
      const response = await settingsService.getHistory(params)
      
      if (response.success && response.data) {
        setHistory(response.data)
        setPagination(response.pagination)
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
      
      const response = await settingsService.rollback(historyId)
      
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
  const handleSelectVersion = (item: SettingHistory) => {
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
                          <span className="font-medium text-blue-500 capitalize">
                            {item.key}
                          </span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(item.createdAt)}
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
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTime(item.createdAt)}</span>
                        {item.changedBy && (
                          <>
                            <span className="mx-1">•</span>
                            <span>By {item.changedBy}</span>
                          </>
                        )}
                      </div>
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
                  <span className="px-2 py-1 rounded-full text-xs text-blue-500 bg-opacity-10 border border-current">
                    {formatTime(selectedVersion.createdAt)}
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
                </div>
                
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