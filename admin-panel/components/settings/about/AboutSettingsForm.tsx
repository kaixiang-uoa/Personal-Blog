"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import { Button } from "@/components/ui/inputs/button";
import { Form } from "@/components/ui/inputs/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import { aboutFormSchema } from "@/lib/validators/settings-schemas";
import { AboutSettingsFormProps } from "@/types/settings";

import { BackgroundSection } from "./sections/BackgroundSection";
import { ContactSection } from "./sections/ContactSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { SkillsSection } from "./sections/SkillsSection";
import { SocialLinksSection } from "./sections/SocialLinksSection";

export default function AboutSettingsForm({
  defaultValues,
  onSubmit,
  loading,
  isSaving,
}: AboutSettingsFormProps) {
  const [activeTab, setActiveTab] = useState("intro");

  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues,
  });

  // Reset form when defaultValues change (for async data loading)
  useEffect(() => {
    if (defaultValues && !loading) {
      form.reset(defaultValues);
    }
  }, [defaultValues, loading, form]);

  const {
    formState: { errors },
  } = form;

  // Error detection for tab indicators
  const hasIntroErrors = !!(errors.intro || errors.intro_zh);
  const hasContactErrors = !!errors.contact;
  const hasSkillsErrors = !!errors.skills;
  const hasBackgroundErrors = !!(
    errors.education ||
    errors.experience ||
    errors.projects
  );
  const hasSocialErrors = !!errors.social;

  const handleSubmit = async (values: z.infer<typeof aboutFormSchema>) => {
    try {
      await onSubmit(values as unknown as Record<string, unknown>);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onError = (errors: FieldErrors<z.infer<typeof aboutFormSchema>>) => {
    if (errors.intro || errors.intro_zh) {
      setActiveTab("intro");
    } else if (errors.contact) {
      setActiveTab("contact");
    } else if (errors.skills) {
      setActiveTab("skills");
    } else if (errors.education || errors.experience || errors.projects) {
      setActiveTab("background");
    } else if (errors.social) {
      setActiveTab("social");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Settings</CardTitle>
        <CardDescription>
          Manage your about page content and personal information
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, onError)}>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
              </div>
            ) : (
              <div className="space-y-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="mb-4">
                    <TabsTrigger
                      value="intro"
                      className={hasIntroErrors ? "text-red-500" : ""}
                    >
                      Introduction {hasIntroErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="contact"
                      className={hasContactErrors ? "text-red-500" : ""}
                    >
                      Contact {hasContactErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className={hasSkillsErrors ? "text-red-500" : ""}
                    >
                      Skills {hasSkillsErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="background"
                      className={hasBackgroundErrors ? "text-red-500" : ""}
                    >
                      Background {hasBackgroundErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="social"
                      className={hasSocialErrors ? "text-red-500" : ""}
                    >
                      Social {hasSocialErrors && "⚠️"}
                    </TabsTrigger>
                  </TabsList>

                  <IntroductionSection form={form} />
                  <ContactSection form={form} />
                  <SkillsSection form={form} />
                  <BackgroundSection form={form} />
                  <SocialLinksSection form={form} />
                </Tabs>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={() => form.reset(defaultValues)}
              disabled={loading || isSaving}
            >
              Reset
            </Button>
            <div className="flex flex-col items-end gap-2">
              {Object.keys(errors).length > 0 && (
                <p className="text-sm text-red-500">
                  Please fix the errors in the form before saving
                </p>
              )}
              <Button type="submit" disabled={loading || isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
