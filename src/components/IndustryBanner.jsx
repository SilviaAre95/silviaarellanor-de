import React from "react";
import { 
  FaGamepad, 
  FaHome, 
  FaBuilding, 
  FaChartLine, 
  FaRunning, 
  FaIndustry,
  FaHeartbeat,
  FaShoppingCart,
  FaUsers,
  FaGlobe
} from "react-icons/fa";

const IndustryBanner = () => {
  const industries = [
    { name: "Real Estate", icon: FaHome },
    { name: "Enterprise", icon: FaBuilding },
    { name: "Marketing", icon: FaChartLine },
    { name: "Sports Analytics", icon: FaRunning },
    { name: "Tax", icon: FaIndustry },
    { name: "Healthcare", icon: FaHeartbeat },
    { name: "E-commerce", icon: FaShoppingCart },
    { name: "HR Tech", icon: FaUsers },
    { name: "SaaS", icon: FaGlobe },
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedIndustries = [...industries, ...industries];

  return (
    <div className="relative py-12 bg-main-lightGrey border-y border-main-mediumGrey/20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-main-lightGrey via-main-white to-main-lightGrey"></div>
      
      {/* Moving banner container */}
      <div className="relative">
        <div className="flex animate-scroll-left">
          {duplicatedIndustries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 px-8 py-4 mx-4 bg-main-white rounded-lg shadow-sm border border-main-mediumGrey/20 hover:shadow-md transition-shadow duration-300 min-w-max"
              >
                <Icon className="w-6 h-6 text-accent-softBlue" />
                <span className="text-main-darkGrey font-medium whitespace-nowrap">
                  {industry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fade gradients on edges */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-main-lightGrey to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-main-lightGrey to-transparent z-10"></div>

      {/* Section title */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-sm text-main-mediumGrey font-medium">
          Industries I've Worked In
        </p>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default IndustryBanner;