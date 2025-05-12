'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Navbar from '@/app/components/Navbar';
import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { API_BASE_URL } from '@/services/api';

export const dynamic = 'force-dynamic';

export default function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 定义表单验证模式
  const formSchema = z.object({
    name: z.string().min(1, {
      message: t('nameValidation'),
    }),
    email: z.string().email({
      message: t('emailValidation'),
    }),
    subject: z.string().min(2, {
      message: t('subjectValidation'),
    }),
    message: z.string().min(5, {
      message: t('messageValidation'),
    }),
  });

  // 初始化表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // 表单提交处理
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // 调用后端API发送表单数据
      const response = await axios.post(`${API_BASE_URL}/contact`, values);

      if (response.status === 200) {
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });

        // 重置表单
        form.reset();
      }
    } catch (error: any) {
      console.error('提交表单时出错:', error);
      toast({
        title: t('errorTitle'),
        description: error.response?.data?.message || t('errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4">{t('title')}</h1>
          <p className="text-gray-400 mb-8 text-lg">
            {t('description')}
          </p>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">{t('nameLabel')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('namePlaceholder')} 
                            {...field} 
                            className="bg-gray-800/70 border-gray-700 text-gray-200 focus:border-cyan-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">{t('emailLabel')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('emailPlaceholder')} 
                            {...field} 
                            className="bg-gray-800/70 border-gray-700 text-gray-200 focus:border-cyan-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">{t('subjectLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('subjectPlaceholder')} 
                          {...field} 
                          className="bg-gray-800/70 border-gray-700 text-gray-200 focus:border-cyan-600"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">{t('messageLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('messagePlaceholder')}
                          className="min-h-32 bg-gray-800/70 border-gray-700 text-gray-200 focus:border-cyan-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-cyan-700 hover:bg-cyan-600 text-white" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </main>
  );
}
