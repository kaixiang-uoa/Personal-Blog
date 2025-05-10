"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import AuthLayout from "@/components/layouts/auth-layout"
import { Loader2 } from "lucide-react"
import AuthService from "@/lib/auth-service"
import { useTypedForm } from "@/types/form"

// Login form validation schema - keep UI field names unchanged
const formSchema = z.object({
  email: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
})

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Use custom form hook to simplify type handling
  const form = useTypedForm(formSchema, {
      email: "",
      password: "",
      rememberMe: false,
  })

  // Login handler function
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsLoading(true)
      // Use AuthService for login
      await AuthService.login({
        email: values.email, 
        password: values.password,
        rememberMe: values.rememberMe
      })

      // Login successful
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })

      // Redirect to dashboard - use correct route path
      router.push("/dashboard") // Next.js will handle route groups automatically
    } catch (error: any) {
      // 不再打印错误到控制台
      // console.error("Login failed", error)
      
      // 更详细的错误信息提取
      let errorMessage = "用户名或密码不正确，请重试"
      
      // 对于登录页面的401错误优先使用我们增强的错误信息
      if (error.loginError && error.originalMessage) {
        errorMessage = error.originalMessage
      } 
      // 尝试从不同路径获取错误信息，但限制详细程度
      else if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message
      }
      
      toast({
        title: "登录失败",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="mx-auto h-10 w-10 rounded-md bg-primary flex items-center justify-center mb-2">
            <span className="font-bold text-xl text-primary-foreground">B</span>
          </div>
          <CardTitle className="text-2xl text-center">Blog Management System</CardTitle>
          <CardDescription className="text-center">Enter your account information to log in to the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Blog Management System</p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
