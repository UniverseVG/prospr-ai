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
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
