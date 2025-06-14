'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Navbar } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { API_BASE_URL } from '@/services/api';
import { useSetting } from '@/contexts/SettingsContext';

export const dynamic = 'force-dynamic';

/**
 * Contact Component
 * 
 * A contact form page that allows users to send messages. The form includes fields for
 * name, email, subject, and message, with validation using Zod schema. The component
 * handles form submission, displays success/error messages using toast notifications,
 * and supports internationalization.
 * 
 * @component
 * @example
 * ```tsx
 * // This component is rendered automatically by Next.js
 * // when navigating to /[locale]/contact
 * ```
 * 
 * @returns {JSX.Element} The contact page layout
 */
export default function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get banner settings from context
  const contactBanner = useSetting('appearance.contactBanner', '/images/contact-banner.jpg');
  const contactBannerMobile = useSetting('appearance.contactBannerMobile', contactBanner);

  // Form validation schema
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

  // Initialize form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  /**
   * Handle form submission
   * @param {z.infer<typeof formSchema>} values - The form values
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Submit form data to API
      const response = await axios.post(`${API_BASE_URL}/contact`, values);

      if (response.status === 200) {
        // Show success message and reset form
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });

        form.reset();
      }
    } catch (error: unknown) {
      // Handle and display error messages
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : t('errorMessage');
      const axiosError = error as { response?: { data?: { message?: string } } };
      const serverMessage = axiosError.response?.data?.message;
      
      toast({
        title: t('errorTitle'),
        description: serverMessage || errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner section */}
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
      
      {/* Contact form section */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('title')}</h2>
          <p className="text-muted-foreground mb-8 text-base">
            {t('description')}
          </p>

          <div className="border border-border rounded-lg p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and email fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">{t('nameLabel')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('namePlaceholder')} 
                            {...field} 
                            className="bg-background border-input text-foreground focus:border-cyan-600 rounded-lg h-10"
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
                        <FormLabel className="text-foreground font-medium">{t('emailLabel')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('emailPlaceholder')} 
                            {...field} 
                            className="bg-background border-input text-foreground focus:border-cyan-600 rounded-lg h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subject field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">{t('subjectLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('subjectPlaceholder')} 
                          {...field} 
                          className="bg-background border-input text-foreground focus:border-cyan-600 rounded-lg h-10"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Message field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">{t('messageLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('messagePlaceholder')}
                          className="min-h-32 bg-background border-input text-foreground focus:border-cyan-600 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg" 
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
