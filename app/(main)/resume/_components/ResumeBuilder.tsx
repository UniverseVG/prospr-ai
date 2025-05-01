/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { resumeSchema } from "@/app/lib/schema";
import { entriesToMarkdown } from "@/app/lib/helper";
import EntryForm from "./EntryForm";
import { useUser } from "@clerk/nextjs";
import useFetch from "@/hooks/useFetch";
import { saveResume } from "@/actions/resume";
import { SortableItem } from "./SortableItem";
import {
  Download,
  Save,
  Layout,
  Edit3,
  Code,
  Zap,
  Eye,
  CheckCircle,
  LayoutGrid,
  Loader2,
} from "lucide-react";
import TemplateClean from "./TemplateClean";
import TemplateModern from "./TemplateModern";
import TemplateExecutive from "./TemplateExecutive";
import TemplateTechnical from "./TemplateTechnical";
import { ActiveTab, ContactInfoType, EntryFormType } from "@/types";
import { toast } from "sonner";

const TEMPLATE_LIST = [
  {
    id: "clean",
    name: "Clean",
    description: "Professional and minimalist design",
    image: "/templates/clean.svg",
    component: TemplateClean,
    atsScore: 95,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary with balanced white space",
    image: "/templates/modern.svg",
    component: TemplateModern,
    atsScore: 92,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    image: "/templates/executive.svg",
    component: TemplateExecutive,
    atsScore: 98,
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles",
    image: "/templates/technical.svg",
    component: TemplateTechnical,
    atsScore: 93,
  },
];

