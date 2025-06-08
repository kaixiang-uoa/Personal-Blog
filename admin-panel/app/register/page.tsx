"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/inputs/button"
import { Input } from "@/components/ui/inputs/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { useToast } from "@/hooks/ui/use-toast"
import AuthLayout from "@/components/layouts/auth-layout"
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react"
import { authService } from "@/lib/services/auth-service"
import { useTypedForm } from "@/types/form.types"

// Registration form validation schema
const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Use custom form hook
  const form = useTypedForm(formSchema, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Registration handler function
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsLoading(true)
      
      // Call registration API
      await authService.register({
        username: values.username,
        email: values.email,
        password: values.password
      })

      // Registration successful
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error: any) {
      // Extract error message
      let errorMessage = "Registration failed. Please try again."
      
      if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message
      }
      
      toast({
        title: "Registration Failed",
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
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Enter your information to register</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} disabled={isLoading} />
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
                          placeholder="Create a password" 
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm your password" 
                          {...field} 
                          disabled={isLoading} 
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Blog Management System</p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
} 