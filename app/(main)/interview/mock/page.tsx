import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/Quiz";

const MockInterviewPage = () => {
  return (
    <div className="space-y-4 py-6 relative">
      <div className="grid-background"></div>
      <div className="flex flex-col space-y-2 mx-2">
        <Link href={"/interview"}>
          <Button variant="link" className="gap-2 px-0 has-[>svg]:px-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-4xl sm:text-6xl font-bold gradient gradient-title">
            Mock Interview
          </h1>
          <p className="text-muted-foreground">
            Get ready for your next interview with our mock interview feature.
            Practice answering industry-specific questions and receive feedback
            to improve your performance.
          </p>
        </div>
        <Quiz />
      </div>
    </div>
  );
};

export default MockInterviewPage;
