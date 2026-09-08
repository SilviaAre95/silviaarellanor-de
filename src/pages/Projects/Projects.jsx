import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Import local images
import homaImage from "@/assets/images/homa_dashboard.webp";
import profileImage from "@/assets/images/profile_gh.webp";
import mongoImage from "@/assets/images/mongo_cdc.webp";
import demoImage from "@/assets/images/demo.webp";
import wayworksImage from "@/assets/images/wayworks_gh.webp";

const allProjects = [
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

// Card grounds cycle sea -> chrome -> abyss, per the composition Silvia
// supplied. On the dark one the ink inverts; the tokens are set in CSS.
const TONES = ["sea", "chrome", "abyss"];

const ProjectCard = ({ project, tone }) => {
  const isOpenSource = project.company === "Open Source";
  const hasLinks = project.githubLink || project.liveLink;

  return (
    <article className={`pcard pcard--${tone}`}>
      <div className="pcard__shot">
        {/* Decorative: the meta line and title beside it carry the meaning. */}
        <img src={project.backgroundImage} alt="" />
      </div>

      <div className="pcard__body">
        <p className="pcard__meta">
          {project.company} / {project.year}
        </p>

        <h3>{project.title}</h3>

        <p className="pcard__desc">{project.description}</p>

        {project.outcomes?.length > 0 && (
          <ul className="pcard__stats">
            {project.outcomes.map((outcome) => (
              <li key={outcome.label}>
                <b>{outcome.value}</b>
                <span>{outcome.label}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="pcard__foot">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <FaGithub size={15} />
              Code
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt size={13} />
              Live demo
            </a>
          )}
          {!isOpenSource && !hasLinks && (
            <>
              <span className="pcard__private">Proprietary project</span>
              <a href="#contact">Ask me about this &rarr;</a>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="work">
      <div className="wrap">
        <h2 className="work__title">Selected work</h2>
        <p className="work__lede">Systems built to keep working.</p>

        <div className="work__grid">
          {allProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              tone={TONES[i % TONES.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
