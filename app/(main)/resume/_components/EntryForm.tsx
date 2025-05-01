/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { entrySchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Sparkles, X, GripVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format, parse } from "date-fns";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { improveWithAI } from "@/actions/resume";

const formatDisplayDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

const EntryForm = ({
  type,
  entries,
  onChange,
}: {
  type: string;
  entries: any[];
  onChange: (entries: any) => void;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "Present" : formatDisplayDate(data.endDate),
    };
    onChange([...entries, formattedEntry]);
    reset();
    setIsAdding(false);
  });

  const handleDelete = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(
        typeof improveError === "string"
          ? improveError
          : (improveError as Error)?.message || "Failed to improve description"
      );
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(),
    });
  };

  return (
    <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto p-1 flex flex-col">
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card
            key={index}
            className="bg-card text-card-foreground border-border"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <CardTitle className="text-sm font-medium text-primary">
                  {item.title} <span className="text-secondary">@</span>{" "}
                  {item.organization}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary">
                {item.current || item.endDate === "Present"
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap text-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-primary">Add {type}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title/Position"
                  {...register("title")}
                  className="bg-input text-foreground border-input"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Organization/Company"
                  {...register("organization")}
                  className="bg-input text-foreground border-input"
                />
                {errors.organization && (
                  <p className="text-sm text-destructive">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("startDate")}
                  className="bg-input text-foreground border-input"
                />
                {errors.startDate && (
                  <p className="text-sm text-destructive">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  className="bg-input text-foreground border-input disabled:opacity-50"
                />
                {errors.endDate && (
                  <p className="text-sm text-destructive">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
                className="text-primary border-input"
              />
              <label htmlFor="current" className="text-foreground">
                Current {type}
              </label>
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder={`Description of your ${type.toLowerCase()}`}
                className="h-32 bg-input text-foreground border-input resize-none"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
              className="text-secondary hover:text-secondary hover:bg-secondary/20"
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 bg-card border-t border-border pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
              className="border-border text-muted-foreground hover:bg-accent"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full border border-secondary text-secondary hover:bg-secondary/20 hover:text-secondary"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
};

export default EntryForm;
