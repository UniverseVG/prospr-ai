import { industries } from "@/data/industries";
import React from "react";
import OnBoardingForm from "./_components/onBoardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const OnBoardingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="relative">
      <div className="grid-background" />
      <OnBoardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;
