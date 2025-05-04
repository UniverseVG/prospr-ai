"use client";
import { industries } from "@/data/industries";
import React, { useEffect, useState } from "react";
import OnBoardingForm from "./_components/onBoardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const OnBoardingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      setIsLoading(true);
      const { isOnboarded } = await getUserOnboardingStatus();

      if (isOnboarded) {
        setIsLoading(false);
        redirect("/dashboard");
      }
      setIsLoading(false);
    };
    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="relative">
      <div className="grid-background" />
      <OnBoardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;
