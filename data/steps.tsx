import { User, Star, Layers, Globe, Factory } from "lucide-react";

export const steps = [
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
