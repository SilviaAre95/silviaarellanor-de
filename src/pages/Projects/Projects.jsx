import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Import local images
import homaImage from "@/assets/images/homa_ss.webp";
import profileImage from "@/assets/images/profile_gh.webp";
import mongoImage from "@/assets/images/mongo.webp";
import demoImage from "@/assets/images/demo.webp";
import wayworksImage from "@/assets/images/wayworks_gh.webp";

const allProjects = [
  {
    title: "wayworks: an open-source way of work",
    description:
      "My way of building with coding agents, packaged as a Claude Code plugin marketplace. It wires the code to a second brain (Obsidian) and a tracker (Linear). Try it: claude plugin marketplace add SilviaAre95/wayworks",
    outcomes: [
      { value: "15", label: "plugins" },
      { value: "43", label: "skills" },
    ],
    backgroundImage: wayworksImage,
    githubLink: "https://github.com/SilviaAre95/wayworks",
    liveLink: null,
    company: "Open Source",
    year: "2026"
  },
  {
    title: "Near-Real-Time MongoDB CDC Pipeline",
    description:
      "Replaced SQL-based ingestion with a private Python library on storage_write_api and CDC, which cut resource waste by about 80%. The redesigned Pub/Sub + Dataflow streaming architecture handles dynamic table routing and schema evolution, and cut costs 76%.",
    outcomes: [
      { value: "76%", label: "cost reduction" },
      { value: "~80%", label: "less resource waste" },
    ],
    backgroundImage: mongoImage,
    githubLink: null,
    liveLink: null,
    company: "Playtomic",
    year: "2025"
  },
  {
    title: "Real Estate Data Analytics Platform",
    description:
      "GCP data product for a property developer: construction and sales monitoring centralised into one BigQuery + Looker Studio platform, replacing manual reporting across the operation.",
    outcomes: [
      { value: "1", label: "unified platform" },
      { value: "100%", label: "ops automated" },
    ],
    backgroundImage: homaImage,
    githubLink: null,
    liveLink: null,
    company: "Grupo Homa",
    year: "2023"
  },
  {
    title: "Attendance Control Data Product",
    description:
      "Reusable Power BI data product backed by optimised BigQuery ELT pipelines. Built to be white-labelled: the company sold it to a large national enterprise client as their own product.",
    outcomes: [
      { value: "Enterprise", label: "client deal closed" },
    ],
    backgroundImage: demoImage,
    githubLink: null,
    liveLink: null,
    company: "Worky",
    year: "2024"
  },
  {
    title: "Data Engineer Portfolio",
    description:
      "The complete code of this site, open source. React, Vite, and Tailwind.",
    outcomes: [],
    backgroundImage: profileImage,
    githubLink: "https://github.com/SilviaAre95/silviaarellanor-de",
    liveLink: null,
    company: "Open Source",
    year: "2024"
  },
];

const ProjectCard = ({ project }) => (
  <div className="card-foam rounded-card overflow-hidden transition-transform duration-300 hover:-translate-y-1">
    {/* Project Image — §6: artwork is duotoned into the palette and carries grain. */}
    <div className="relative h-48 overflow-hidden bg-abyss brand-grain">
      <div
        className="w-full h-full bg-cover bg-center duotone-sea"
        style={{ backgroundImage: `url(${project.backgroundImage})` }}
      />
      <div className="absolute top-4 left-4 brand-pill pill-foam">
        <span className="t-tag">{project.company}</span>
      </div>
      <div className="absolute top-4 right-4 brand-pill pill-chrome">
        <span className="t-tag">{project.year}</span>
      </div>
    </div>

    {/* Project Content */}
    <div className="p-5">
      <h3 className="t-h3 mb-2 line-clamp-2">{project.title}</h3>

      {/* Outcome metrics */}
      {project.outcomes?.length > 0 && (
        <div className="flex gap-6 mb-3 pb-3 border-b-2 border-abyss">
          {project.outcomes.map((outcome, i) => (
            <div key={i}>
              <div className="text-[1.75rem] font-bold tracking-[-0.04em] leading-[0.9] text-deep">
                {outcome.value}
              </div>
              <div className="t-caption text-deep">{outcome.label}</div>
            </div>
          ))}
        </div>
      )}

      <p className="t-body text-deep mb-4 line-clamp-3 measure">
        {project.description}
      </p>

      {/* Project Links */}
      <div className="flex items-center space-x-4">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-link flex items-center space-x-2"
          >
            <FaGithub size={16} />
            <span className="t-tag">Code</span>
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-link flex items-center space-x-2"
          >
            <FaExternalLinkAlt size={14} />
            <span className="t-tag">Live Demo</span>
          </a>
        )}
        {project.company !== "Open Source" && !project.githubLink && !project.liveLink && (
          <div className="flex items-center justify-between w-full">
            <span className="t-caption text-deep italic">Proprietary Project</span>
            <a href="#contact" className="brand-link t-tag">
              Ask me about this
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-foam brand-section">
      <div className="brand-container">
        <div className="text-center mb-16">
          <h2 className="t-h2 mb-4">Projects</h2>
          <p className="t-body text-deep measure mx-auto">
            Recent work and what it did for the business
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