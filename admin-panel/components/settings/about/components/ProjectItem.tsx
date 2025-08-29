"use client";

import { X } from "lucide-react";
import { useState } from "react";

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
  const [inputValue, setInputValue] = useState('');
  
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
          name={`projects.${index}.tech`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input 
                    placeholder="Enter technology and press Enter (e.g., React, Node.js)"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value) {
                          const newTech = value;
                          const currentTechArray = field.value || [];
                          const updatedTechArray = [...currentTechArray, newTech];
                          field.onChange(updatedTechArray);
                          setInputValue('');
                        }
                      }
                    }}
                  />
                  {field.value && field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md flex items-center gap-1"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => {
                              const newTechArray = field.value?.filter((_, i) => i !== techIndex) || [];
                              field.onChange(newTechArray);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`projects.${index}.link`}
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
