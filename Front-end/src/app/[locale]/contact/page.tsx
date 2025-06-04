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
import { useSetting } from '@/contexts/SettingsContext';

export const dynamic = 'force-dynamic';

export default function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // get contact banner image url from settings
  const contactBanner = useSetting('appearance.contactBanner', '/images/contact-banner.jpg');

  // get contact banner image url for mobile from settings  
  const contactBannerMobile = useSetting('appearance.contactBannerMobile', contactBanner);


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


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      
      const response = await axios.post(`${API_BASE_URL}/contact`, values);

      if (response.status === 200) {
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });

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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Banner section similar to home page */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="py-4">
          <div className="flex min-h-[280px] md:min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 md:px-10 pb-8 md:pb-10 banner-image"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${contactBanner}')`
              }}>
            <style jsx>{`
              @media (max-width: 768px) {
                .banner-image {
                  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${contactBannerMobile}') !important;
                }
              }
            `}</style>
            <div className="flex flex-col gap-2 text-left max-w-2xl">
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                {t('title')}
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('title')}</h2>
          <p className="text-[#60748a] mb-8 text-base">
            {t('description')}
          </p>

          <div className="border border-[#f0f2f5] rounded-lg p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#111418] font-medium">{t('nameLabel')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('namePlaceholder')} 
                            {...field} 
                            className="bg-white border-[#dbe0e6] text-[#111418] focus:border-cyan-600 rounded-lg h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#111418] font-medium">{t('emailLabel')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('emailPlaceholder')} 
                            {...field} 
                            className="bg-white border-[#dbe0e6] text-[#111418] focus:border-cyan-600 rounded-lg h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#111418] font-medium">{t('subjectLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('subjectPlaceholder')} 
                          {...field} 
                          className="bg-white border-[#dbe0e6] text-[#111418] focus:border-cyan-600 rounded-lg h-10"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#111418] font-medium">{t('messageLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('messagePlaceholder')}
                          className="min-h-32 bg-white border-[#dbe0e6] text-[#111418] focus:border-cyan-600 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="h-10 px-6 bg-[#111418] hover:bg-[#2a2f35] text-white rounded-lg" 
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
