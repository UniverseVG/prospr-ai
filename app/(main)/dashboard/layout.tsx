import { getUserOnboardingStatus } from "@/actions/user";
import LoadingSpinner from "@/components/LoadingSpinner";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return (
    <div className="px-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl sm:text-6xl gradient gradient-title font-bold">
          Industry Insights
        </h1>
      </div>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