const ALL_SECTIONS = [
  { id: "contactInfo", label: "Contact Information" },
  { id: "summary", label: "Professional Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "publications", label: "Publications" },
  { id: "awards", label: "Awards & Honors" },
];

const contactKeys: (keyof ContactInfoType)[] = [
  "name",
  "email",
  "mobile",
  "location",
  "linkedin",
  "twitter",
  "website",
];

export default function ResumeBuilder({
  initialContent,
  fieldValues,
  templateType,
}: {
  initialContent: string;
  fieldValues?: any;
  templateType?: string;
}) {
  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      publications: [],
      awards: [],
    },
  });

  const formValues = watch();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit");
  const [sectionView, setSectionView] = useState<"list" | "grid">("list");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_LIST[0].id);
  const [orderedSections, setOrderedSections] = useState<string[]>(
    ALL_SECTIONS.map((section) => section.id)
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  useEffect(() => {
    if (initialContent) {
      setPreviewContent(initialContent);
      setActiveTab("preview");
    }
    if (fieldValues) {
      reset(fieldValues);
    }
    if (templateType) {
      setSelectedTemplate(templateType);
    }
  }, [initialContent, fieldValues, reset, templateType]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = generateMarkdown();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(
        typeof saveError === "string"
          ? saveError
          : (saveError as Error)?.message || "Failed to save resume"
      );
    }
  }, [saveResult, saveError, isSaving]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOrderedSections((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const ActiveTemplate =
    TEMPLATE_LIST.find((t) => t.id === selectedTemplate)?.component ||
    TemplateClean;

  function generateMarkdown() {
    const {
      contactInfo,
      summary,
      skills,
      experience,
      education,
      projects,
      certifications,
      publications,
      awards,
    } = formValues;

    const contactMd: string[] = [];
    if (contactInfo.name) contactMd.push(`# ${contactInfo.name}`);
    if (contactInfo.email) contactMd.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) contactMd.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.location) contactMd.push(`📍 ${contactInfo.location}`);
    if (contactInfo.linkedin)
      contactMd.push(`[LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter)
      contactMd.push(`[Twitter](${contactInfo.twitter})`);
    if (contactInfo.website)
      contactMd.push(`[Website](${contactInfo.website})`);

    const nameSection = contactInfo.name
      ? ""
      : `## ${user?.fullName || "Your Name"}`;

    // Create content based on ordered sections
    const sectionContent = orderedSections.map((sectionId) => {
      switch (sectionId) {
        case "contactInfo":
          return contactMd.length
            ? `${nameSection}\n\n${contactMd.join(" | ")}`
            : "";
        case "summary":
          return summary ? `## Professional Summary\n${summary}` : "";
        case "skills":
          return skills ? `## Skills\n${skills}` : "";
        case "experience":
          return entriesToMarkdown(experience, "Work Experience");
        case "education":
          return entriesToMarkdown(education, "Education");
        case "projects":
          return entriesToMarkdown(projects, "Projects");
        case "certifications":
          return entriesToMarkdown(certifications, "Certifications");
        case "publications":
          return entriesToMarkdown(publications, "Publications");
        case "awards":
          return entriesToMarkdown(awards, "Awards & Honors");
        default:
          return "";
      }
    });

    return sectionContent.filter(Boolean).join("\n\n");
  }

  async function downloadPdf() {
    setIsGenerating(true);

    try {
      document.title = `Resume - ${formValues.contactInfo.name || "Untitled"}`;

      const printStyle = document.createElement("style");
      printStyle.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #template-preview, #template-preview * {
            visibility: visible;
          }
          #template-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            padding: 0;
            margin: 0;
            box-shadow: none;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `;
      document.head.appendChild(printStyle);

      if (activeTab !== "preview") {
        setActiveTab("preview");
        await new Promise((res) => setTimeout(res, 300));
      }

      window.print();

      document.head.removeChild(printStyle);
      document.title = "Resume Builder";
    } catch (err) {
      console.error("Error printing resume:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  const getSectionLabel = (id: string) => {
    return ALL_SECTIONS.find((section) => section.id === id)?.label || id;
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn({
        content: previewContent,
        fieldValues: formValues,
        templateType: selectedTemplate,
      });
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  return (
    <div className="space-y-6  min-h-screen">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold gradient gradient-title">
              Resume Builder
            </h1>
            <p className="text-muted-foreground">
              Create an ATS-optimized professional resume
            </p>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <Button
                    variant="outline"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSaving}
                    size="sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save your resume</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <Button
                    onClick={downloadPdf}
                    disabled={isGenerating}
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGenerating ? "Processing..." : "Download PDF"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download as PDF</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary">Choose a Template</CardTitle>
          <CardDescription>
            Select from our ATS-optimized templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TEMPLATE_LIST.map((template) => (
              <div
                key={template.id}
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-primary rounded-lg scale-105 p-2"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="aspect-[3/4] relative rounded-md overflow-hidden border shadow-sm">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="font-medium text-sm">{template.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      ATS {template.atsScore}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Editor panel */}
        <Card className="lg:col-span-7 border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Resume Content</CardTitle>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as ActiveTab)}
              >
                <TabsList>
                  <TabsTrigger value="edit" className="flex items-center gap-1">
                    <Edit3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="markdown"
                    className="flex items-center gap-1"
                  >
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Markdown</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as ActiveTab)}
            >
              <TabsContent value="edit" className="mt-0">
                <ScrollArea className="h-[calc(155vh)] overflow-auto bg-card p-6 shadow-inner border rounded-md">
                  <div className="flex justify-end mb-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={sectionView === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSectionView("list")}
                        className="w-9 p-0"
                      >
                        <Layout className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={sectionView === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSectionView("grid")}
                        className="w-9 p-0"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <form className="space-y-6">
                    {/* Contact Information */}
                    <Card className="border border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-secondary">
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {contactKeys.map((key) => (
                            <div key={key} className="space-y-1">
                              <Label
                                htmlFor={key}
                                className="text-sm font-medium capitalize"
                              >
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </Label>
                              <Input
                                {...register(`contactInfo.${key}` as const)}
                                id={key}
                                placeholder={
                                  key.charAt(0).toUpperCase() + key.slice(1)
                                }
                                className="bg-card"
                              />
                              {errors.contactInfo?.[key] && (
                                <p className="text-red-500 text-xs">
                                  {
                                    (
                                      errors.contactInfo[key] as {
                                        message?: string;
                                      }
                                    )?.message
                                  }
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card className="border border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-secondary">
                          Professional Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Controller
                          name="summary"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="A brief overview of your professional background and key strengths"
                              className="h-32 resize-y bg-card"
                            />
                          )}
                        />
                        {errors.summary && (
                          <p className="text-red-500 text-xs mt-2">
                            {
                              (
                                errors.summary as {
                                  message?: string;
                                }
                              )?.message
                            }
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card className="border border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-secondary">
                          Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Controller
                          name="skills"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="List your skills (e.g., Project Management, JavaScript, Communication)"
                              className="h-24 resize-y bg-card"
                            />
                          )}
                        />
                        {errors.skills && (
                          <p className="text-red-500 text-xs mt-2">
                            {
                              (
                                errors.skills as {
                                  message?: string;
                                }
                              )?.message
                            }
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Sections with EntryForm */}
                    <div
                      className={
                        sectionView === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                          : "space-y-6"
                      }
                    >
                      {[
                        "experience",
                        "education",
                        "projects",
                        "certifications",
                        "publications",
                        "awards",
                      ].map((section) => (
                        <Card key={section} className="border border-border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base capitalize text-secondary">
                              {section}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Controller
                              name={section as EntryFormType}
                              control={control}
                              render={({ field }) => (
                                <EntryForm
                                  type={section as EntryFormType}
                                  entries={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </form>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="markdown" className="mt-0">
                <div className="h-[calc(155vh)]">
                  <MDEditor
                    value={previewContent}
                    onChange={(value) => setPreviewContent(value || "")}
                    height="100%"
                  />
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <div
                  id="template-preview-mobile"
                  className="h-[calc(155vh)] overflow-auto bg-card p-6 shadow-inner border rounded-md"
                >
                  <ActiveTemplate
                    data={{
                      ...formValues,
                      contactInfo: {
                        ...formValues.contactInfo,
                        mobile: formValues.contactInfo.mobile || "",
                        linkedin: formValues.contactInfo.linkedin || "",
                        twitter: formValues.contactInfo.twitter || "",
                        location: formValues.contactInfo.location || "",
                        website: formValues.contactInfo.website || "",
                      },
                    }}
                    orderedSections={orderedSections}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right: Section ordering & Preview */}
        <Card className="lg:col-span-5 border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Layout & Preview</CardTitle>
              <Badge variant="outline" className="font-normal">
                <Zap className="h-3 w-3 mr-1" />
                ATS Optimized
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Section reordering */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-secondary">
                Section Order
              </h3>
              <div className="bg-accent rounded-md p-3">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={orderedSections}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {orderedSections.map((id) => (
                        <SortableItem key={id} id={id}>
                          <div className="p-2 bg-card border rounded shadow-sm cursor-move flex items-center">
                            <div className="h-4 w-1.5 bg-muted rounded mr-2"></div>
                            <span className="text-sm text-foreground">
                              {getSectionLabel(id)}
                            </span>
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>

            {/* Template preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-secondary">
                Resume Preview
              </h3>
              <div
                className="border rounded-md overflow-hidden bg-card shadow-inner w-full h-auto"
                style={{ aspectRatio: "1/1.414" }}
              >
                <div className="w-full h-full overflow-auto p-4 flex justify-center">
                  <div
                    id="template-preview"
                    className="w-full max-w-full"
                    style={{ aspectRatio: "1/1.414" }}
                  >
                    <ActiveTemplate
                      data={{
                        ...formValues,
                        contactInfo: {
                          ...formValues.contactInfo,
                          mobile: formValues.contactInfo.mobile || "",
                          linkedin: formValues.contactInfo.linkedin || "",
                          twitter: formValues.contactInfo.twitter || "",
                          location: formValues.contactInfo.location || "",
                          website: formValues.contactInfo.website || "",
                        },
                      }}
                      orderedSections={orderedSections}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="text-xs text-muted-foreground">
                  A4 Format Preview
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
