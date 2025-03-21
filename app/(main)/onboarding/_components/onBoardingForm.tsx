/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { User, Star, Layers, Globe, Factory, Loader2 } from "lucide-react";
import { onboardingSchema } from "@/app/lib/schema";
import { Industries } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Welcome to ProsprAI",
    description:
      "Empower your career growth with AI-driven personalized insights. Let's build your future together!",
    icon: <Globe size={48} className="w-16 h-16 text-primary" />,
    input: "none",
  },
  {
    title: "Discover Your Industry",
    description:
      "Select your industry to receive targeted career suggestions and insights.",
    input: "industry",
    placeholder: "Select your industry",
    icon: <Factory size={48} className="text-primary" />,
  },
  {
    title: "Specialize Your Path",
    description: "Specify your sub-industry for more refined recommendations.",
    input: "subIndustry",
    placeholder: "Select your specialization",
    icon: <Layers size={48} className="text-primary" />,
  },
  {
    title: "Experience Level",
    description: "Let us know your years of professional experience.",
    input: "experience",
    placeholder: "Enter years of experience",
    icon: <Star size={48} className="text-primary" />,
  },
  {
    title: "List Your Skills",
    description:
      "List your key skills separated by commas to receive personalized suggestions.",
    input: "skills",
    placeholder: "E.g., JavaScript, Python, Leadership",
    icon: <Layers size={48} className="text-primary" />,
  },
  {
    title: "Introduce Yourself",
    description: "Write a short bio about yourself.",
    input: "bio",
    placeholder: "Tell us about yourself",
    icon: <User size={48} className="text-primary" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.95, rotate: -2 },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const OnBoardingForm = ({ industries }: { industries: Industries[] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState<Industries>({
    id: "",
    name: "",
    subIndustries: [],
  });
  const step = steps[currentStep];
  const router = useRouter();
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (!updateLoading && updateResult?.success) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  const nextStep = async () => {
    const isValid = await trigger(step.input as any);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-[1200px]">
        <div className="rounded-3xl p-1 bg-gradient-to-r from-primary to-secondary shadow-xl">
          <div className="flex flex-col md:flex-row bg-card rounded-3xl overflow-hidden">
            <div className="w-full md:w-1/2 p-8 border-r border-primary min-h-[700px] flex items-center relative overflow-hidden">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20" />
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: [0.95, 1, 0.95], opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 opacity-10"
              />
              <motion.div
                key={currentStep}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.7 }}
                className="w-full relative z-10"
              >
                <Card className="p-6 shadow-lg rounded-xl border border-border">
                  <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  >
                    <CardHeader className="flex flex-col items-center space-y-4">
                      {step.icon}
                      <CardTitle className="text-3xl font-bold text-primary text-center">
                        {step.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-center">
                        {step.description}
                      </p>
                    </CardHeader>
                  </motion.div>
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <CardContent>
                      {step.input === "industry" && (
                        <Select
                          onValueChange={(value) => {
                            setValue("industry", value);
                            setSelectedIndustry(
                              industries.find(
                                (ind) => ind.id === value
                              ) as Industries
                            );
                            setValue("subIndustry", "");
                          }}
                          value={watchIndustry}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((ind: Industries) => (
                              <SelectItem key={ind.id} value={ind.id}>
                                {ind.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {step.input === "subIndustry" && (
                        <Select
                          onValueChange={(value) =>
                            setValue("subIndustry", value)
                          }
                          value={watch("subIndustry")}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your sub-industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedIndustry?.subIndustries.map((sub) => (
                              <SelectItem key={sub} value={sub}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {step.input === "bio" && (
                        <Textarea
                          id="bio"
                          placeholder="Tell us about your professional background..."
                          className="h-32"
                          {...register("bio")}
                        />
                      )}
                      {step.input === "experience" && (
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          max="50"
                          placeholder="Enter years of experience"
                          {...register("experience")}
                        />
                      )}
                      {step.input === "skills" && (
                        <Input
                          id="skills"
                          placeholder="e.g., Python, JavaScript, Project Management"
                          {...register("skills")}
                        />
                      )}
                      {errors?.[step?.input as keyof typeof errors]
                        ?.message && (
                        <p className="text-red-500">
                          {errors[step.input as keyof typeof errors]?.message}
                        </p>
                      )}

                      <div className="flex justify-between mt-6">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                        >
                          Previous
                        </Button>
                        {currentStep < steps.length - 1 ? (
                          <Button
                            variant="secondary"
                            onClick={nextStep}
                            disabled={
                              (!watchIndustry || !watch(step.input as any)) &&
                              step.input !== "none"
                            }
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            onClick={handleSubmit(onSubmit)}
                          >
                            {updateLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Saving...
                              </>
                            ) : (
                              "Get Started"
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            </div>

            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-10 border-l border-primary min-h-[700px]">
              <motion.div
                initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="max-w-sm text-center text-primary-foreground space-y-5"
              >
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Embrace the Next Era of Your Career, Now
                </h1>
                <p className="text-sm md:text-base">
                  Experience career acceleration like never before with
                  AI-powered recommendations and insights. ProsprAI is your
                  partner in success!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingForm;
