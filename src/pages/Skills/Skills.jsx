import BrandWave from "@/components/BrandWave";
import { Cpu } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaAws,
  FaCode,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiWebpack,
  SiGooglecloud,
  SiKubernetes,
  SiTerraform,
  SiPulumi,
  SiDbt,
  SiStreamlit,
  SiLooker,
  SiMetabase,
  SiGooglebigquery,
  SiSnowflake,
  SiApachekafka,
  SiGooglepubsub,
  SiApacheairflow,
  SiPrefect,
  SiApachedruid,
} from "react-icons/si";
import { LuWorkflow } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { PiFileSqlBold } from "react-icons/pi";
import { TbApi, TbDatabaseCog } from "react-icons/tb";
import { MdAnimation } from "react-icons/md";

// Icons inherit the chip's colour rather than carrying vendor brand colours —
// the palette is closed, and thirty-odd hex values would break it.
const CATEGORIES = [
  {
    title: "Programming & Development",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "SQL", icon: <PiFileSqlBold /> },
      { name: "T-SQL", icon: <PiFileSqlBold /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "REST APIs", icon: <TbApi /> },
      { name: "GraphQL", icon: <SiGraphql /> },
      { name: "React", icon: <FaReact /> },
    ],
  },
  {
    title: "Data Engineering & ETL",
    skills: [
      { name: "ETL / rETL", icon: <LuWorkflow /> },
      { name: "Apache Beam", icon: <SiApachedruid /> },
      { name: "Kafka", icon: <SiApachekafka /> },
      { name: "Dataflow", icon: <SiWebpack /> },
      { name: "Airflow", icon: <SiApacheairflow /> },
      { name: "Prefect", icon: <SiPrefect /> },
      { name: "Pub/Sub", icon: <SiGooglepubsub /> },
    ],
  },
  {
    title: "Databases & Warehouses",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "BigQuery", icon: <SiGooglebigquery /> },
      { name: "Snowflake", icon: <SiSnowflake /> },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      { name: "GCP", icon: <SiGooglecloud /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Git", icon: <FaGitAlt /> },
      { name: "Terraform", icon: <SiTerraform /> },
      { name: "Pulumi", icon: <SiPulumi /> },
      { name: "Linux", icon: <FaLinux /> },
      { name: "CI/CD", icon: <LuWorkflow /> },
      { name: "Cloud Run", icon: <FaCode /> },
    ],
  },
  {
    title: "Analytics & BI Tools",
    skills: [
      { name: "dbt", icon: <SiDbt /> },
      { name: "Dataform", icon: <TbDatabaseCog /> },
      { name: "Looker", icon: <SiLooker /> },
      { name: "Power BI", icon: <VscGraph /> },
      { name: "Metabase", icon: <SiMetabase /> },
      { name: "Streamlit", icon: <SiStreamlit /> },
    ],
  },
  {
    title: "AI & Agents",
    skills: [
      { name: "Claude Code", icon: <Cpu /> },
      { name: "Agent Workflows & MCP", icon: <Cpu /> },
      { name: "AI-Assisted Delivery", icon: <FaCode /> },
      { name: "Local LLMs", icon: <Cpu /> },
      { name: "LLM Data Pipelines", icon: <Cpu /> },
      { name: "Prompt Engineering", icon: <MdAnimation /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="stack">
      {/* Corner mark. Decorative only — the section reads the same without it. */}
      <div className="stack__wave" aria-hidden="true">
        <BrandWave variant="crest" />
      </div>

      <div className="wrap">
        <h2 className="stack__title">Skills</h2>
        <p className="stack__lede">
          These are the tools I&rsquo;ve used to create data products.
          I&rsquo;ve worked with all cloud environments and many on-premise
          engagements.
        </p>

        <div className="stack__grid">
          {CATEGORIES.map((category, i) => (
            <article
              key={category.title}
              /* The two accents alternate, so no two neighbouring rectangles
                 carry the same one in either direction on the 3-up grid. */
              className={`stackcard ${i % 2 ? "stackcard--chrome" : ""}`}
            >
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill.name} className="chip">
                    <span className="chip__icon" aria-hidden="true">
                      {skill.icon}
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
