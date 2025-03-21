import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import ClockLoader from "react-spinners/ClockLoader";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return (
    <div className="px-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-6xl gradient gradient-title font-bold">
          Industry Insights
        </h1>
      </div>
      <Suspense
        fallback={
          <ClockLoader
            className="mt-4 text-primary"
            color="#7b45bb"
            size={150}
          />
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
