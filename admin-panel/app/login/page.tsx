"use client";

import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import AuthLayout from "@/components/layouts/auth-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/inputs/button";
import { Checkbox } from "@/components/ui/inputs/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/inputs/form";
import { Input } from "@/components/ui/inputs/input";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/ui/use-toast";
import { useTypedForm } from "@/types/index";

// Login form validation schema - keep UI field names unchanged
const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

// Type for form values
type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Use custom form hook to simplify type handling
  const form = useTypedForm(formSchema, {
    email: "",
    password: "",
    rememberMe: false,
  });

  // Login handler function
  const onSubmit = form.handleSubmit(async (values: FormValues) => {
    try {
      setIsLoading(true);
      setApiError(null); //reset error state

      // call login method
      await login(values.email, values.password);

      // if need to remember login state
      if (values.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // login successful toast
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      // check if there is a saved redirect target
      const redirectPath =
        typeof window !== "undefined"
          ? sessionStorage.getItem("redirectAfterLogin")
          : null;

      // redirect to saved page or default to dashboard
      if (redirectPath) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectPath);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      // directly show API returned error message
      const errorMessage = error.message || "Login failed, please try again";
      setApiError(errorMessage);

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="mx-auto h-10 w-10 rounded-md bg-primary flex items-center justify-center mb-2">
            <span className="font-bold text-xl text-primary-foreground">B</span>
          </div>
          <CardTitle className="text-2xl text-center">
            Blog Management System
          </CardTitle>
          <CardDescription className="text-center">
            Enter your account information to log in to the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              {apiError && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm mb-4">
                  {apiError}
                </div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        disabled={isLoading}
                      />
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
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
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
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Blog Management System
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
