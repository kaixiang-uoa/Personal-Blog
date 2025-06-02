import { useForm } from 'react-hook-form';
import { CategoryFormData, CategoryFormProps } from '@/types/category';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from '@/hooks/useLocale';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryFormSchema } from '@/lib/validation/form-validation';
import type { z } from 'zod';

export function CategoryForm({ onSubmit, defaultValues }: CategoryFormProps) {
  const { locale } = useLocale();
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: { zh: '', en: '' },
      slug: '',
      description: { zh: '', en: '' },
      ...defaultValues
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name.zh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分类名称（中文）</FormLabel>
                <FormControl>
                  <Input placeholder="请输入中文名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name.en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分类名称（英文）</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter English name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="请输入 slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="description.zh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述（中文）</FormLabel>
                <FormControl>
                  <Textarea placeholder="请输入中文描述" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description.en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述（英文）</FormLabel>
                <FormControl>
                  <Textarea placeholder="Please enter English description" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </form>
    </Form>
  );
} 