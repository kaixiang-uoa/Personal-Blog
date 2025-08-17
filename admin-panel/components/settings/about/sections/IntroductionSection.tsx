"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/inputs/form";
import { Textarea } from "@/components/ui/inputs/textarea";
import { TabsContent } from "@/components/ui/navigation/tabs";
import { AboutFormSectionProps } from "@/types/settings";

export function IntroductionSection({ form }: AboutFormSectionProps) {
  return (
    <TabsContent value="intro" className="space-y-4">
      <FormField
        control={form.control}
        name="intro"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Introduction (English)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell people about yourself..."
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Supports HTML formatting for rich content
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="intro_zh"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Introduction (Chinese)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="用中文介绍自己..."
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>
  );
}
