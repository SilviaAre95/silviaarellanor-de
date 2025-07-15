import React from "react";
import { Briefcase, Users } from "lucide-react";

const TimelineItem = ({ experience }) => {
  return (
    <div className="relative flex items-start mb-8">
      {/* Timeline dot */}
      <div className="flex-shrink-0 w-4 h-4 bg-accent-softBlue rounded-full border-4 border-main-white shadow-lg mt-3 mr-6 z-10"></div>
      
      {/* Content card */}
      <div className="flex-1">
        <div className="bg-main-white rounded-lg shadow-md border border-main-mediumGrey/30 p-4 hover:shadow-lg transition-shadow duration-300">
          {/* Date badge */}
          <div className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-accent-softBlue/20 text-accent-softBlue">
            {experience.title}
          </div>
          
          {/* Job title and company */}
          <h3 className="text-lg font-bold text-main-darkGrey mb-1">{experience.cardTitle}</h3>
          <h4 className="text-md font-semibold text-accent-softBlue">{experience.cardSubtitle}</h4>
        </div>
      </div>
    </div>
  );
};

const CustomTimeline = ({ experiences, title, icon: Icon, accentColor }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Icon className={`w-8 h-8 ${accentColor}`} />
        <h3 className="text-2xl font-bold text-main-darkGrey">{title}</h3>
      </div>
      
      <div className="bg-main-lightGrey rounded-lg p-6 border border-main-mediumGrey/30">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 w-0.5 h-full bg-accent-softBlue/30"></div>
          
          {/* Timeline items */}
          {experiences.map((experience, index) => (
            <TimelineItem
              key={index}
              experience={experience}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const fullTimeExperience = [
    {
      title: "April 2024 - Present",
      cardTitle: "Global Senior Data Engineer",
      cardSubtitle: "Playtomic"
    },
    {
      title: "Feb 2023 - April 2024",
      cardTitle: "Data Engineer / Data Product Developer",
      cardSubtitle: "Siftia Data Company"
    },
    {
      title: "Jun 2022 - Feb 2023",
      cardTitle: "Data Engineer/Analyst",
      cardSubtitle: "Worky"
    },
    {
      title: "Feb 2021 - Jul 2022",
      cardTitle: "Business Data Engineer",
      cardSubtitle: "MatchCraft"
    },
    {
      title: "Oct 2020 - Dec 2023",
      cardTitle: "Database Engineer (Seasonal)",
      cardSubtitle: "MMI Business Consulting"
    },
    {
      title: "Sept 2019 - Oct 2020",
      cardTitle: "Biomechanical Data Engineer",
      cardSubtitle: "B-Metrics"
    }
  ];

  const independentProjects = [
    {
      title: "June 2024 - Sept 2024",
      cardTitle: "Data Product Developer (Contractor)",
      cardSubtitle: "Worky"
    },
    {
      title: "Jan 2022 - Jan 2023",
      cardTitle: "Data Solutions Architect (Contractor)",
      cardSubtitle: "GRUPO HOMA Real Estate Developers"
    }
  ];

  return (
    <section id="experience" className="min-h-screen bg-main-white relative py-20">
      {/* Hero section background */}
      <div className="absolute inset-0 bg-gradient-to-br from-main-lightGrey via-main-white to-main-lightGrey pointer-events-none"></div>

      {/* Content container */}
      <div className="relative container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-main-darkGrey mb-4">Professional Journey</h2>
          <p className="text-lg text-main-mediumGrey max-w-2xl mx-auto">
            Building scalable data infrastructure and transforming businesses through data engineering excellence
          </p>
        </div>

        {/* Two-column layout for timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Professional Experience */}
          <CustomTimeline
            experiences={fullTimeExperience}
            title="Professional Experience"
            icon={Briefcase}
            accentColor="text-accent-softBlue"
          />

          {/* Independent Projects */}
          <CustomTimeline
            experiences={independentProjects}
            title="Independent Projects"
            icon={Users}
            accentColor="text-accent-mutedTeal"
          />
        </div>

        {/* Resume Download CTA */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-main-darkGrey mb-4">Want more info about my experience?</h3>
            <p className="text-lg text-main-mediumGrey max-w-xl mx-auto">
              Download my complete resume with detailed project descriptions, technical skills, and achievements.
            </p>
          </div>
          
          <a
            href="https://drive.google.com/file/d/1JeufhD5nm2EDt2PVQKtxptWcRrz6ITY1/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent-softBlue hover:bg-accent-mutedTeal text-white font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Get Resume</span>
            <i className="fas fa-download ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;