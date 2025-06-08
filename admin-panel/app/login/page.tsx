"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/inputs/button"
import { Checkbox } from "@/components/ui/inputs/checkbox"
import { Input } from "@/components/ui/inputs/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { useToast } from "@/hooks/ui/use-toast"
import AuthLayout from "@/components/layouts/auth-layout"
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTypedForm } from "@/types/form.types"

// Login form validation schema - keep UI field names unchanged
const formSchema = z.object({
  email: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
})

// Type for form values
type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth() // 使用 AuthContext 的 login 方法
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Use custom form hook to simplify type handling
  const form = useTypedForm(formSchema, {
      email: "",
      password: "",
      rememberMe: false,
  })

  // Login handler function
  const onSubmit = form.handleSubmit(async (values: FormValues) => {
    try {
      setIsLoading(true)
      
      // 使用 AuthContext 提供的 login 方法
      await login({
        email: values.email, 
        password: values.password,
        rememberMe: values.rememberMe
      })

      // 登录成功提示
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })

      // 检查是否有保存的重定向目标
      const redirectPath = typeof window !== 'undefined' 
        ? sessionStorage.getItem('redirectAfterLogin') 
        : null;
        
      // 重定向到保存的页面或默认到仪表板
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      // 错误处理
      let errorMessage = "用户名或密码不正确，请重试"
      
      // 处理特定错误
      if (error.loginError && error.originalMessage) {
        errorMessage = error.originalMessage
      } else if (error.response?.data?.message) {
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
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          {...field} 
                          disabled={isLoading} 
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
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
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Blog Management System</p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
