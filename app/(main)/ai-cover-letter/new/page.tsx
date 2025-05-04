import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/CoverLetterGenerator";

export default function NewCoverLetterPage() {
  return (
    <div className="relative">
      <div className="grid-background"></div>
      <div className="py-6">
        <div className="flex flex-col space-y-2">
          <Link href="/ai-cover-letter">
            <Button variant="link" className="gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" />
              Back to Cover Letters
            </Button>
          </Link>

          <div className="pb-6">
            <h1 className="text-4xl sm:text-6xl font-bold gradient gradient-title">
              Create Cover Letter
            </h1>
            <p className="text-muted-foreground">
              Generate a tailored cover letter for your job application
            </p>
          </div>
        </div>

        <CoverLetterGenerator />
      </div>
    </div>
  );
}
