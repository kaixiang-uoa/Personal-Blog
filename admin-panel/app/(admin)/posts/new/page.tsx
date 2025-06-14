"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ComboboxSelect } from "@/components/posts/Combobox-select";
import { PostEditor } from "@/components/posts/editor/PostEditor";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/inputs/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/inputs/form";
import { Input } from "@/components/ui/inputs/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select";
import { Textarea } from "@/components/ui/inputs/textarea";
import { apiService } from "@/lib/api";
import {
  postFormSchema,
  type PostFormSchema,
} from "@/lib/validators/form-validation";
import { Category, Tag } from "@/types/index";
import { Post, PostStatus } from "@/types/posts";

// 定义React事件类型

// 复用 Post 类型并扩展为表单数据类型
interface PostFormData
  extends Omit<
    Post,
    "_id" | "createdAt" | "updatedAt" | "publishedAt" | "viewCount"
  > {
  categories?: string[];
}

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    [],
  );

  // using react-hook-form
  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      status: "draft",
      featuredImage: "",
    },
  });

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    form.setValue(field as any, value);

    // If title changes, generate slug
    if (field === "title" && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  };

  // Load categories and tags
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiService.getCategories();
        setCategories(response.data || []);
        setAvailableCategories(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await apiService.getTags();
        setTags(response.data || []);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    }

    fetchTags();
  }, []);

  // Submit form
  const onSubmit = async (data: PostFormSchema) => {
    setIsLoading(true);
    try {
      // if published status, check required fields again
      if (data.status === "published") {
        if (!data.title || !data.content) {
          toast.error("Cannot publish", {
            description: "Title and content are required for publishing",
          });
          setIsLoading(false);
          return;
        }
      }
      // use type assertion to create PostFormData
      const postData: PostFormData = {
        status: data.status as PostStatus,
        featured: false,
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        tags: data.tags || [],
        featuredImage: data.featuredImage || "",
      };

      // add category
      if (data.category) {
        postData.categories = [data.category];
      }

      await apiService.createPost(postData);
      toast.success("Success", {
        description: "Post created successfully",
      });
      router.push("/posts");
    } catch (error) {
      console.error("Failed to create post", error);
      toast.error("Creation Failed", {
        description:
          "An error occurred while creating the post. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (categories: Category[]) => {
    setSelectedCategory(categories);
    if (categories.length > 0) {
      form.setValue("category", categories[0]._id);
    } else {
      form.setValue("category", "");
    }
  };

  const handleTagSelect = (tags: Tag[]) => {
    setSelectedTags(tags);
    form.setValue(
      "tags",
      tags.map((t) => t._id),
    );
    form.setValue("tagObjects", tags);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/posts">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">New Post</h1>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? (
            <>
              <Save className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Post
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Title
                          {form.watch("status") === "published" && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                          {form.watch("status") === "draft" && (
                            <span className="text-gray-400 text-xs ml-2">
                              (Required when published)
                            </span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title"
                            {...field}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange("title", e.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Slug
                          {form.watch("status") === "draft" && (
                            <span className="text-gray-400 text-xs ml-2">
                              (Optional, will be generated from title)
                            </span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post slug"
                            {...field}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange("slug", e.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Excerpt
                          <span className="text-gray-400 text-xs ml-2">
                            (Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter post excerpt"
                            rows={3}
                            {...field}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                              handleInputChange("excerpt", e.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>
                          Content
                          {form.watch("status") === "published" && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                          {form.watch("status") === "draft" && (
                            <span className="text-gray-400 text-xs ml-2">
                              (Required when published)
                            </span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <PostEditor
                            content={field.value}
                            onChange={(value: any) =>
                              handleInputChange("content", value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("status", value)
                        }
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select post status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <ComboboxSelect
                          items={availableCategories}
                          selectedItems={selectedCategory}
                          onSelect={(category: Category) =>
                            handleCategorySelect([category])
                          }
                          getItemLabel={(item: Category) => item?.name || ""}
                          getItemValue={(item: Category) => item?._id || ""}
                          placeholder="Select category"
                          width={200}
                          className="w-full"
                          multiple={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <ComboboxSelect
                          items={tags}
                          selectedItems={selectedTags}
                          onSelect={(tag: Tag) =>
                            handleTagSelect([...selectedTags, tag])
                          }
                          onCreate={async (name: string) => {
                            try {
                              const response = await apiService.createTag({
                                name,
                              });
                              const newTag = response.data;
                              setTags([...tags, newTag]);
                              return newTag;
                            } catch (error) {
                              console.error("Failed to create tag:", error);
                              throw error;
                            }
                          }}
                          getItemLabel={(item: Tag) => item?.name || ""}
                          getItemValue={(item: Tag) => item?._id || ""}
                          placeholder="Select tags"
                          width={200}
                          className="w-full"
                          multiple={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Featured image URL"
                          {...field}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("featuredImage", e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
