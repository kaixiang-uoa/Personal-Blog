"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

// 设置数据类型
interface Settings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    logo: string
    favicon: string
    metaKeywords: string
  }
  posts: {
    postsPerPage: number
    defaultCategory: string
    showAuthor: boolean
    enableComments: boolean
    moderateComments: boolean
    excerptLength: number
  }
  appearance: {
    theme: "light" | "dark" | "system"
    accentColor: string
    fontFamily: string
    enableRTL: boolean
    showSidebar: boolean
  }
  advanced: {
    cacheTimeout: number
    apiKey: string
    debugMode: boolean
  }
}

// 表单验证模式
const generalFormSchema = z.object({
  siteName: z.string().min(1, { message: "网站名称不能为空" }),
  siteDescription: z.string(),
  siteUrl: z.string().url({ message: "请输入有效的URL" }),
  logo: z.string(),
  favicon: z.string(),
  metaKeywords: z.string(),
})

const postsFormSchema = z.object({
  postsPerPage: z.number().int().min(1).max(100),
  defaultCategory: z.string(),
  showAuthor: z.boolean(),
  enableComments: z.boolean(),
  moderateComments: z.boolean(),
  excerptLength: z.number().int().min(10).max(1000),
})

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  accentColor: z.string(),
  fontFamily: z.string(),
  enableRTL: z.boolean(),
  showSidebar: z.boolean(),
})

