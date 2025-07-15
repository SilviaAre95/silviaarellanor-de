import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import { FlipWords } from "@/components/ui/flip-words";

export default function Hero() {
  const words = [
    "Senior Data Architect",
    "ETL Pipeline Engineer",
    "Data Warehouse Specialist",
    "Big Data Analytics Engineer",
  ];

  const code = `const dataEngineer = {
  name: "Silvia Arellano",
  role: "Senior Data Engineer",
  experience: "5+ years",
  skills: {
    languages: ["Python", "SQL", "Node.js"],
    tools: ["Apache Beam", "Airflow", "Kafka"],
    cloud: ["AWS", "GCP", "Azure"],
    databases: ["PostgreSQL", "MongoDB", "BigQuery"]
  },
  passion: "Building scalable data infrastructure"
};

console.log("Ready to transform your data!");`;

  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    Prism.highlightAll();

    const handleResize = () => {
      const isSmallHeight = window.innerHeight < 750;
      setShowContent(!isSmallHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className={`hero-section relative min-h-screen bg-main-white ${
        showContent ? "" : "hidden"
      } py-20 md:py-32 flex items-center`}
    >
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-main-lightGrey via-main-white to-main-lightGrey pointer-events-none"></div>

          {/* Main content container */}
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 px-4 md:px-8">
            {/* Left column - Text content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              {/* Welcome badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main-lightGrey backdrop-blur-sm border border-main-mediumGrey/30 mb-8">
                <div className="w-2 h-2 rounded-full bg-accent-mutedTeal"></div>
                <span className="text-main-darkGrey text-sm font-medium">
                  Data Engineering Professional
                </span>
              </div>

              {/* Name section */}
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-main-darkGrey">
                  Silvia Arellano
                  <span className="block gradient-text">Data Platform Architect</span>
                </h1>
              </div>

              {/* Role badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-main-lightGrey border border-main-mediumGrey/30 mb-8">
                <span>
                  <FlipWords
                    className="text-xl text-accent-softBlue font-medium"
                    words={words}
                  />
                </span>
              </div>

              {/* Description */}
              <div className="mb-12 max-w-xl">
                <p className="text-lg text-main-darkGrey/80 leading-relaxed">
                  Architecting robust data solutions and transforming complex datasets 
                  into actionable insights. Specialized in building scalable ETL pipelines 
                  and data infrastructure.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* View Projects Button */}
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent-softBlue hover:bg-accent-mutedTeal text-white font-medium transition-colors duration-200"
                >
                  <span>View Projects</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>

                {/* Resume Button */}
                <a
                  href="https://drive.google.com/file/d/1JeufhD5nm2EDt2PVQKtxptWcRrz6ITY1/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-main-white hover:bg-main-lightGrey text-main-darkGrey font-medium border border-main-mediumGrey/30 transition-colors duration-200"
                >
                  <span>Get Resume</span>
                  <i className="fas fa-download ml-2"></i>
                </a>
              </div>
            </div>

            {/* Right column - Code window */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden border border-main-mediumGrey/30">
                <div className="code-window bg-main-lightGrey">
                  <div className="window-header bg-main-mediumGrey/20 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent-gentleCoral"></div>
                      <div className="w-3 h-3 rounded-full bg-accent-subtleYellow"></div>
                      <div className="w-3 h-3 rounded-full bg-accent-mutedTeal"></div>
                      <span className="ml-4 text-sm text-main-darkGrey">
                        data_engineer.js
                      </span>
                    </div>
                  </div>
                  <pre className="language-javascript !bg-main-darkGrey">
                    <code className="language-javascript">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-main-mediumGrey text-sm">
          Scroll to explore
        </span>
        <i className="fas fa-chevron-down text-main-mediumGrey text-lg"></i>
      </div>
    </section>
  );
}