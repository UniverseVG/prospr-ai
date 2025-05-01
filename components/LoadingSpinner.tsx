"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";

// Dynamically import the ClockLoader with no SSR
const ClockLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.ClockLoader),
  { ssr: false }
);

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className=" w-full max-w-lg rounded-3xl shadow-md animate-smooth bg-gradient-to-b from-card to-muted transition-all duration-300">
        <CardHeader className="flex flex-row justify-between items-center pb-2 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">
              ProsprAI is working for you
            </CardTitle>
          </div>
          <Clock
            className="h-5 w-5 text-primary animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col justify-center items-center pt-6 pb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-30">
              <ClockLoader color="#7b45bb" size={240} speedMultiplier={0.8} />
            </div>
            <ClockLoader
              color="#7b45bb"
              size={220}
              speedMultiplier={0.8}
              cssOverride={{
                filter: "drop-shadow(0 8px 16px hsl(var(--primary) / 0.2))",
              }}
            />
          </div>
          <div className="text-center space-y-2">
            <div className="text-xl font-bold text-foreground">
              Preparing Your Experience
            </div>
            <CardDescription className="text-sm">
              We&apos;re gathering your insights and analytics...
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingSpinner;
