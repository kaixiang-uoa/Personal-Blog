"use client";

import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/inputs/button";
import { TabsContent } from "@/components/ui/navigation/tabs";
import { Separator } from "@/components/ui/separator";
import { AboutFormSectionProps } from "@/types/settings";

import { EducationItem } from "../components/EducationItem";
import { ExperienceItem } from "../components/ExperienceItem";
import { ProjectItem } from "../components/ProjectItem";

export function BackgroundSection({ form }: AboutFormSectionProps) {
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control: form.control, name: "education" });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control: form.control, name: "experience" });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control: form.control, name: "projects" });

  return (
    <TabsContent value="background" className="space-y-6">
      {/* Education Section */}
      {educationFields.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Education</h3>
          </div>
          <div
            className="h-96 border rounded-md p-4 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db #f3f4f6",
            }}
          >
            {educationFields.map((field, index) => (
              <EducationItem
                key={field.id}
                form={form}
                index={index}
                onRemove={removeEducation}
              />
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

      {(educationFields.length > 0 || experienceFields.length > 0) && (
        <Separator />
      )}

      {/* Experience Section */}
      {experienceFields.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Experience</h3>
          </div>
          <div
            className="h-96 border rounded-md p-4 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db #f3f4f6",
            }}
          >
            {experienceFields.map((field, index) => (
              <ExperienceItem
                key={field.id}
                form={form}
                index={index}
                onRemove={removeExperience}
              />
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

      {(educationFields.length > 0 || experienceFields.length > 0) &&
        projectFields.length > 0 && <Separator />}

      {/* Projects Section */}
      {projectFields.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Projects</h3>
          </div>
          <div
            className="h-96 border rounded-md p-4 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db #f3f4f6",
            }}
          >
            {projectFields.map((field, index) => (
              <ProjectItem
                key={field.id}
                form={form}
                index={index}
                onRemove={removeProject}
              />
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
              technologies: "",
              url: "",
            })
          }
          className="w-full max-w-xs"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
    </TabsContent>
  );
}
