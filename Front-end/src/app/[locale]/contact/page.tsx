'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Navbar, PageBanner, PageSEO, Footer } from '@/components';
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
import { useParams, usePathname } from 'next/navigation';

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
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Banner settings
  const defaultBannerUrl = '/images/contact-banner.jpg';

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
      <PageSEO
        locale={locale}
        pathname={pathname}
        type="contact"
        keywords={['contact', 'get in touch', 'message', 'email']}
      />

      {/* Banner section */}
      <PageBanner
        bannerKey="contactBanner"
        title={t('title')}
        height="default"
        defaultImage={defaultBannerUrl}
      />

      {/* Contact form section */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mb-8 text-base">{t('description')}</p>

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
                        <FormLabel className="text-foreground font-medium">
                          {t('nameLabel')}
                        </FormLabel>
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
                        <FormLabel className="text-foreground font-medium">
                          {t('emailLabel')}
                        </FormLabel>
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
                      <FormLabel className="text-foreground font-medium">
                        {t('subjectLabel')}
                      </FormLabel>
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
                      <FormLabel className="text-foreground font-medium">
                        {t('messageLabel')}
                      </FormLabel>
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
      <Footer />
    </main>
  );
}
