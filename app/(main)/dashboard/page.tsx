import { getIndustryInsights } from "@/actions/dashboard";
import React from "react";
import DashboardView from "./_components/DashboardView";

const IndustryInsightsPage = async () => {
  const insights = await getIndustryInsights();

  return (
    <div className="relative">
      <div className="grid-background"></div>
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsightsPage;
