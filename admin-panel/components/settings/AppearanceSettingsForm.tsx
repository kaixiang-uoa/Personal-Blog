"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appearanceFormSchema } from "@/lib/validators/settings-schemas"
import { AppearanceSettingsFormProps } from "@/types/settings"

import { Form } from "@/components/ui/inputs/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/inputs/button"
import { Loader2 } from "lucide-react"
import BannerImageSelector from "@/components/settings/BannerImageSelector"

export default function AppearanceSettingsForm({
  defaultValues,
  onSubmit,
  loading,
  isSaving
}: AppearanceSettingsFormProps) {
  const form = useForm({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Banner Images</CardTitle>
            <CardDescription>
              Configure banner images for different pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BannerImageSelector
                label="Home Banner"
                value={form.watch("homeBanner")}
                onChange={(url: string) => form.setValue("homeBanner", url)}
              />
              <BannerImageSelector
                label="Home Banner (Mobile)"
                value={form.watch("homeBannerMobile")}
                onChange={(url: string) => form.setValue("homeBannerMobile", url)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BannerImageSelector
                label="About Banner"
                value={form.watch("aboutBanner")}
                onChange={(url: string) => form.setValue("aboutBanner", url)}
              />
              <BannerImageSelector
                label="About Banner (Mobile)"
                value={form.watch("aboutBannerMobile")}
                onChange={(url: string) => form.setValue("aboutBannerMobile", url)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BannerImageSelector
                label="Contact Banner"
                value={form.watch("contactBanner")}
                onChange={(url: string) => form.setValue("contactBanner", url)}
              />
              <BannerImageSelector
                label="Contact Banner (Mobile)"
                value={form.watch("contactBannerMobile")}
                onChange={(url: string) => form.setValue("contactBannerMobile", url)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading || isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
} 