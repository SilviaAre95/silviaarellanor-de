import { useState } from "react";
import {
  Award,
  Calendar,
  BookOpen,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const educationData = [
    {
      degree: "Masters in Open Source Software",
      school: "Autonomous University of Chihuahua",
      mascot: "📘",
      year: "2018-2020",
      achievements: ["GPA: 4.89", "Subject: Science"],
      skills: ["Mathematics", "Physics", "Chemistry", "Biology"],
      description:
        "Focused on core science subjects with emphasis on practical laboratory work and scientific research methodologies.",
    },
    {
      degree: "Bachelor of Physics",
      school: "Benemeirtus ",
      mascot: "📗",
      year: "2021-2023",
      achievements: ["GPA: 4.25", "Subject: Arts"],
      skills: ["Literature", "Social Studies", "Economics", "History"],
      description:
        "Developed strong analytical and critical thinking skills through comprehensive study of humanities and social sciences.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="education" className="min-h-screen relative overflow-hidden brand-section bg-foam">
      <div className="brand-container max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="t-h2 mb-6">
            Educational Journey
          </h2>
          <p className="t-body text-deep measure mx-auto">
            Discover how academic excellence shapes innovative thinking and
            professional growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative brand-card p-8 transition-colors duration-300 ${
                hoveredIndex === index ? "card-chrome" : "card-foam"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{edu.mascot}</span>
                    <h3 className="t-h3">
                      {edu.degree}
                    </h3>
                  </div>
                  <p className="t-body flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {edu.school}
                  </p>
                  <p className="t-caption flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {edu.year}
                  </p>
                </div>

                <p className="t-body italic border-l-2 border-abyss pl-3 measure">
                  {edu.description}
                </p>

                <div className="space-y-3">
                  <h4 className="t-tag flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="brand-pill pill-abyss t-tag"
                      >
                        <Award className="w-4 h-4" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="brand-pill pill-outline t-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
