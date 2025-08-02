"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm , useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import { Button } from "@/components/ui/inputs/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/inputs/form";
import { Input } from "@/components/ui/inputs/input";
import { Textarea } from "@/components/ui/inputs/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { aboutFormSchema } from "@/lib/validators/settings-schemas";

interface AboutSettingsFormProps {
  defaultValues: z.infer<typeof aboutFormSchema>;
  onSubmit: (values: z.infer<typeof aboutFormSchema>) => Promise<void>;
  loading: boolean;
  isSaving: boolean;
}
export default function AboutSettingsForm({
  defaultValues,
  onSubmit,
  loading,
  isSaving,
}: AboutSettingsFormProps) {
  const [activeTab, setActiveTab] = useState("intro");

  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      intro: defaultValues.intro || "",
      intro_zh: defaultValues.intro_zh || "",
      contact: defaultValues.contact || {
        email: "",
        phone: "",
        location: "",
      },
      skills: defaultValues.skills || [],
      education: defaultValues.education || [],
      experience: defaultValues.experience || [],
      projects: defaultValues.projects || [],
      social: defaultValues.social || {
        github: "",
        linkedin: "",
        twitter: "",
        website: "",
      },
    },
    mode: "onChange",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" as any });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control: form.control, name: "education" as any });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control: form.control, name: "experience" as any });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control: form.control, name: "projects" as any });

  const {
    formState: { errors },
  } = form;

  const hasIntroErrors = !!errors.intro || !!errors.intro_zh;
  const hasContactErrors =
    errors.contact?.email || errors.contact?.phone || errors.contact?.location;
  const hasSkillsErrors = !!errors.skills;
  const hasBackgroundErrors =
    !!errors.education || !!errors.experience || !!errors.projects;
  const hasSocialErrors =
    errors.social?.github ||
    errors.social?.linkedin ||
    errors.social?.twitter ||
    errors.social?.website;

  const handleSubmit = async (values: z.infer<typeof aboutFormSchema>) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onError = (errors: any) => {
    console.log("Form errors:", errors);
    if (errors.intro || errors.intro_zh) {
      setActiveTab("intro");
    } else if (errors.contact) {
      setActiveTab("contact");
    } else if (errors.skills) {
      setActiveTab("skills");
    } else if (errors.education || errors.experience || errors.projects) {
      setActiveTab("background");
    } else if (errors.social) {
      setActiveTab("social");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Settings</CardTitle>
        <CardDescription>
          Manage your about page content and personal information
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, onError)}>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
              </div>
            ) : (
              <div className="space-y-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="mb-4">
                    <TabsTrigger
                      value="intro"
                      className={hasIntroErrors ? "text-red-500" : ""}
                    >
                      Introduction {hasIntroErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="contact"
                      className={hasContactErrors ? "text-red-500" : ""}
                    >
                      Contact {hasContactErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className={hasSkillsErrors ? "text-red-500" : ""}
                    >
                      Skills {hasSkillsErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="background"
                      className={hasBackgroundErrors ? "text-red-500" : ""}
                    >
                      Background {hasBackgroundErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="social"
                      className={hasSocialErrors ? "text-red-500" : ""}
                    >
                      Social {hasSocialErrors && "⚠️"}
                    </TabsTrigger>
                  </TabsList>

                  {/* Introduction Tab */}
                  <TabsContent value="intro" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="intro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Introduction (English)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell people about yourself..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Supports HTML formatting for rich content
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="intro_zh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Introduction (Chinese)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="用中文介绍自己..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Contact Tab */}
                  <TabsContent value="contact" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contact.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="contact.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(Optional) Your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact.location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(Optional) Your location"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  {/* Skills Tab */}
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
                        onClick={() => appendSkill("" as any)}
                        className="mt-2"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Background Tab (Education & Experience) */}
                  <TabsContent value="background" className="space-y-6">
                    {/* Education Section */}
                    {educationFields.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Education</h3>
                        </div>
                        <div className="h-96 border rounded-md p-4 overflow-y-auto" style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#d1d5db #f3f4f6'
                        }}>
                          {educationFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="mb-6 rounded-md border p-4 bg-background"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">
                                  Education #{index + 1}
                                </h4>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeEducation(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid gap-4">
                                <FormField
                                  control={form.control}
                                  name={`education.${index}.degree`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Degree/Certificate</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Bachelor of Science"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`education.${index}.institution`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Institution</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="University Name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`education.${index}.year`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Year/Period</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="2018-2022"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`education.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Description (Optional)
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Additional details..."
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Add Education Button */}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendEducation({
                            degree: "",
                            institution: "",
                            year: "",
                            description: "",
                          })
                        }
                        className="w-full max-w-xs"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>

                    {educationFields.length > 0 && experienceFields.length > 0 && <Separator />}

                    {/* Experience Section */}
                    {experienceFields.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Work Experience</h3>
                        </div>
                        <div className="h-96 border rounded-md p-4 overflow-y-auto" style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#d1d5db #f3f4f6'
                        }}>
                          {experienceFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="mb-6 rounded-md border p-4 bg-background"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">
                                  Experience #{index + 1}
                                </h4>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeExperience(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid gap-4">
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.position`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Position</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Software Developer"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.company`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Company</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Company Name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.period`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Period</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="2020-Present"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Description (Optional)
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Job responsibilities and achievements..."
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Add Experience Button */}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendExperience({
                            position: "",
                            company: "",
                            period: "",
                            description: "",
                          })
                        }
                        className="w-full max-w-xs"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>

                    {(educationFields.length > 0 || experienceFields.length > 0) && projectFields.length > 0 && <Separator />}

                    {/* Projects Section */}
                    {projectFields.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Projects</h3>
                        </div>
                        <div className="h-96 border rounded-md p-4 overflow-y-auto" style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#d1d5db #f3f4f6'
                        }}>
                          {projectFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="mb-6 rounded-md border p-4 bg-background"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">
                                  Project #{index + 1}
                                </h4>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeProject(index)}
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
                                        <Input
                                          placeholder="Project Name"
                                          {...field}
                                        />
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
                                          placeholder="Project description..."
                                          {...field}
                                        />
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
                                      <FormLabel>Link (Optional)</FormLabel>
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
                                <FormField
                                  control={form.control}
                                  name={`projects.${index}.tech`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Technologies (Optional)</FormLabel>
                                      <FormControl>
                                        <div className="space-y-2">
                                          {field.value && field.value.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                              {field.value.map((tech: string, techIndex: number) => (
                                                <div key={techIndex} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                                                  <span className="text-sm">{tech}</span>
                                                  <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-4 w-4"
                                                    onClick={() => {
                                                      const newTech = field.value.filter((_: string, i: number) => i !== techIndex);
                                                      field.onChange(newTech);
                                                    }}
                                                  >
                                                    <X className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-sm text-muted-foreground">No technologies added yet</p>
                                          )}
                                          <div className="flex gap-2">
                                            <Input
                                              placeholder="Add technology (e.g., React, Node.js)"
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                  e.preventDefault();
                                                  const input = e.target as HTMLInputElement;
                                                  const value = input.value.trim();
                                                  if (value && !field.value.includes(value)) {
                                                    field.onChange([...field.value, value]);
                                                    input.value = '';
                                                  }
                                                }
                                              }}
                                            />
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                const input = document.querySelector(`input[placeholder*="technology"]`) as HTMLInputElement;
                                                if (input) {
                                                  const value = input.value.trim();
                                                  if (value && !field.value.includes(value)) {
                                                    field.onChange([...field.value, value]);
                                                    input.value = '';
                                                  }
                                                }
                                              }}
                                            >
                                              Add
                                            </Button>
                                          </div>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Add Project Button */}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendProject({
                            name: "",
                            description: "",
                            link: "",
                            tech: [],
                          })
                        }
                        className="w-full max-w-xs"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Social Tab */}
                  <TabsContent value="social" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="social.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://linkedin.com/in/username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            Twitter
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://twitter.com/username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            Personal Website
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://yourwebsite.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={() => form.reset(defaultValues)}
              disabled={loading || isSaving}
            >
              Reset
            </Button>
            <div className="flex flex-col items-end gap-2">
              {Object.keys(errors).length > 0 && (
                <p className="text-sm text-red-500">
                  Please fix the errors in the form before saving
                </p>
              )}
              <Button type="submit" disabled={loading || isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
