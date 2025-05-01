import { getResume } from "@/actions/resume";
import React from "react";
import ResumeBuilder from "./_components/ResumeBuilder";

const Resume = async () => {
  const resume = await getResume();

  return (
    <div className="py-6 relative">
      <div className="grid-background"></div>
      <ResumeBuilder
        initialContent={resume?.content || ""}
        fieldValues={resume?.fieldValues || {}}
        templateType={resume?.templateType || "clean"}
      />
    </div>
  );
};

export default Resume;
