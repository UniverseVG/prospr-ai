/* eslint-disable @typescript-eslint/no-explicit-any */
import { DemandLevel, MarketOutlook } from "@prisma/client";

export interface Industries {
  id: string;
  name: string;
  subIndustries: string[];
}

export interface User {
  id: string;
  clerkUserId: string;
  email: string;
  name?: string | null;
  imageUrl?: string | null;
  industry?: string | null;
  industryInsight?: IndustryInsight | null;
  createdAt: Date;
  updatedAt: Date;
  bio?: string | null;
  experience?: number | null;
  skills: string[];
  assessments: Assessment[];
  resume?: Resume | null;
  coverLetter: CoverLetter[];
}

export interface Assessment {
  id: string;
  userId: string;
  user: User;
  quizScore: number;
  questions: any[];
  category: string;
  improvementTip?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  id: string;
  userId: string;
  user: User;
  content: string;
  atsScore?: number | null;
  feedback?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoverLetter {
  id: string;
  userId: string;
  user: User;
  content: string;
  jobDescription?: string | null;
  companyName: string;
  jobTitle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndustryInsight {
  id: string;
  industry: string;
  users: User[];
  salaryRanges: any[];
  growthRate: number;
  demandLevel: DemandLevel;
  topSkills: string[];
  marketOutlook: MarketOutlook;
  keyTrends: string[];
  recommendedSkills: string[];
  lastUpdated: Date;
  nextUpdate: Date;
}

export interface onboardingData {
  industry: string;
  subIndustry: string;
  bio: string;
  experience: number;
  skills: string[];
}

export interface SalaryRange {
  max: number;
  min: number;
  role: string;
  median: number;
  location: string;
}

export interface InsightData {
  id: string;
  industry: string;
  salaryRanges: SalaryRange[];
  growthRate: number;
  demandLevel: string;
  topSkills: string[];
  marketOutlook: string;
  keyTrends: string[];
  recommendedSkills: string[];
  lastUpdated: string;
  nextUpdate: string;
}
