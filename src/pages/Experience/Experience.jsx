import { Briefcase, Users } from "lucide-react";
import {
  contractExperience,
  longTermExperience,
} from "@/data/experience";

const TimelineItem = ({ experience }) => {
  return (
    <div className="relative flex items-start mb-8">
      {/* Timeline dot */}
      <div className="flex-shrink-0 w-4 h-4 bg-chrome rounded-pill mt-3 mr-6 z-10"></div>
      
      {/* Content card */}
      <div className="flex-1">
        <div className="card-foam brand-card p-4 transition-transform duration-300 hover:-translate-y-0.5">
          {/* Date badge */}
          <div className="brand-pill pill-abyss t-tag mb-2">
            {experience.title}
          </div>
          
          {/* Job title and company */}
          <h3 className="t-h3 mb-1">{experience.cardTitle}</h3>
          <h4 className="t-body font-semibold text-deep">{experience.cardSubtitle}</h4>
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
        <h3 className="t-h2">{title}</h3>
      </div>
      
      <div className="brand-card card-foam p-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 w-0.5 h-full bg-deep/30"></div>
          
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
  return (
    <section id="experience" className="min-h-screen bg-foam relative brand-section">
      {/* Content container */}
      <div className="relative brand-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="t-h2 mb-4">Professional Journey</h2>
          <p className="t-body text-deep measure mx-auto">
            Building scalable data infrastructure and transforming businesses through data engineering excellence
          </p>
        </div>

        {/* Two-column layout for timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Professional Experience */}
          <CustomTimeline
            experiences={longTermExperience}
            title="Professional Experience"
            icon={Briefcase}
            accentColor="text-deep"
          />

          {/* Independent Projects */}
          <CustomTimeline
            experiences={contractExperience}
            title="Independent Projects"
            icon={Users}
            accentColor="text-abyss"
          />
        </div>

        {/* Resume Download CTA */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="t-h2 mb-4">Want more info about my experience?</h3>
            <p className="t-body text-deep measure mx-auto">
              Download my complete resume with detailed project descriptions, technical skills, and achievements.
            </p>
          </div>
          
          <a
            href="/silvia-arellano-cv.pdf"
            download="silvia-arellano-senior-data-engineer.pdf"
            className="brand-button"
          >
            <span>Download resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
