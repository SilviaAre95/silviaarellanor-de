import Crest from "@/components/Crest";
import silviaPhoto from "@/assets/images/silvia.webp";

export default function Hero() {
  return (
    <>
      <Crest />

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
    </>
  );
}
