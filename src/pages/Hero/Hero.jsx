import BrandWave from "@/components/BrandWave";
import silviaPhoto from "@/assets/images/silvia.webp";

// The roster band. Chrome ground, pills cycling abyss → foam → sea.
const ROSTER = [
  "Data platform architecture",
  "GCP / BigQuery",
  "Streaming & data freshness",
  "AI-assisted delivery",
  "FinOps",
  "NIS2 / DORA / CRA",
];

export default function Hero() {
  return (
    <>
      {/* The crest: a dark band with the wave rising through it. Its final
          band is foam, so the artwork resolves into the hero ground below
          rather than ending on a hard edge. */}
      <div className="crest">
        <div className="crest__art" aria-hidden="true">
          <BrandWave variant="crest" />
        </div>
        <div className="crest__pad" />
      </div>

      <section id="hero" className="wrap hero">
        <div className="hero__grid">
          <div>
            <h1>
              <span>I build your data platform.</span>
              <em>You get the insights.</em>
            </h1>

            <p className="hero__sub">
              I design and run data platforms on GCP. Most of my work is ETL
              pipelines, BigQuery warehouses, and the infrastructure around
              them. Lately I also build open-source tools for AI-assisted
              development.
            </p>

            <div className="cta">
              <a className="solid" href="#contact">
                Start a conversation
              </a>
              <a className="ghost" href="#projects">
                See what I&rsquo;m building
              </a>
            </div>
          </div>

          <div className="shot">
            <img src={silviaPhoto} alt="Silvia Arellano" />
            <span className="shot__tag">Data Platform Architect</span>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap strip__inner">
          {ROSTER.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </>
  );
}
