"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export const dynamic = "force-dynamic";

export default function Contact() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 定义表单验证模式
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("nameValidation"),
    }),
    email: z.string().email({
      message: t("emailValidation"),
    }),
    subject: z.string().min(5, {
      message: t("subjectValidation"),
    }),
    message: z.string().min(10, {
      message: t("messageValidation"),
    }),
  });

  // 初始化表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 表单提交处理
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // 调用后端API发送表单数据
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '提交失败');
      }
      
      toast({
        title: t("successTitle"),
        description: t("successMessage"),
      });
      
      // 重置表单
      form.reset();
    } catch (error) {
      console.error('提交表单时出错:', error);
      toast({
        title: t("errorTitle"),
        description: typeof error === 'object' && error !== null && 'message' in error 
          ? (error as Error).message 
          : t("errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("title")}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
        {t("description")}
      </p>
      
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nameLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("namePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emailLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("emailPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subjectLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("subjectPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("messageLabel")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("messagePlaceholder")} 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("alternativeTitle")}</h2>
        <p className="mb-2">
          <span className="font-semibold">{t("emailTitle")}: </span>
          <a href="mailto:your-email@example.com" className="text-cyan-500 hover:text-cyan-400">
            your-email@example.com
          </a>
        </p>
        <p className="mb-2">
          <span className="font-semibold">{t("socialTitle")}: </span>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 mx-2">
            Twitter
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 mx-2">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 mx-2">
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
