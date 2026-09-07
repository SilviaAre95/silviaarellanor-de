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
            <p className="tagline">Available for consulting — Madrid</p>

            <h1>
              I build the <em>machinery</em> underneath other people&rsquo;s
              businesses.
            </h1>

            <p className="hero__sub">
              Data platform architecture on Google Cloud, plus the AI-assisted
              delivery practice that keeps it moving. Fifteen years of physics
              habits pointed at pipelines that have to hold up on a Monday
              morning.
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
