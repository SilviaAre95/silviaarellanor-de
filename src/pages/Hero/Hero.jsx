import { FlipWords } from "@/components/ui/flip-words";
import BrandWave from "@/components/BrandWave";
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
      className="hero-section relative min-h-screen bg-abyss text-foam pt-20 sm:pt-24 md:pt-28 flex flex-col overflow-x-clip"
    >
      {/* Main content container */}
      <div className="flex-1 flex items-center">
        <div className="brand-container flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left column - Text content */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          {/* Availability caption — §4's caption pairing, chrome on abyss (10.06). */}
          <div className="brand-pill pill-chrome mb-8">
            <span className="w-2 h-2 rounded-pill bg-abyss shrink-0"></span>
            <span className="t-tag">Available for consulting engagements</span>
          </div>

          {/* Name section */}
          <div className="mb-8">
            <h1 className="t-h1 text-foam">
              Silvia Arellano
              <span className="block text-sea">Data Platform Architect</span>
            </h1>
          </div>

          {/* Role badge — max-w-full + responsive text so long titles wrap instead of
              overflowing the viewport on small screens (XARI-76) */}
          <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 rounded-card bg-deep mb-8 max-w-full">
            <span className="min-w-0">
              <FlipWords
                className="t-roster text-chrome"
                words={words}
              />
            </span>
          </div>

          {/* Description */}
          <div className="mb-12 measure-lead">
            <p className="t-body text-foam/85">
              I design and run data platforms on GCP. Most of my work is ETL
              pipelines, BigQuery warehouses, and the infrastructure around
              them. Lately I also build open-source tools for AI-assisted
              development.
            </p>
          </div>

          {/* CTA Buttons — consulting-primary (XARI-78) */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Work with me (primary) */}
            <a href="#contact" className="brand-button brand-button-chrome">
              <span>Work with me</span>
            </a>

            {/* View Projects (secondary) */}
            <a href="#projects" className="brand-button brand-button-invert">
              <span>View Projects</span>
            </a>
          </div>
        </div>

        {/* Right column - Photo */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative brand-grain w-full max-w-md">
            {/* §6: duotoned into the palette, never full colour. The photo is a
                background so background-blend-mode can do the duotone. */}
            <div
              role="img"
              aria-label="Silvia Arellano - Senior Data Engineer"
              className="duotone-chrome rounded-card w-full aspect-[4/5] bg-cover"
              style={{
                backgroundImage: `url(${silviaPhoto})`,
                backgroundPosition: "center 22%",
              }}
            />

            {/* Cover scrim — the one gradient the system permits (§6). */}
            <div className="absolute inset-0 rounded-card cover-scrim pointer-events-none"></div>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-foam">
              <p className="t-tag">Data Platform Architect</p>
              <p className="t-caption text-foam/80">
                Mexico City | Madrid · working with teams worldwide
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — above the wave, so the cue never sits on the
          chrome band where foam type would fail contrast. */}
      <div className="relative z-10 flex flex-col items-center gap-2 pt-6 pb-4">
        <span className="t-caption text-foam/80">Scroll to explore</span>
        <span className="w-px h-6 bg-chrome"></span>
      </div>

      {/* Brand spec §5: the wave is a horizon anchored to the bottom edge. It
          sits in flow rather than over the content, so nothing is ever typeset
          on the bands. */}
      <div className="h-[clamp(110px,17vh,210px)] w-full">
        <BrandWave variant="cover" className="w-full h-full block" />
      </div>
    </section>
  );
}
