"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { BookmarkPlus, Edit, PlusCircle, Tag, Trash2 } from "lucide-react"

// 分类数据类型
interface Category {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

// 标签数据类型
interface TagType {
  id: string
  name: string
  slug: string
  postCount: number
}

// 表单验证模式
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "分类名称不能少于2个字符" }),
  slug: z
    .string()
    .min(2, { message: "分类别名不能少于2个字符" })
    .regex(/^[a-z0-9-]+$/, {
      message: "别名只能包含小写字母、数字和连字符",
    }),
  description: z.string().optional(),
})

const tagFormSchema = z.object({
  name: z.string().min(2, { message: "标签名称不能少于2个字符" }),
  slug: z
    .string()
    .min(2, { message: "标签别名不能少于2个字符" })
    .regex(/^[a-z0-9-]+$/, {
      message: "别名只能包含小写字母、数字和连字符",
    }),
})

export default function CategoriesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("categories")
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<TagType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingTag, setEditingTag] = useState<TagType | null>(null)

  // 分类表单
  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  })

  // 标签表单
  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // 这里应该替换为真实的API调用
        // const categoriesResponse = await axios.get('/api/v1/categories')
        // const tagsResponse = await axios.get('/api/v1/tags')

        // 模拟数据
        const mockCategories: Category[] = [
          {
            id: "1",
            name: "前端开发",
            slug: "front-end",
            description: "关于前端开发的文章，包括React、Vue等框架",
            postCount: 18,
          },
          {
            id: "2",
            name: "后端开发",
            slug: "back-end",
            description: "后端相关技术文章，包括Node.js、Express等",
            postCount: 12,
          },
          {
            id: "3",
            name: "DevOps",
            slug: "devops",
            description: "关于DevOps、CI/CD流程的文章",
            postCount: 7,
          },
          {
            id: "4",
            name: "TypeScript",
            slug: "typescript",
            description: "TypeScript教程和最佳实践",
            postCount: 9,
          },
          {
            id: "5",
            name: "CSS",
            slug: "css",
            description: "CSS技巧、框架和设计模式",
            postCount: 14,
          },
        ]

        const mockTags: TagType[] = [
          { id: "1", name: "React", slug: "react", postCount: 12 },
          { id: "2", name: "Vue", slug: "vue", postCount: 8 },
          { id: "3", name: "Node.js", slug: "nodejs", postCount: 10 },
          { id: "4", name: "JavaScript", slug: "javascript", postCount: 20 },
          { id: "5", name: "TypeScript", slug: "typescript", postCount: 15 },
          { id: "6", name: "Next.js", slug: "nextjs", postCount: 7 },
          { id: "7", name: "Tailwind", slug: "tailwind", postCount: 9 },
          { id: "8", name: "性能优化", slug: "performance", postCount: 5 },
          { id: "9", name: "状态管理", slug: "state-management", postCount: 6 },
          { id: "10", name: "测试", slug: "testing", postCount: 4 },
        ]

        setCategories(mockCategories)
        setTags(mockTags)
      } catch (error) {
        console.error("Failed to fetch data", error)
        toast({
          title: "获取数据失败",
          description: "请检查网络连接后重试",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // 根据搜索过滤分类和标签
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // 打开新建分类对话框
  const openNewCategoryDialog = () => {
    setEditingCategory(null)
    categoryForm.reset({
      name: "",
      slug: "",
      description: "",
    })
    setCategoryDialogOpen(true)
  }

  // 打开编辑分类对话框
  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory(category)
    categoryForm.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
    })
    setCategoryDialogOpen(true)
  }

  // 处理分类表单提交
  const onCategorySubmit = async (values: z.infer<typeof categoryFormSchema>) => {
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingCategory) {
        // 编辑现有分类
        // 这里应该替换为真实的API调用
        // await axios.put(`/api/v1/categories/${editingCategory.id}`, values)

        setCategories(categories.map((cat) => (cat.id === editingCategory.id ? { ...cat, ...values } : cat)))

        toast({
          title: "更新成功",
          description: `分类 "${values.name}" 已更新`,
        })
      } else {
        // 创建新分类
        // 这里应该替换为真实的API调用
        // const response = await axios.post('/api/v1/categories', values)

        const newCategory: Category = {
          id: Math.random().toString(36).substr(2, 9),
          ...values,
          postCount: 0,
        }

        setCategories([...categories, newCategory])

        toast({
          title: "创建成功",
          description: `分类 "${values.name}" 已创建`,
        })
      }

      setCategoryDialogOpen(false)
    } catch (error) {
      console.error("Failed to save category", error)
      toast({
        title: "保存失败",
        description: "无法保存分类，请重试",
        variant: "destructive",
      })
    }
  }

  // 打开新建标签对话框
  const openNewTagDialog = () => {
    setEditingTag(null)
    tagForm.reset({
      name: "",
      slug: "",
    })
    setTagDialogOpen(true)
  }

  // 打开编辑标签对话框
  const openEditTagDialog = (tag: TagType) => {
    setEditingTag(tag)
    tagForm.reset({
      name: tag.name,
      slug: tag.slug,
    })
    setTagDialogOpen(true)
  }

  // 处理标签表单提交
  const onTagSubmit = async (values: z.infer<typeof tagFormSchema>) => {
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingTag) {
        // 编辑现有标签
        // 这里应该替换为真实的API调用
        // await axios.put(`/api/v1/tags/${editingTag.id}`, values)

        setTags(tags.map((tag) => (tag.id === editingTag.id ? { ...tag, ...values } : tag)))

        toast({
          title: "更新成功",
          description: `标签 "${values.name}" 已更新`,
        })
      } else {
        // 创建新标签
        // 这里应该替换为真实的API调用
        // const response = await axios.post('/api/v1/tags', values)

        const newTag: TagType = {
          id: Math.random().toString(36).substr(2, 9),
          ...values,
          postCount: 0,
        }

        setTags([...tags, newTag])

        toast({
          title: "创建成功",
          description: `标签 "${values.name}" 已创建`,
        })
      }

      setTagDialogOpen(false)
    } catch (error) {
      console.error("Failed to save tag", error)
      toast({
        title: "保存失败",
        description: "无法保存标签，请重试",
        variant: "destructive",
      })
    }
  }

  // 处理删除分类
  const handleDeleteCategory = async (category: Category) => {
    if (confirm(`确定要删除分类 "${category.name}" 吗？如果有文章属于该分类，将会被移动到默认分类。`)) {
      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // 这里应该替换为真实的API调用
        // await axios.delete(`/api/v1/categories/${category.id}`)

        setCategories(categories.filter((cat) => cat.id !== category.id))

        toast({
          title: "删除成功",
          description: `分类 "${category.name}" 已删除`,
        })
      } catch (error) {
        console.error("Failed to delete category", error)
        toast({
          title: "删除失败",
          description: "无法删除分类，请重试",
          variant: "destructive",
        })
      }
    }
  }

  // 处理删除标签
  const handleDeleteTag = async (tag: TagType) => {
    if (confirm(`确定要删除标签 "${tag.name}" 吗？`)) {
      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // 这里应该替换为真实的API调用
        // await axios.delete(`/api/v1/tags/${tag.id}`)

        setTags(tags.filter((t) => t.id !== tag.id))

        toast({
          title: "删除成功",
          description: `标签 "${tag.name}" 已删除`,
        })
      } catch (error) {
        console.error("Failed to delete tag", error)
        toast({
          title: "删除失败",
          description: "无法删除标签，请重试",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">分类和标签管理</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={openNewCategoryDialog} className="flex items-center gap-1">
            <BookmarkPlus className="h-4 w-4" />
            新建分类
          </Button>
          <Button onClick={openNewTagDialog} variant="outline" className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            新建标签
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="搜索分类或标签..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="categories">分类</TabsTrigger>
            <TabsTrigger value="tags">标签</TabsTrigger>
          </TabsList>

          {/* Categories Tab Content */}
          <TabsContent value="categories" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                // 加载态
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-5 w-36" />
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center justify-between">
                        {category.name}
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditCategoryDialog(category)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">编辑</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">删除</span>
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">/{category.slug}</span>
                          <Badge variant="outline">{category.postCount} 篇文章</Badge>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{category.description || "暂无描述"}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <p className="text-muted-foreground mb-4">没有找到符合条件的分类</p>
                    <Button onClick={openNewCategoryDialog} className="flex items-center gap-1">
                      <PlusCircle className="h-4 w-4" />
                      新建分类
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Tags Tab Content */}
          <TabsContent value="tags" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {loading ? (
                // 加载态
                Array.from({ length: 12 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </CardHeader>
                  </Card>
                ))
              ) : filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <Card key={tag.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {tag.name}
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditTagDialog(tag)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">编辑</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteTag(tag)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">删除</span>
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">/{tag.slug}</span>
                          <Badge variant="outline">{tag.postCount} 篇文章</Badge>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <Card className="md:col-span-3 lg:col-span-4">
                  <CardContent className="flex flex-col items-center justify-center h-32">
                    <p className="text-muted-foreground mb-4">没有找到符合条件的标签</p>
                    <Button onClick={openNewTagDialog} className="flex items-center gap-1">
                      <PlusCircle className="h-4 w-4" />
                      新建标签
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 分类表单对话框 */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "编辑分类" : "新建分类"}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "修改分类信息。保存后会立即更新所有关联的文章。"
                : "创建一个新的文章分类。分类用于对文章进行基础归类。"}
            </DialogDescription>
          </DialogHeader>
          <Form {...categoryForm}>
            <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
              <FormField
                control={categoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>分类名称</FormLabel>
                    <FormControl>
                      <Input placeholder="输入分类名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={categoryForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>分类别名</FormLabel>
                    <FormControl>
                      <Input placeholder="用于URL的别名，如front-end" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={categoryForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>分类描述</FormLabel>
                    <FormControl>
                      <Input placeholder="简要描述该分类的内容范围" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{editingCategory ? "保存修改" : "创建分类"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 标签表单对话框 */}
      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTag ? "编辑标签" : "新建标签"}</DialogTitle>
            <DialogDescription>
              {editingTag
                ? "修改标签信息。保存后会立即更新所有关联的文章。"
                : "创建一个新的文章标签。标签用于更细粒度的文章分类。"}
            </DialogDescription>
          </DialogHeader>
          <Form {...tagForm}>
            <form onSubmit={tagForm.handleSubmit(onTagSubmit)} className="space-y-4">
              <FormField
                control={tagForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标签名称</FormLabel>
                    <FormControl>
                      <Input placeholder="输入标签名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={tagForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标签别名</FormLabel>
                    <FormControl>
                      <Input placeholder="用于URL的别名，如react" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{editingTag ? "保存修改" : "创建标签"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
