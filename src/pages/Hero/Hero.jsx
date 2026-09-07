import { FlipWords } from "@/components/ui/flip-words";
import silviaPhoto from "@/assets/images/silvia.webp";

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
      className="hero-section relative min-h-screen bg-foam flex items-center py-28 md:py-32 overflow-x-clip"
    >
      <div className="w-full max-w-[1180px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left column — text */}
          <div>
            {/* Availability. A chrome dot, not a chrome slab: the accent should
                register without becoming the loudest thing on the page. */}
            <p className="flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.04em] text-deep mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-chrome shrink-0" />
              Available for consulting engagements
            </p>

            <h1 className="text-abyss font-bold leading-[0.95] tracking-[-0.035em] text-[clamp(2.6rem,1.5rem+3.4vw,4rem)]">
              Silvia Arellano
            </h1>

            <p className="mt-4 text-deep font-medium tracking-[-0.02em] text-[clamp(1.25rem,1.05rem+0.8vw,1.65rem)]">
              Data Platform Architect
            </p>

            {/* The one piece of chrome in the composition. */}
            <div className="mt-6 h-[3px] w-14 bg-chrome" />

            {/* Rotating specialties, kept quiet — it is a caption, not a badge. */}
            <div className="mt-5 h-7">
              <FlipWords
                className="!px-0 text-base font-medium tracking-[0.01em] text-deep/85"
                words={words}
              />
            </div>

            <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-[1.65] text-abyss/75">
              I design and run data platforms on GCP. Most of my work is ETL
              pipelines, BigQuery warehouses, and the infrastructure around
              them. Lately I also build open-source tools for AI-assisted
              development.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-abyss px-7 py-3.5 font-semibold text-foam transition-colors duration-200 hover:bg-deep"
              >
                Work with me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold text-abyss ring-1 ring-abyss/25 transition-colors duration-200 hover:ring-abyss/70"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Right column — portrait */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-md">
              <div
                role="img"
                aria-label="Silvia Arellano - Senior Data Engineer"
                className="brand-photo w-full aspect-[4/5] bg-cover"
                style={{
                  backgroundImage: `url(${silviaPhoto})`,
                  backgroundPosition: "center 20%",
                }}
              />
              <div className="brand-photo-tint absolute inset-0 pointer-events-none" />
            </div>
            <p className="mt-4 text-[0.8125rem] tracking-[0.04em] text-deep/80">
              Mexico City | Madrid · working with teams worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[0.75rem] tracking-[0.14em] text-deep/60">
          Scroll to explore
        </span>
        <span className="w-px h-7 bg-deep/25" />
      </div>
    </section>
  );
}
