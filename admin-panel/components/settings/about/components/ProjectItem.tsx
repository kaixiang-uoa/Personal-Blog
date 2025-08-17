"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/inputs/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/inputs/form";
import { Input } from "@/components/ui/inputs/input";
import { Textarea } from "@/components/ui/inputs/textarea";
import { AboutProjectItemProps } from "@/types/settings";

export function ProjectItem({ form, index, onRemove }: AboutProjectItemProps) {
  return (
    <div className="mb-6 rounded-md border p-4 bg-background">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Project #{index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name={`projects.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`projects.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the project..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`projects.${index}.technologies`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <Input placeholder="React, Node.js, MongoDB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`projects.${index}.url`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username/project"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
