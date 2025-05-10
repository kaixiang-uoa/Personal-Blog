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
import ApiService from "@/lib/api-service"

// Settings data type
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

// Form validation schemas
const generalFormSchema = z.object({
  siteName: z.string().min(1, { message: "Site name cannot be empty" }),
  siteDescription: z.string(),
  siteUrl: z.string().url({ message: "Please enter a valid URL" }),
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

  // Create form instances
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
        setLoading(true)
        
        // Fetch settings from API
        const response = await ApiService.settings.getAll()
        const data = response.data
        
        if (data) {
          setSettings(data)

          // Update form default values
          if (data.general) generalForm.reset(data.general)
          if (data.posts) postsForm.reset(data.posts)
          if (data.appearance) appearanceForm.reset(data.appearance)
          if (data.advanced) advancedForm.reset(data.advanced)
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

    fetchSettings()
  }, [toast, generalForm, postsForm, appearanceForm, advancedForm])

  // Submit general settings
  const onGeneralSubmit = async (values: z.infer<typeof generalFormSchema>) => {
    await saveSettings("general", values)
  }

  // Submit posts settings
  const onPostsSubmit = async (values: z.infer<typeof postsFormSchema>) => {
    await saveSettings("posts", values)
  }

  // Submit appearance settings
  const onAppearanceSubmit = async (values: z.infer<typeof appearanceFormSchema>) => {
    await saveSettings("appearance", values)
  }

  // Submit advanced settings
  const onAdvancedSubmit = async (values: z.infer<typeof advancedFormSchema>) => {
    await saveSettings("advanced", values)
  }

  // General method to save settings
  const saveSettings = async (section: keyof Settings, values: any) => {
    try {
      setIsSaving(true)

      // Save settings using API
      await ApiService.settings.update(section, values)

      // Update local state
      if (settings) {
        setSettings({
          ...settings,
          [section]: values,
        })
      }

      toast({
        title: "Saved Successfully",
        description: "Settings have been updated",
      })
    } catch (error) {
      console.error("Failed to save settings", error)
      toast({
        title: "Save Failed",
        description: "Unable to save settings, please try again",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Manage global configurations and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Configure your blog's basic information</CardDescription>
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
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Blog" {...field} />
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
                          <FormLabel>Site Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your blog..." {...field} />
                          </FormControl>
                          <FormDescription>This will be displayed on your homepage and meta description</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="siteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site URL</FormLabel>
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
                          <FormLabel>Meta Keywords</FormLabel>
                          <FormControl>
                            <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                          </FormControl>
                          <FormDescription>Comma-separated list of keywords for SEO</FormDescription>
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Posts Settings */}
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>Configure how your blog posts are displayed and interacted with</CardDescription>
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
                            <FormLabel>Posts Per Page</FormLabel>
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
                            <FormLabel>Default Category</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>Default category for new posts</FormDescription>
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
                          <FormLabel>Excerpt Length (characters)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={10}
                              max={1000}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>Maximum characters for automatically generated excerpts</FormDescription>
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
                            <FormLabel>Show Author Information</FormLabel>
                            <FormDescription>Display author name and avatar on post pages</FormDescription>
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
                            <FormLabel>Enable Comments</FormLabel>
                            <FormDescription>Allow visitors to comment on posts</FormDescription>
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
                            <FormLabel>Moderate Comments</FormLabel>
                            <FormDescription>Comments require approval before being displayed</FormDescription>
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your blog</CardDescription>
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
                          <FormLabel>Theme Mode</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select theme mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Choose the default theme mode for your blog</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: field.value }} />
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                          </div>
                          <FormDescription>Enter a HEX color value, e.g., #0070f3</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="fontFamily"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Family</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select font" />
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
                            <FormLabel>Enable RTL Mode</FormLabel>
                            <FormDescription>Right-to-left text layout for languages like Arabic</FormDescription>
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
                            <FormLabel>Show Sidebar</FormLabel>
                            <FormDescription>Display a sidebar with categories, tags, and recent posts</FormDescription>
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced system options for experienced users only</CardDescription>
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
                          <FormLabel>Cache Timeout (seconds)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>Set to 0 to disable caching</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={advancedForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>API key for external service authentication</FormDescription>
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
                            <FormLabel>Debug Mode</FormLabel>
                            <FormDescription>Enable detailed error messages and logging</FormDescription>
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
