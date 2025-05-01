/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function TemplateExecutive({
  data,
  orderedSections = [],
}: {
  data: any;
  orderedSections?: string[];
}) {
  const getSection = (sectionId: string) => {
    switch (sectionId) {
      case "contactInfo":
        return renderContactInfo();
      case "summary":
        return renderSummary();
      case "skills":
        return renderSkills();
      case "experience":
        return renderEntryList(data.experience, "PROFESSIONAL EXPERIENCE");
      case "education":
        return renderEntryList(data.education, "EDUCATION");
      case "projects":
        return renderEntryList(data.projects, "PROJECTS");
      case "certifications":
        return renderEntryList(data.certifications, "CERTIFICATIONS");
      case "publications":
        return renderEntryList(data.publications, "PUBLICATIONS");
      case "awards":
        return renderEntryList(data.awards, "AWARDS & HONORS");
      default:
        return null;
    }
  };

  const renderContactInfo = () => (
    <div className="mb-6 break-inside-avoid ">
      <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif break-words">
            {data.contactInfo?.name || "Your Name"}
          </h1>
          <div className="h-1 w-36 bg-amber-700 my-2"></div>
          <h2 className="text-base md:text-lg text-gray-600 font-serif break-words">
            {data.contactInfo?.title || ""}
          </h2>
        </div>
        <div className="text-sm md:text-base text-gray-600 text-left md:text-right space-y-1 font-serif break-all">
          {data.contactInfo?.email && <p>{data.contactInfo.email}</p>}
          {data.contactInfo?.mobile && <p>{data.contactInfo.mobile}</p>}
          {data.contactInfo?.location && <p>{data.contactInfo.location}</p>}
          {data.contactInfo?.linkedin && <p>{data.contactInfo.linkedin}</p>}
          {data.contactInfo?.website && <p>{data.contactInfo.website}</p>}
        </div>
      </div>
    </div>
  );

  const renderSummary = () =>
    data.summary ? (
      <div className="mb-6 break-inside-avoid">
        <h2 className="text-xl font-bold font-serif text-gray-800 mb-2">
          EXECUTIVE SUMMARY
        </h2>
        <div className="w-full h-px bg-gray-300 mb-3"></div>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed font-serif whitespace-pre-line break-words">
          {data.summary}
        </p>
      </div>
    ) : null;

  const renderSkills = () => {
    if (!data.skills) return null;
    const skillsList: string[] = data.skills
      .split(/[,•\n]+/)
      .map((s: any) => s.trim())
      .filter(Boolean);

    const columnCount = Math.min(skillsList.length, 3) || 1;
    const columns = Array.from({ length: columnCount }, () => [] as string[]);
    skillsList.forEach((skill: string, i: number) =>
      columns[i % columnCount].push(skill)
    );

    return (
      <div className="mb-6 break-inside-avoid">
        <h2 className="text-xl font-bold font-serif text-gray-800 mb-2">
          CORE COMPETENCIES
        </h2>
        <div className="w-full h-px bg-gray-300 mb-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
          {columns.map((col, i) => (
            <div key={i} className="space-y-1">
              {col.map((skill, j) => (
                <p
                  key={j}
                  className="text-sm text-gray-700 font-serif break-words"
                >
                  • {skill}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEntryList = (entries: any, title: string) =>
    entries?.length ? (
      <div className="mb-6 break-inside-avoid">
        <h2 className="text-xl font-bold font-serif text-gray-800 mb-2">
          {title}
        </h2>
        <div className="w-full h-px bg-gray-300 mb-3"></div>
        <div className="space-y-4">
          {entries.map((item: any, index: number) => (
            <div key={index}>
              <h3 className="text-base md:text-lg font-bold font-serif text-gray-800 break-words">
                {item.title || "TITLE"}
              </h3>
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 font-serif">
                <span className="break-words">
                  {item.organization || ""}{" "}
                  {item.location && `| ${item.location}`}
                </span>
                <span>
                  {item.startDate || "Start"} -{" "}
                  {item.endDate || (item.current ? "Present" : "End")}
                </span>
              </div>
              {item.description && (
                <ul className="mt-1 ml-4 list-disc text-sm text-gray-700 font-serif whitespace-pre-line break-words">
                  {item.description
                    .split("\n")
                    .filter(Boolean)
                    .map((point: string, idx: number) => (
                      <li key={idx}>{point.replace(/^[-•]\s*/, "")}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <>
      <style>{`
        @media print {
          .executive-print-container {
            margin: 0 !important;
            border: none !important;
            width: 100% !important;
            max-width: 100% !important;
            background-color: white !important;
          }
        }
      `}</style>

      <div className="executive-print-container max-w-5xl mx-auto bg-white p-6 md:p-10 text-gray-800 font-serif">
        {orderedSections.map((sectionId) => (
          <React.Fragment key={sectionId}>
            {getSection(sectionId)}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
