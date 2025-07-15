import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import silviaPhoto from "@/assets/images/silvia.png";

export default function Hero() {
  const words = [
    "Senior Data Architect",
    "ETL Pipeline Engineer",
    "Data Warehouse Specialist",
    "Big Data Analytics Engineer",
  ];


  return (
    <section
      id="hero"
      className="hero-section relative min-h-screen bg-main-white py-16 sm:py-20 md:py-32 flex items-center"
    >
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-main-lightGrey via-main-white to-main-lightGrey pointer-events-none"></div>

          {/* Main content container */}
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 px-4 md:px-8">
            {/* Left column - Text content */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
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

            {/* Right column - Photo */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-softBlue/20 to-accent-mutedTeal/20 rounded-full blur-3xl"></div>
                
                {/* Photo container */}
                <div className="relative rounded-2xl overflow-hidden border-4 border-main-lightGrey shadow-2xl">
                  <img 
                    src={silviaPhoto} 
                    alt="Silvia Arellano - Senior Data Engineer"
                    className="w-full h-full object-cover max-w-md"
                  />
                  
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-main-darkGrey/50 to-transparent"></div>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-medium opacity-90">Data Engineer Professional</p>
                    <p className="text-xs opacity-75">Building reliable Data Infrastructure</p>
                  </div>
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