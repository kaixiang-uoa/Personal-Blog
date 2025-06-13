"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/inputs/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { Input } from "@/components/ui/inputs/input"
import { Skeleton } from "@/components/ui/data-display/skeleton"
import { postsFormSchema } from "@/lib/validators/settings-schemas"

interface PostsSettingsFormProps {
  defaultValues: z.infer<typeof postsFormSchema>
  onSubmit: (values: z.infer<typeof postsFormSchema>) => Promise<void>
  loading: boolean
  isSaving: boolean
}

export default function PostsSettingsForm({
  defaultValues, 
  onSubmit,
  loading,
  isSaving
}: PostsSettingsFormProps) {
  const form = useForm<z.infer<typeof postsFormSchema>>({
    resolver: zodResolver(postsFormSchema),
    defaultValues,
  })

  return (
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
          <Form {...form}>
            <form id="posts-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
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
              <Button type="submit" disabled={loading || isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
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
  )
} 