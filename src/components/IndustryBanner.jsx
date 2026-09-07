import {
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
    // Brand spec §3: chrome ground + abyss type is the roster / services band.
    <div className="relative py-12 bg-chrome text-abyss overflow-hidden">
      {/* Moving banner container */}
      <div className="relative industry-track">
        <div className="flex animate-scroll-left">
          {duplicatedIndustries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="brand-pill pill-abyss px-8 py-4 mx-4 min-w-max"
              >
                <Icon className="w-6 h-6" />
                <span className="t-roster whitespace-nowrap">
                  {industry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section title */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
        <p className="t-caption">
          Industries I&apos;ve Worked In
        </p>
      </div>

      <style>{`
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
        /* Edge treatment as a transparency mask rather than a colour gradient,
           so entries stay readable as they enter and leave without adding a
           decorative gradient fill (brand spec §3). */
        .industry-track {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 5rem,
            #000 calc(100% - 5rem),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 5rem,
            #000 calc(100% - 5rem),
            transparent 100%
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default IndustryBanner;
