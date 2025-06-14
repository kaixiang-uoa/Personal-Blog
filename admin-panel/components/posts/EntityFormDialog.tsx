import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/feedback/dialog";
import { Button } from "@/components/ui/inputs/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/inputs/form";
import { Input } from "@/components/ui/inputs/input";
import { Textarea } from "@/components/ui/inputs/textarea";
import { EntityFormDialogProps } from "@/types/index";

export function EntityFormDialog({
  open,
  onOpenChange,
  title,
  description,
  defaultValues,
  schema,
  onSubmit,
  fields,
  loading,
  submitText = "Submit",
}: EntityFormDialogProps) {
  const form = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleSubmit = async (values: FieldValues) => {
    await onSubmit(values);
  };

  const renderField = (field: any) => {
    if (field.isI18n) {
      return (
        <div key={field.name} className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${field.name}.zh`}
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>{field.label}（中文）</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea placeholder={field.placeholder} {...f} />
                  ) : (
                    <Input placeholder={field.placeholder} {...f} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${field.name}.en`}
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>{field.label}(English)</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea placeholder={field.placeholder} {...f} />
                  ) : (
                    <Input placeholder={field.placeholder} {...f} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    }

    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: f }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea placeholder={field.placeholder} {...f} />
              ) : (
                <Input placeholder={field.placeholder} {...f} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {fields.map(renderField)}
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : submitText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