const advancedFormSchema = z.object({
  cacheTimeout: z.number().int().min(0),
  apiKey: z.string(),
  debugMode: z.boolean(),
})

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // 创建表单实例
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "",
      siteDescription: "",
      siteUrl: "",
      logo: "",
      favicon: "",
      metaKeywords: "",
    },
  })

  const postsForm = useForm<z.infer<typeof postsFormSchema>>({
    resolver: zodResolver(postsFormSchema),
    defaultValues: {
      postsPerPage: 10,
      defaultCategory: "",
      showAuthor: true,
      enableComments: true,
      moderateComments: true,
      excerptLength: 200,
    },
  })

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      accentColor: "#0070f3",
      fontFamily: "Inter",
      enableRTL: false,
      showSidebar: true,
    },
  })

  const advancedForm = useForm<z.infer<typeof advancedFormSchema>>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      cacheTimeout: 3600,
      apiKey: "",
      debugMode: false,
    },
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // 这里应该替换为真实的API调用
        // const response = await axios.get('/api/v1/settings')

        // 模拟数据
        const mockSettings: Settings = {
          general: {
            siteName: "我的技术博客",
            siteDescription: "分享前端开发、Web技术和编程经验的个人博客",
            siteUrl: "https://example.com",
            logo: "/logo.png",
            favicon: "/favicon.ico",
            metaKeywords: "前端开发, React, Next.js, Web开发, 编程",
          },
          posts: {
            postsPerPage: 10,
            defaultCategory: "未分类",
            showAuthor: true,
            enableComments: true,
            moderateComments: true,
            excerptLength: 200,
          },
          appearance: {
            theme: "system",
            accentColor: "#0070f3",
            fontFamily: "Inter",
            enableRTL: false,
            showSidebar: true,
          },
          advanced: {
            cacheTimeout: 3600,
            apiKey: "sk_test_example_key",
            debugMode: false,
          },
        }

        setSettings(mockSettings)

        // 更新表单默认值
        generalForm.reset(mockSettings.general)
        postsForm.reset(mockSettings.posts)
        appearanceForm.reset(mockSettings.appearance)
        advancedForm.reset(mockSettings.advanced)
      } catch (error) {
        console.error("Failed to fetch settings", error)
        toast({
          title: "获取设置失败",
          description: "请检查网络连接后重试",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [toast, generalForm, postsForm, appearanceForm, advancedForm])

  // 提交常规设置
  const onGeneralSubmit = async (values: z.infer<typeof generalFormSchema>) => {
    await saveSettings("general", values)
  }

  // 提交文章设置
  const onPostsSubmit = async (values: z.infer<typeof postsFormSchema>) => {
    await saveSettings("posts", values)
  }

  // 提交外观设置
  const onAppearanceSubmit = async (values: z.infer<typeof appearanceFormSchema>) => {
    await saveSettings("appearance", values)
  }

  // 提交高级设置
  const onAdvancedSubmit = async (values: z.infer<typeof advancedFormSchema>) => {
    await saveSettings("advanced", values)
  }

  // 保存设置通用方法
  const saveSettings = async (section: keyof Settings, values: any) => {
    try {
      setIsSaving(true)

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 这里应该替换为真实的API调用
      // await axios.patch(`/api/v1/settings/${section}`, values)

      // 更新本地状态
      if (settings) {
        setSettings({
          ...settings,
          [section]: values,
        })
      }

      toast({
        title: "保存成功",
        description: "设置已成功更新",
      })
    } catch (error) {
      console.error("Failed to save settings", error)
      toast({
        title: "保存失败",
        description: "无法保存设置，请重试",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">系统设置</h2>
        <p className="text-muted-foreground">管理系统的全局配置和偏好设置</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">常规</TabsTrigger>
          <TabsTrigger value="posts">文章</TabsTrigger>
          <TabsTrigger value="appearance">外观</TabsTrigger>
          <TabsTrigger value="advanced">高级</TabsTrigger>
        </TabsList>

        {/* 常规设置 */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>站点信息</CardTitle>
              <CardDescription>配置您的博客站点的基本信息</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Form {...generalForm}>
                  <form id="general-form" onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-4">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>站点名称</FormLabel>
                          <FormControl>
                            <Input placeholder="我的博客" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>站点描述</FormLabel>
                          <FormControl>
                            <Textarea placeholder="描述您的博客..." {...field} />
                          </FormControl>
                          <FormDescription>这将显示在站点的首页和元描述中</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="siteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>站点URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={generalForm.control}
                        name="logo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                              <Input placeholder="/logo.png" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="favicon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Favicon URL</FormLabel>
                            <FormControl>
                              <Input placeholder="/favicon.ico" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={generalForm.control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta 关键词</FormLabel>
                          <FormControl>
                            <Input placeholder="关键词1, 关键词2, 关键词3" {...field} />
                          </FormControl>
                          <FormDescription>用逗号分隔的关键词列表，用于SEO优化</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="general-form" disabled={loading || isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  "保存更改"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 文章设置 */}
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>文章设置</CardTitle>
              <CardDescription>配置博客文章的显示和交互方式</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Form {...postsForm}>
                  <form id="posts-form" onSubmit={postsForm.handleSubmit(onPostsSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={postsForm.control}
                        name="postsPerPage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>每页文章数</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={100}
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={postsForm.control}
                        name="defaultCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>默认分类</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>新文章的默认分类</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={postsForm.control}
                      name="excerptLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>摘要长度 (字符数)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={10}
                              max={1000}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>自动生成摘要的最大字符数</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={postsForm.control}
                      name="showAuthor"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>显示作者信息</FormLabel>
                            <FormDescription>在文章页面显示作者的姓名和头像</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postsForm.control}
                      name="enableComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>启用评论</FormLabel>
                            <FormDescription>允许访问者在文章下方发表评论</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postsForm.control}
                      name="moderateComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>评论需要审核</FormLabel>
                            <FormDescription>新评论需要管理员审核后才会显示</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!postsForm.watch("enableComments")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="posts-form" disabled={loading || isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  "保存更改"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 外观设置 */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>自定义博客的外观和显示方式</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Form {...appearanceForm}>
                  <form
                    id="appearance-form"
                    onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>主题模式</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择主题模式" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">浅色</SelectItem>
                              <SelectItem value="dark">深色</SelectItem>
                              <SelectItem value="system">跟随系统</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>为您的博客选择默认的主题模式</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>强调色</FormLabel>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                          </div>
                          <FormDescription>输入HEX颜色值，如 #0070f3</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="fontFamily"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>字体</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择字体" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Open Sans">Open Sans</SelectItem>
                              <SelectItem value="Lato">Lato</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={appearanceForm.control}
                      name="enableRTL"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>启用RTL模式</FormLabel>
                            <FormDescription>从右至左的文本布局，适用于阿拉伯语等语言</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="showSidebar"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>显示侧边栏</FormLabel>
                            <FormDescription>在博客前台显示分类、标签和最近文章的侧边栏</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="appearance-form" disabled={loading || isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  "保存更改"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 高级设置 */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>高级设置</CardTitle>
              <CardDescription>配置系统的高级选项，仅限于有经验的用户</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Form {...advancedForm}>
                  <form id="advanced-form" onSubmit={advancedForm.handleSubmit(onAdvancedSubmit)} className="space-y-4">
                    <FormField
                      control={advancedForm.control}
                      name="cacheTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>缓存超时 (秒)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>设置为0禁用缓存</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={advancedForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API 密钥</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>用于外部服务认证的API密钥</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={advancedForm.control}
                      name="debugMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>调试模式</FormLabel>
                            <FormDescription>启用详细的错误信息和日志记录</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="advanced-form" disabled={loading || isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  "保存更改"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
