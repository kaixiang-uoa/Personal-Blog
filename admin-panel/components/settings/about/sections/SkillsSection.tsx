"use client";

import { Plus, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/inputs/button";
import { FormControl, FormField, FormItem } from "@/components/ui/inputs/form";
import { Input } from "@/components/ui/inputs/input";
import { TabsContent } from "@/components/ui/navigation/tabs";
import { AboutFormSectionProps } from "@/types/settings";

export function SkillsSection({ form }: AboutFormSectionProps) {
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" });

  return (
    <TabsContent value="skills" className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skillFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name={`skills.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        placeholder="Skill name"
                        {...field}
                        className="w-auto"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendSkill("")}
          className="mt-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
    </TabsContent>
  );
}
