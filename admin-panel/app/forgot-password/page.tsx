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
import { Loader2, ArrowLeft } from "lucide-react"
import { useTypedForm } from "@/types/form.types"

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Use custom form hook
  const form = useTypedForm(formSchema, {
    email: "",
  })

  // Form submission handler
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsLoading(true)
      
      // In a real implementation, we would call an API to send a password reset email
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      
      toast({
        title: "Request Submitted",
        description: "If your email is registered with us, you will receive password reset instructions shortly.",
      })
    } catch (error: any) {
      let errorMessage = "Failed to send password reset email. Please try again."
      
      if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message
      }
      
      toast({
        title: "Request Failed",
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
          <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            {isSubmitted 
              ? "Check your email for instructions to reset your password" 
              : "Enter your email address and we'll send you instructions to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Please check your inbox and follow the instructions in the email we sent to reset your password.
              </p>
              <p className="text-sm text-muted-foreground">
                If you don't receive an email within a few minutes, please check your spam folder.
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setIsSubmitted(false)}
              >
                Try again with a different email
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </Button>
              </form>
            </Form>
          )}
          
          <div className="mt-6 text-center">
            <Link href="/login" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Blog Management System</p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
} 