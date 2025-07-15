import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Import local images
import portfolioImage from "@/assets/images/portfolio.png";

const professionalProjects = [
  {
    title: "Enterprise-Level MongoDB CDC Data Service",
    description:
      "Designed and implemented a scalable ETL pipeline processing 10TB+ daily data using Apache Airflow, Spark, and AWS services.",
    backgroundImage: portfolioImage,
    githubLink: null, // Professional projects might not have public repos
    liveLink: null,
    company: "TechCorp",
    year: "2024"
  },
  {
    title: "Real-time Analytics Dashboard",
    description:
      "Built a real-time analytics platform using Kafka, PostgreSQL, and React, serving 100k+ daily active users.",
    backgroundImage: portfolioImage,
    githubLink: null,
    liveLink: null,
    company: "DataFlow Inc",
    year: "2023"
  },
];

const independentProjects = [
  {
    title: "Olova! A Lightweight JavaScript Library",
    description:
      "A lightweight JavaScript library for creating beautiful, responsive UI components.",
    backgroundImage: portfolioImage,
    githubLink: "https://github.com/olovajs/olova",
    liveLink: "https://olova.js.org/",
  },
  {
    title: "Data Engineer Portfolio",
    description:
      "The complete code of how I built my protofolio using and contributing to open source.",
    backgroundImage: portfolioImage,
    githubLink: "https://github.com/SilviaAre95/silviaarellanor-de",
    liveLink: "https://codewhisperer.vercel.app/",
  },
];

const ProjectCard = ({ project, isProfessional = false }) => (
  <div className="bg-main-lightGrey rounded-lg overflow-hidden border border-main-mediumGrey/20 hover:border-main-mediumGrey/40 transition-all duration-300 hover:shadow-lg">
    {/* Project Image */}
    <div className="relative h-48 overflow-hidden bg-main-mediumGrey/10">
      <div
        className="w-full h-full bg-cover bg-center opacity-90 hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%), url(${project.backgroundImage})`,
        }}
      />
      <div className="absolute top-4 left-4 bg-main-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-sm text-main-darkGrey font-medium">
          {isProfessional ? project.company : 'Open Source'}
        </span>
      </div>
      {isProfessional && (
        <div className="absolute top-4 right-4 bg-accent-softBlue/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm text-white font-medium">{project.year}</span>
        </div>
      )}
    </div>

    {/* Project Content */}
    <div className="p-5">
      <h3 className="text-lg font-semibold text-main-darkGrey mb-2 line-clamp-2">
        {project.title}
      </h3>
      <p className="text-main-mediumGrey mb-4 line-clamp-3 text-sm">
        {project.description}
      </p>

      {/* Project Links */}
      <div className="flex items-center space-x-4">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
          >
            <FaGithub size={16} />
            <span className="text-sm">Code</span>
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
          >
            <FaExternalLinkAlt size={14} />
            <span className="text-sm">Live Demo</span>
          </a>
        )}
        {isProfessional && !project.githubLink && !project.liveLink && (
          <span className="text-sm text-main-mediumGrey italic">Proprietary Project</span>
        )}
      </div>
    </div>
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-main-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-main-darkGrey mb-4">Projects</h2>
          <p className="text-lg text-main-mediumGrey max-w-2xl mx-auto">
            A collection of my recent work in data engineering and software development
          </p>
        </div>

        {/* Desktop: Side-by-side layout, Mobile: Stacked */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <div className="space-y-6">
            <div className="text-center xl:text-left">
              <h3 className="text-2xl font-semibold text-main-darkGrey mb-2">
                Professional Experience
              </h3>
              <p className="text-main-mediumGrey">
                Enterprise-scale data engineering projects
              </p>
            </div>
            <div className="space-y-6">
              {professionalProjects.map((project, index) => (
                <ProjectCard key={index} project={project} isProfessional={true} />
              ))}
            </div>
          </div>

          {/* Independent Projects */}
          <div className="space-y-6">
            <div className="text-center xl:text-left">
              <h3 className="text-2xl font-semibold text-main-darkGrey mb-2">
                Independent Projects
              </h3>
              <p className="text-main-mediumGrey">
                Open source contributions and personal projects
              </p>
            </div>
            <div className="space-y-6">
              {independentProjects.map((project, index) => (
                <ProjectCard key={index} project={project} isProfessional={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}