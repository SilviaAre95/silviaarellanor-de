import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Import local images
import portfolioImage from "@/assets/images/portfolio.png";
import homaImage from "@/assets/images/homa_ss.png";
import profileImage from "@/assets/images/profile_gh.png";
import mongoImage from "@/assets/images/mongo.png";
import demoImage from "@/assets/images/demo.png";

const allProjects = [
  {
    title: "Enterprise-Level MongoDB CDC Data Service",
    description:
      "Built a scalable CDC pipeline from MongoDB to BigQuery using Pub/Sub and Dataflow, with dynamic table routing and resume token handling. Automated collection detection and supported schema evolution for continuous integration.",
    backgroundImage: mongoImage,
    githubLink: null,
    liveLink: null,
    company: "Playtomic",
    year: "2025"
  },
  {
    title: "Real Estate Data Analytics Platform",
    description:
      "Developed a GCP-based data product with BigQuery and Looker Studio, automating operations and centralizing construction and sales monitoring.",
    backgroundImage: homaImage,
    githubLink: null,
    liveLink: null,
    company: "Grupo Homa - Real Estate Developers",
    year: "2023"
  },
  {
    title: "End-to-end Data Product: Assitance control dashboard",
    description:
      "Built a reusable Power BI data product with BigQuery ELT pipelines and optimized modelling, enabling insights on workers assitance management. This product was sold by the company to a large national client.",
    backgroundImage: demoImage,
    githubLink: null,
    liveLink: null,
    company: "Worky",
    year: "2024"
  },
  {
    title: "Data Engineer Portfolio",
    description:
      "The complete code of how I built my portfolio using and contributing to open source.",
    backgroundImage: profileImage,
    githubLink: "https://github.com/SilviaAre95/silviaarellanor-de",
    liveLink: null,
    company: "Open Source",
    year: "2024"
  },
];

const ProjectCard = ({ project }) => (
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
          {project.company}
        </span>
      </div>
      <div className="absolute top-4 right-4 bg-accent-softBlue/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-sm text-white font-medium">{project.year}</span>
      </div>
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
        {project.company !== "Open Source" && !project.githubLink && !project.liveLink && (
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

        {/* Unified grid layout - dynamic distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}