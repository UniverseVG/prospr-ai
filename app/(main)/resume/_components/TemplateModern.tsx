import React, { JSX } from "react";

interface ContactInfo {
  name: string;
  email: string;
  mobile: string;
  linkedin: string;
  twitter: string;
  location: string;
  website: string;
}

interface Entry {
  title: string;
  organization?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

interface ResumeData {
  contactInfo: ContactInfo;
  summary: string;
  skills: string;
  experience: Entry[];
  education: Entry[];
  projects: Entry[];
  certifications: Entry[];
  publications: Entry[];
  awards: Entry[];
}

interface TemplateModernProps {
  data: ResumeData;
  orderedSections: string[];
}

const TemplateModern: React.FC<TemplateModernProps> = ({
  data,
  orderedSections,
}) => {
  const sidebarSections = ["contactInfo", "skills"];
  const mainSections = [
    "summary",
    "experience",
    "education",
    "projects",
    "publications",
    "awards",
    "certifications",
  ];

  const orderedSidebar = orderedSections.filter((s) =>
    sidebarSections.includes(s)
  );
  const orderedMain = orderedSections.filter((s) => mainSections.includes(s));
  const orderedMainWithHeader = ["contactHeader", ...orderedMain];

  const renderBullets = (text?: string) =>
    text
      ?.split("\n")
      .filter(Boolean)
      .map((line, i) => (
        <li key={i} className="text-xs md:text-sm text-gray-700 break-words">
          {line.replace(/^[-•]\s*/, "")}
        </li>
      ));

  const renderEntrySection = (title: string, entries: Entry[]) =>
    entries.length ? (
      <div className="mb-6 break-inside-avoid">
        <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-2">
          {title}
        </h2>
        <div className="w-full h-0.5 bg-blue-500 mb-3" />
        <div className="space-y-4">
          {entries.map((entry, i) => (
            <div key={i}>
              <h3 className="text-sm md:text-base font-bold text-gray-800">
                {entry.title}
              </h3>
              <div className="flex justify-between text-xs md:text-sm text-blue-500">
                <span className="break-all">
                  {entry.organization}
                  {entry.location ? ` | ${entry.location}` : ""}
                </span>
                <span className="whitespace-nowrap">
                  {entry.startDate} -{" "}
                  {entry.endDate || (entry.current ? "Present" : "")}
                </span>
              </div>
              {entry.description && (
                <ul className="list-disc ml-4 mt-2">
                  {renderBullets(entry.description)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderSkills = (skills: string) => {
    if (!skills) return null;
    const skillItems = skills
      .split(/[,•\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return (
      <div className="mb-6">
        <h3 className="text-sm md:text-base text-center font-bold text-gray-600 mb-2">
          SKILLS
        </h3>
        <div className="w-16 h-0.5 mx-auto bg-blue-400 mb-4" />
        <div className="flex flex-wrap gap-2">
          {skillItems.map((skill, i) => (
            <span
              key={i}
              className="text-[11px] md:text-xs text-gray-700 bg-gray-200 px-1.5 py-0.5 rounded break-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const sidebarMap: Record<string, JSX.Element | null> = {
    contactInfo: (
      <div className="mt-6">
        <h3 className="text-sm md:text-base font-bold text-center text-gray-600 mb-2">
          CONTACT
        </h3>
        <div className="w-16 h-0.5 mx-auto bg-blue-400 mb-4" />
        <div className="text-[11px] md:text-xs text-gray-700 space-y-1">
          {data.contactInfo.email && (
            <p className="break-all">{data.contactInfo.email}</p>
          )}
          {data.contactInfo.mobile && (
            <p className="break-all">{data.contactInfo.mobile}</p>
          )}
          {data.contactInfo.location && (
            <p className="break-words">{data.contactInfo.location}</p>
          )}
          {data.contactInfo.linkedin && (
            <p className="break-all">{data.contactInfo.linkedin}</p>
          )}
          {data.contactInfo.twitter && (
            <p className="break-all">{data.contactInfo.twitter}</p>
          )}
          {data.contactInfo.website && (
            <p className="break-all">{data.contactInfo.website}</p>
          )}
        </div>
      </div>
    ),
    skills: renderSkills(data.skills),
  };

  const mainMap: Record<string, JSX.Element | null> = {
    contactHeader: (
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 break-words">
          {data.contactInfo.name}
        </h1>
        <p className="text-blue-500 text-sm md:text-base">
          {data.experience?.[0]?.title || "Professional"}
        </p>
      </div>
    ),
    summary: data.summary ? (
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-2">
          PROFESSIONAL SUMMARY
        </h2>
        <div className="w-full h-0.5 bg-blue-500 mb-3" />
        <p className="text-xs md:text-sm text-gray-700 whitespace-pre-line break-words">
          {data.summary}
        </p>
      </div>
    ) : null,
    experience: renderEntrySection("PROFESSIONAL EXPERIENCE", data.experience),
    education: renderEntrySection("EDUCATION", data.education),
    certifications: renderEntrySection("CERTIFICATIONS", data.certifications),
    projects: renderEntrySection("PROJECTS", data.projects),
    publications: renderEntrySection("PUBLICATIONS", data.publications),
    awards: renderEntrySection("AWARDS & HONORS", data.awards),
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
          }

          #template-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }

          @page {
            size: A4;
            margin: 0;
          }

          .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .print\\:flex-row {
            flex-direction: row !important;
          }

          .print\\:w-1\\/4 {
            width: 25% !important;
          }

          .print\\:w-3\\/4 {
            width: 75% !important;
          }
        }
      `}</style>

      <div id="template-preview" className="w-full print:w-full bg-white">
        <div className="max-w-4xl mx-auto font-sans text-sm">
          <div className="flex flex-col md:flex-row print:flex-row">
            <div className="w-full md:w-1/4 print:w-1/4 bg-gray-100 p-3 space-y-4 text-[11px] md:text-xs">
              {orderedSidebar.map((s) => (
                <React.Fragment key={s}>{sidebarMap[s]}</React.Fragment>
              ))}
            </div>
            <div className="w-full md:w-3/4 print:w-3/4 p-4">
              {orderedMainWithHeader.map((s) => (
                <React.Fragment key={s}>{mainMap[s]}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateModern;
