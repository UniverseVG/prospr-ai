import { getAssessments } from "@/actions/interview";
import React from "react";
import StatsCards from "./_components/StatsCards";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";
import { QuizResultType } from "@/types";

const InterviewPage = async () => {
  const assessments = await getAssessments();

  return (
    <div className="relative">
      <div className="grid-background"></div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient gradient-title">
          Interview Prep
        </h1>
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments as unknown as QuizResultType[]} />
        <PerformanceChart
          assessments={assessments as unknown as QuizResultType[]}
        />
        <QuizList assessments={assessments as unknown as QuizResultType[]} />
      </div>
    </div>
  );
};

export default InterviewPage;
