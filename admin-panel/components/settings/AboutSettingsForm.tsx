"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, X } from "lucide-react"
import { useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/inputs/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/inputs/form"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/inputs/textarea"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/data-display/skeleton"
import { aboutFormSchema } from "@/lib/validators/settings-schemas"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"

interface AboutSettingsFormProps {
  defaultValues: z.infer<typeof aboutFormSchema>
  onSubmit: (values: z.infer<typeof aboutFormSchema>) => Promise<void>
  loading: boolean
  isSaving: boolean
}
export default function AboutSettingsForm({
  defaultValues, 
  onSubmit,
  loading,
  isSaving
}: AboutSettingsFormProps) {
  const [activeTab, setActiveTab] = useState("intro")
  
  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      intro: defaultValues.intro || '',
      intro_zh: defaultValues.intro_zh || '',
      contact: defaultValues.contact || {
        email: '',
        phone: '',
        location: ''
      },
      skills: defaultValues.skills || [],
      education: defaultValues.education || [],
      experience: defaultValues.experience || [],
      projects: defaultValues.projects || [],
      social: defaultValues.social || {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      }
    },
    mode: "onChange"
  })

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = 
    useFieldArray({ control: form.control, name: "skills" as any })
  
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = 
    useFieldArray({ control: form.control, name: "education" as any })
  
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = 
    useFieldArray({ control: form.control, name: "experience" as any })
  
  const { fields: projectFields, append: appendProject, remove: removeProject } = 
    useFieldArray({ control: form.control, name: "projects" as any })

  const { formState: { errors } } = form

  const hasIntroErrors = !!errors.intro || !!errors.intro_zh
  const hasContactErrors = errors.contact?.email || errors.contact?.phone || errors.contact?.location
  const hasSkillsErrors = !!errors.skills
  const hasBackgroundErrors = !!errors.education || !!errors.experience || !!errors.projects
  const hasSocialErrors = errors.social?.github || errors.social?.linkedin || errors.social?.twitter || errors.social?.website

  const handleSubmit = async (values: z.infer<typeof aboutFormSchema>) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const onError = (errors: any) => {
    console.log('Form errors:', errors);
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="intro" className={hasIntroErrors ? "text-red-500" : ""}>
                      Introduction {hasIntroErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger value="contact" className={hasContactErrors ? "text-red-500" : ""}>
                      Contact {hasContactErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger value="skills" className={hasSkillsErrors ? "text-red-500" : ""}>
                      Skills {hasSkillsErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger value="background" className={hasBackgroundErrors ? "text-red-500" : ""}>
                      Background {hasBackgroundErrors && "⚠️"}
                    </TabsTrigger>
                    <TabsTrigger value="social" className={hasSocialErrors ? "text-red-500" : ""}>
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
                            <Input placeholder="your.email@example.com" {...field} />
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
                              <Input placeholder="(Optional) Your phone number" {...field} />
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
                              <Input placeholder="(Optional) Your location" {...field} />
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
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Education</h3>
                      </div>
                      <ScrollArea className="h-auto max-h-80">
                        {educationFields.map((field, index) => (
                          <div key={field.id} className="mb-6 rounded-md border p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Education #{index + 1}</h4>
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
                                      <Input placeholder="Bachelor of Science" {...field} />
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
                                      <Input placeholder="University Name" {...field} />
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
                                      <Input placeholder="2018-2022" {...field} />
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
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea placeholder="Additional details..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendEducation({
                          degree: "",
                          institution: "",
                          year: "",
                          description: ""
                        })}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    {/* Experience Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Work Experience</h3>
                      </div>
                      <ScrollArea className="h-auto max-h-80">
                        {experienceFields.map((field, index) => (
                          <div key={field.id} className="mb-6 rounded-md border p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Experience #{index + 1}</h4>
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
                                      <Input placeholder="Software Developer" {...field} />
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
                                      <Input placeholder="Company Name" {...field} />
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
                                      <Input placeholder="2020-Present" {...field} />
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea placeholder="Job responsibilities and achievements..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendExperience({
                          position: "",
                          company: "",
                          period: "",
                          description: ""
                        })}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    {/* Projects Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Projects</h3>
                      </div>
                      <ScrollArea className="h-auto max-h-80">
                        {projectFields.map((field, index) => (
                          <div key={field.id} className="mb-6 rounded-md border p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Project #{index + 1}</h4>
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
                                      <Input placeholder="Project Name" {...field} />
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
                                      <Textarea placeholder="Project description..." {...field} />
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
                                      <Input placeholder="https://github.com/username/project" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendProject({
                          name: "",
                          description: "",
                          link: "",
                          tech: []
                        })}
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
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} />
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
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
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
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/username" {...field} />
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
                          <FormLabel>Personal Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
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
              variant="ghost"
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
              <Button 
                type="submit"
                disabled={loading || isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
} 