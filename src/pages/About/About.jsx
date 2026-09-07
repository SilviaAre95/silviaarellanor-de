import silviaPhoto from "@/assets/images/silvia.webp";
import { contractExperience, longTermExperience } from "@/data/experience";

const TimelineColumn = ({ experiences, title }) => (
  <div>
    <h3 className="cv__group">{title}</h3>
    <ol className="cv__line">
      {experiences.map((experience) => (
        <li key={`${experience.title}-${experience.cardTitle}`}>
          <span className="cv__when">{experience.title}</span>
          <h4>{experience.cardTitle}</h4>
          <p>{experience.cardSubtitle}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default function About() {
  return (
    <>
      <section className="bio">
        <div className="wrap bio__grid">
          <div>
            {/* The mark at full colour, well above the 64px compact threshold.
                Never on sea; chrome is fine. */}
            <img
              className="bio__mark"
              src="/brand/logo-swallow.svg"
              alt=""
              width="128"
              height="128"
            />
            <p className="bio__motto">Signal, frequency, flow.</p>
            <p className="bio__roles">Physicist. Data engineer. Builder.</p>

            <h1>About</h1>

            <div className="bio__copy">
              <p>
                I&apos;m a senior data engineer. I build cloud data platforms and
                analytics systems on GCP.
              </p>
              <p>
                Over the last 6+ years I&apos;ve worked in sports tech, real
                estate, SaaS, and adtech. Ingestion pipelines, warehouses, BI
                systems, production infrastructure. I&apos;ve built most parts of
                the stack at one point or another.
              </p>
              <p>
                Most of my work sits between the engineering and whatever the
                business is actually trying to do. I&apos;m not very interested in
                chasing trends. I&apos;d rather build something reliable and cheap
                to run that a team can still work with a year after I&apos;ve gone.
              </p>
              <p>
                My core stack is BigQuery, Dataflow, Pub/Sub, Airflow, and dbt.
                Recently I redesigned a streaming pipeline around CDC and the
                Storage Write API. It cut platform costs by 76% and resource waste
                by about 80%.
              </p>
              <p>
                I&apos;ve built data products that got sold on to enterprise
                clients, and platforms that took manual operational work down to
                almost nothing. The one I&apos;m happiest about is a set of
                reusable frameworks that teams kept using long after the original
                project wrapped.
              </p>
              <p>
                I care about what happens after delivery: reusable patterns rather
                than one-off solutions, decisions written down somewhere findable,
                and systems shaped around how a company already works rather than
                how I&apos;d prefer it did. Most of it comes down to knowledge
                sharing, making sure the internal team understands the platform
                well enough that they don&apos;t need me, or any single vendor, to
                keep it running.
              </p>
              <p>
                Outside work I like coffee, sports, being outdoors, and building
                small apps for friends and family. I like making things that solve
                a real problem simply, which is probably why I do data engineering
                the same way.
              </p>
            </div>

            <div className="bio__cta">
              <a
                className="solid"
                href="/silvia-arellano-cv.pdf"
                download="silvia-arellano-senior-data-engineer.pdf"
              >
                Download resume
              </a>
              <a className="ghost" href="/#contact">
                Get in touch
              </a>
            </div>
          </div>

          <div className="bio__shot">
            <img src={silviaPhoto} alt="Silvia Arellano" />
          </div>
        </div>
      </section>

      <section className="cv">
        <div className="wrap">
          <h2 className="cv__title">Experience</h2>
          <p className="cv__lede">
            A full history of where I&apos;ve worked and what I&apos;ve built.
          </p>

          <div className="cv__grid">
            <TimelineColumn
              experiences={longTermExperience}
              title="Long-term engagements"
            />
            <TimelineColumn
              experiences={contractExperience}
              title="Contracts &amp; advisory"
            />
          </div>
        </div>
      </section>
    </>
  );
}
