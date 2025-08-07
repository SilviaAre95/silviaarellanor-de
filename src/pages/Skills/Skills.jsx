import React from "react";
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
  FaFigma,
  FaAws,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiWebpack,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiVite,
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
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <Card className="group relative overflow-hidden bg-main-lightGrey border-main-mediumGrey/30 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
    <CardContent className="p-6 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-3 rounded-xl bg-main-mediumGrey/20 ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-main-darkGrey">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="group/badge relative bg-main-lightGrey hover:bg-main-mediumGrey/20 text-main-darkGrey border-main-mediumGrey/30 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="font-medium">{skill.name}</span>
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
      color: "text-blue-400",
      skills: [
        {
          name: "Python",
          icon: <FaPython className="w-4 h-4 text-[#3776AB]" />,
        },
        {
          name: "SQL",
          icon: <PiFileSqlBold className="w-4 h-4 text-[#339933]" />,
        },
        {
          name: "T-SQL",
          icon: <PiFileSqlBold className="w-4 h-4 text-[#9CA3AF]" />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs className="w-4 h-4 text-[#339933]" />,
        },
        {
          name: "REST APIs",
          icon: <TbApi className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "GraphQL",
          icon: <SiGraphql className="w-4 h-4 text-[#E10098]" />,
        },
        { name: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
      ],
    },
    {
      icon: Database,
      title: "Data Engineering & ETL",
      color: "text-green-400",
      skills: [
        {
          name: "ETL/rETL",
          icon: <LuWorkflow className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "ApacheBeam",
          icon: <SiApachedruid className="w-4 h-4 text-[#E10098]" />,
        },
        { name: "Kafka", icon: <SiApachekafka className="w-4 h-4 text-[#764ABC]" /> },
        {
          name: "Dataflow",
          icon: <SiWebpack className="w-4 h-4 text-[#8DD6F9]" />,
        },
        { name: "Airflow", icon: <SiApacheairflow className="w-4 h-4 text-[#646CFF]" /> },
        { name: "Prefect", icon: <SiPrefect className="w-4 h-4 text-[#646CFF]" /> },
        { name: "Pub/Sub", icon: <SiGooglepubsub className="w-4 h-4 text-white" /> },
      ],
    },
    {
      icon: Cpu,
      title: "Databases & Warehouses",
      color: "text-purple-400",
      skills: [
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="w-4 h-4 text-[#336791]" />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="w-4 h-4 text-[#47A248]" />,
        },
        {
          name: "BigQuery",
          icon: <SiGooglebigquery className="w-4 h-4 text-[#007ACC]" />,
        },
        { name: "Snowflake", icon: <SiSnowflake className="w-4 h-4 text-[#29B5E8]" /> },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      color: "text-orange-400",
      skills: [
        { name: "GCP", icon: <SiGooglecloud className="w-4 h-4 text-[#FF9900]" /> },
        { name: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> },
        {
          name: "Docker",
          icon: <FaDocker className="w-4 h-4 text-[#2496ED]" />,
        },
        {
          name: "Kubernetes",
          icon: <SiKubernetes className="w-4 h-4 text-[#326CE5]" />,
        },
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "Terraform", icon: <SiTerraform className="w-4 h-4 text-[#F05032]" /> },
        { name: "Pulumi", icon: <SiPulumi className="w-4 h-4 text-[#F05032]" /> },
        { name: "Linux", icon: <FaLinux className="w-4 h-4 text-[#FCC624]" /> },
        { name: "CI/CD", icon: <FcWorkflow className="w-4 h-4" /> },
        {
          name: "Cloud Run",
          icon: <FaCode className="w-4 h-4 text-[#FFCA28]" />,
        },
      ],
    },
    {
      icon: Layout,
      title: "Analytics & BI Tools",
      color: "text-pink-400",
      skills: [
        {
          name: "DBT",
          icon: <SiDbt className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "Dataform",
          icon: <TbDatabaseCog className="w-4 h-4 text-[#9CA3AF]" />,
        },
        {
          name: "Looker",
          icon: <SiLooker className="w-4 h-4 text-white" />,
        },
        { name: "PowerBI", icon: <VscGraph className="w-4 h-4 text-[#61DAFB]" /> },
        { name: "Metabase", icon: <SiMetabase className="w-4 h-4 text-[#61DAFB]" /> },
        { name: "Streamlit", icon: <SiStreamlit className="w-4 h-4 text-[#61DAFB]" /> },
      ],
    },
    {
      icon: Paintbrush,
      title: "Professional Skills",
      color: "text-yellow-400",
      skills: [
        {
          name: "Bussiness Oriented",
          icon: <MdAnimation className="w-4 h-4 text-[#FF4081]" />,
        },
        {
          name: "Prompt Engineering",
          icon: <MdAnimation className="w-4 h-4 text-[#00C853]" />,
        },
        {
          name: "Planning and Management",
          icon: <Cpu className="w-4 h-4 text-[#7C4DFF]" />,
        },
        {
          name: "Innovation",
          icon: <MdAnimation className="w-4 h-4 text-[#FF6D00]" />,
        },
      ],
    },
  ];

  return (
    <section id="skills" className="pt-15 lg:pt-0 min-h-screen bg-main-white relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <section className="container mx-auto px-4 py-20 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-main-darkGrey mb-4">Skills</h2>
          <p className="text-lg text-main-mediumGrey max-w-2xl mx-auto">
            Technologies and tools I use to build scalable data solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
            />
          ))}
        </div>
      </section>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
