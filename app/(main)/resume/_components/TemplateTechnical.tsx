import React from "react";

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

interface TemplateTechnicalProps {
  data: ResumeData;
  orderedSections: string[];
}

const TemplateTechnical: React.FC<TemplateTechnicalProps> = ({
  data,
  orderedSections,
}) => {
  const renderBullets = (text?: string) =>
    text
      ?.split("\n")
      .filter(Boolean)
      .map((line, i) => (
        <li key={i} className="text-xs sm:text-sm text-gray-800">
          {line.replace(/^[-•]\s*/, "")}
        </li>
      ));

  const renderEntryBlock = (title: string, entries: Entry[]) =>
    entries.length ? (
      <section className="mb-6">
        <h2 className="text-lg font-bold text-[#0466c8] border-b-2 border-[#0466c8] mb-2 font-mono">
          {title.toUpperCase()}
        </h2>
        <div className="space-y-4">
          {entries.map((entry, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded">
              <h3 className="text-base font-bold text-gray-900 font-mono">
                {entry.title?.toUpperCase()}
              </h3>
              <div className="flex justify-between text-sm text-[#0466c8]">
                <span>
                  {entry.organization}
                  {entry.location ? ` | ${entry.location}` : ""}
                </span>
                <span>
                  {entry.startDate} -{" "}
                  {entry.endDate || (entry.current ? "Present" : "")}
                </span>
              </div>
              {entry.description && (
                <ul className="list-disc pl-5 mt-2">
                  {renderBullets(entry.description)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderSkills = (skills: string) => {
    const list = skills
      .split(/[,•\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return (
      <section className="mb-6">
        <h2 className="text-lg font-bold text-[#0466c8] border-b-2 border-[#0466c8] mb-2 font-mono">
          TECHNICAL SKILLS
        </h2>
        <div className="flex flex-wrap gap-2">
          {list.map((skill, i) => (
            <span
              key={i}
              className="text-xs sm:text-sm bg-[#0466c8] text-white px-2 py-1 rounded font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 bg-white text-sm font-sans">
      {/* Header */}
      <div className="mb-6">
        <div className="h-2 bg-[#0466c8] w-full mb-4"></div>
        <h1 className="text-3xl font-bold text-[#0466c8] font-mono">
          {data.contactInfo.name}
        </h1>
        <p className="text-sm text-gray-600 font-mono">
          {data.experience?.[0]?.title || "Software Developer"}
        </p>
      </div>

      {/* Contact */}
      {orderedSections.includes("contactInfo") && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-[#0466c8] border-b-2 border-[#0466c8] mb-2 font-mono">
            CONTACT INFORMATION
          </h2>
          <div className="bg-gray-100 p-4 rounded">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Email:</p>
                <a
                  href={`mailto:${data.contactInfo.email}`}
                  className="text-lg text-[#0466c8] hover:underline"
                >
                  {data.contactInfo.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Phone:</p>
                <a
                  href={`tel:${data.contactInfo.mobile}`}
                  className="text-lg text-[#0466c8] hover:underline"
                >
                  {data.contactInfo.mobile}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Location:</p>
                <p className="text-lg text-gray-800">
                  {data.contactInfo.location}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Website:</p>
                <a
                  href={data.contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#0466c8] hover:underline"
                >
                  {data.contactInfo.website}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">LinkedIn:</p>
                <a
                  href={data.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#0466c8] hover:underline"
                >
                  {data.contactInfo.linkedin}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {renderSkills(data.skills)}

      {/* Ordered Sections */}
      {orderedSections.includes("summary") && data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-[#0466c8] border-b-2 border-[#0466c8] mb-2 font-mono">
            SUMMARY
          </h2>
          <p className="text-sm text-gray-800 whitespace-pre-line font-mono">
            {data.summary}
          </p>
        </section>
      )}

      {orderedSections.includes("experience") &&
        renderEntryBlock("Professional Experience", data.experience)}
      {orderedSections.includes("projects") &&
        renderEntryBlock("Notable Projects", data.projects)}
      {orderedSections.includes("education") &&
        renderEntryBlock("Education", data.education)}
      {orderedSections.includes("certifications") &&
        renderEntryBlock("Certifications", data.certifications)}
      {orderedSections.includes("publications") &&
        renderEntryBlock("Publications", data.publications)}
      {orderedSections.includes("awards") &&
        renderEntryBlock("Awards & Honors", data.awards)}

      {/* Bottom Bar */}
      <div className="h-2 bg-[#0466c8] w-full mt-12" />
    </div>
  );
};

export default TemplateTechnical;
