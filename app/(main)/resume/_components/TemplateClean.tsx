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

interface TemplateCleanProps {
  data: ResumeData;
  orderedSections: string[];
}

const TemplateClean: React.FC<TemplateCleanProps> = ({
  data,
  orderedSections,
}) => {
  // Helper function to render a bullet list from text
  const renderBulletList = (text: string) => {
    if (!text) return null;

    return text
      .split("\n")
      .filter(Boolean)
      .map((item, index) => (
        <div key={index} className="flex items-start mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></div>
          <p className="text-gray-700">{item}</p>
        </div>
      ));
  };

  // Helper function to render a comma-separated list for skills
  const renderSkillsList = (skills: string) => {
    if (!skills) return null;

    const skillsArray = skills
      .split(/[,•]+/)
      .map((skill) => skill.trim())
      .filter(Boolean);

    return (
      <div className="flex flex-wrap">
        {skillsArray.map((skill, index) => (
          <span key={index} className="mr-2 mb-2 text-gray-700">
            {skill}
            {index < skillsArray.length - 1 ? " •" : ""}
          </span>
        ))}
      </div>
    );
  };

  // Helper function to render entries (experience, education, etc.)
  const renderEntries = (entries: Entry[]) => {
    if (!entries || entries.length === 0) return null;

    return entries.map((entry, index) => (
      <div key={index} className="mb-6 last:mb-0">
        <div className="flex flex-col md:flex-row md:justify-between mb-1">
          <h3 className="font-bold text-gray-800">{entry.title}</h3>
          <div className="text-gray-600 text-sm">
            {entry.startDate}{" "}
            {entry.endDate
              ? `- ${entry.endDate}`
              : entry.current
              ? "- Present"
              : ""}
          </div>
        </div>

        <div className="text-gray-600 mb-2">
          {entry.organization}
          {entry.organization && entry.location ? " | " : ""}
          {entry.location}
        </div>

        {entry.description && renderBulletList(entry.description)}
      </div>
    ));
  };

  // Function to render sections based on orderedSections
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "contactInfo":
        return (
          <div className="bg-gray-50 p-6 rounded-md mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data.contactInfo.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap text-gray-600">
              {data.contactInfo.email && (
                <span className="mr-3 mb-1">{data.contactInfo.email}</span>
              )}
              {data.contactInfo.mobile && (
                <span className="mr-3 mb-1">{data.contactInfo.mobile}</span>
              )}
              {data.contactInfo.location && (
                <span className="mr-3 mb-1">{data.contactInfo.location}</span>
              )}
              {data.contactInfo.linkedin && (
                <span className="mr-3 mb-1">{data.contactInfo.linkedin}</span>
              )}
              {data.contactInfo.twitter && (
                <span className="mr-3 mb-1">{data.contactInfo.twitter}</span>
              )}
              {data.contactInfo.website && (
                <span className="mr-3 mb-1">{data.contactInfo.website}</span>
              )}
            </div>
          </div>
        );

      case "summary":
        if (!data.summary) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 pb-1 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.summary}</p>
          </div>
        );

      case "skills":
        if (!data.skills) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 pb-1 border-b border-gray-200">
              Skills
            </h2>
            {renderSkillsList(data.skills)}
          </div>
        );

      case "experience":
        if (!data.experience || data.experience.length === 0) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-1 border-b border-gray-200">
              Work Experience
            </h2>
            {renderEntries(data.experience)}
          </div>
        );

      case "education":
        if (!data.education || data.education.length === 0) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-1 border-b border-gray-200">
              Education
            </h2>
            {renderEntries(data.education)}
          </div>
        );

      case "projects":
        if (!data.projects || data.projects.length === 0) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-1 border-b border-gray-200">
              Projects
            </h2>
            {renderEntries(data.projects)}
          </div>
        );

      case "certifications":
        if (!data.certifications || data.certifications.length === 0)
          return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-1 border-b border-gray-200">
              Certifications
            </h2>
            {renderEntries(data.certifications)}
          </div>
        );

      case "publications":
        if (!data.publications || data.publications.length === 0) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-1 border-b border-gray-200">
              Publications
            </h2>
            {renderEntries(data.publications)}
          </div>
        );

      case "awards":
        if (!data.awards || data.awards.length === 0) return null;
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-1 border-b border-gray-200">
              Awards & Honors
            </h2>
            {renderEntries(data.awards)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-sm rounded-sm">
      <div className="font-sans">
        {orderedSections.map((sectionId) => (
          <React.Fragment key={sectionId}>
            {renderSection(sectionId)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TemplateClean;
