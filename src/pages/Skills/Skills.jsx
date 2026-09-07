import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud } from "lucide-react";
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
  SiApachedruid
} from "react-icons/si";
import { LuWorkflow } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { PiFileSqlBold } from "react-icons/pi";
import { TbApi,TbDatabaseCog } from "react-icons/tb";
import { MdAnimation } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";

// Card fills cycle chrome → sea → deep (§7). The badge fill on each is chosen
// so its text stays contrast-safe per §3.
const CARD_TONES = [
  { card: "bg-chrome text-abyss", badge: "default", iconWell: "bg-abyss text-chrome" },
  { card: "bg-sea text-abyss", badge: "default", iconWell: "bg-abyss text-sea" },
  { card: "bg-deep text-foam", badge: "foam", iconWell: "bg-chrome text-abyss" },
];

const SkillCard = ({ icon: Icon, title, skills, tone }) => (
  <Card
    className={`group relative overflow-hidden brand-card ${tone.card} transition-transform duration-300 hover:-translate-y-1`}
  >
    <CardContent className="p-0 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-card ${tone.iconWell}`}>
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="t-h3">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant={tone.badge}>
            <span>{skill.icon}</span>
            <span>{skill.name}</span>
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Programming & Development",
      skills: [
        {
          name: "Python",
          icon: <FaPython className="w-4 h-4" />,
        },
        {
          name: "SQL",
          icon: <PiFileSqlBold className="w-4 h-4" />,
        },
        {
          name: "T-SQL",
          icon: <PiFileSqlBold className="w-4 h-4" />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs className="w-4 h-4" />,
        },
        {
          name: "REST APIs",
          icon: <TbApi className="w-4 h-4" />,
        },
        {
          name: "GraphQL",
          icon: <SiGraphql className="w-4 h-4" />,
        },
        { name: "React", icon: <FaReact className="w-4 h-4" /> },
      ],
    },
    {
      icon: Database,
      title: "Data Engineering & ETL",
      skills: [
        {
          name: "ETL/rETL",
          icon: <LuWorkflow className="w-4 h-4" />,
        },
        {
          name: "ApacheBeam",
          icon: <SiApachedruid className="w-4 h-4" />,
        },
        { name: "Kafka", icon: <SiApachekafka className="w-4 h-4" /> },
        {
          name: "Dataflow",
          icon: <SiWebpack className="w-4 h-4" />,
        },
        { name: "Airflow", icon: <SiApacheairflow className="w-4 h-4" /> },
        { name: "Prefect", icon: <SiPrefect className="w-4 h-4" /> },
        { name: "Pub/Sub", icon: <SiGooglepubsub className="w-4 h-4" /> },
      ],
    },
    {
      icon: Cpu,
      title: "Databases & Warehouses",
      skills: [
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="w-4 h-4" />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="w-4 h-4" />,
        },
        {
          name: "BigQuery",
          icon: <SiGooglebigquery className="w-4 h-4" />,
        },
        { name: "Snowflake", icon: <SiSnowflake className="w-4 h-4" /> },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      skills: [
        { name: "GCP", icon: <SiGooglecloud className="w-4 h-4" /> },
        { name: "AWS", icon: <FaAws className="w-4 h-4" /> },
        {
          name: "Docker",
          icon: <FaDocker className="w-4 h-4" />,
        },
        {
          name: "Kubernetes",
          icon: <SiKubernetes className="w-4 h-4" />,
        },
        { name: "Git", icon: <FaGitAlt className="w-4 h-4" /> },
        { name: "Terraform", icon: <SiTerraform className="w-4 h-4" /> },
        { name: "Pulumi", icon: <SiPulumi className="w-4 h-4" /> },
        { name: "Linux", icon: <FaLinux className="w-4 h-4" /> },
        { name: "CI/CD", icon: <FcWorkflow className="w-4 h-4" /> },
        {
          name: "Cloud Run",
          icon: <FaCode className="w-4 h-4" />,
        },
      ],
    },
    {
      icon: Layout,
      title: "Analytics & BI Tools",
      skills: [
        {
          name: "DBT",
          icon: <SiDbt className="w-4 h-4" />,
        },
        {
          name: "Dataform",
          icon: <TbDatabaseCog className="w-4 h-4" />,
        },
        {
          name: "Looker",
          icon: <SiLooker className="w-4 h-4" />,
        },
        { name: "PowerBI", icon: <VscGraph className="w-4 h-4" /> },
        { name: "Metabase", icon: <SiMetabase className="w-4 h-4" /> },
        { name: "Streamlit", icon: <SiStreamlit className="w-4 h-4" /> },
      ],
    },
    {
      icon: Paintbrush,
      title: "AI & Agents",
      skills: [
        {
          name: "Claude Code",
          icon: <Cpu className="w-4 h-4" />,
        },
        {
          name: "Agent Workflows & MCP",
          icon: <Cpu className="w-4 h-4" />,
        },
        {
          name: "AI-Assisted Delivery",
          icon: <FaCode className="w-4 h-4" />,
        },
        {
          name: "Local LLMs",
          icon: <Cpu className="w-4 h-4" />,
        },
        {
          name: "LLM Data Pipelines",
          icon: <Cpu className="w-4 h-4" />,
        },
        {
          name: "Prompt Engineering",
          icon: <MdAnimation className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <section id="skills" className="pt-15 lg:pt-0 min-h-screen bg-foam relative">
      <section className="brand-container brand-section relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="t-h2 mb-4">Skills</h2>
          <p className="t-body text-deep measure mx-auto">
            What I work with day to day
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              tone={CARD_TONES[index % CARD_TONES.length]}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default SkillsSection;
