import { Briefcase, Zap } from "lucide-react";
import silviaPhoto from "@/assets/images/silvia.webp";
import {
  contractExperience,
  longTermExperience,
} from "@/data/experience";

const TimelineItem = ({ experience }) => (
  <div className="relative flex items-start mb-6">
    <div className="flex-shrink-0 w-3 h-3 bg-chrome rounded-pill mt-2 mr-5 z-10"></div>
    <div className="flex-1 card-foam brand-card p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="brand-pill pill-abyss t-tag mb-1">{experience.title}</div>
      <h3 className="t-h3">{experience.cardTitle}</h3>
      <p className="t-body text-deep">{experience.cardSubtitle}</p>
    </div>
  </div>
);

const TimelineColumn = ({ experiences, title, icon: Icon }) => (
  <div>
    <div className="flex items-center gap-2 mb-6">
      <Icon className="w-5 h-5 text-deep" />
      <h3 className="t-h3">{title}</h3>
    </div>
    <div className="relative">
      <div className="absolute left-1.5 top-0 w-px h-full bg-deep/30"></div>
      {experiences.map((exp, i) => (
        <TimelineItem key={i} experience={exp} />
      ))}
    </div>
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-foam pt-24 pb-20">
      <div className="brand-container max-w-5xl">

        {/* Bio section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <div className="flex-shrink-0">
            <div className="relative rounded-card overflow-hidden brand-grain w-52 h-64">
              <div
                role="img"
                aria-label="Silvia Arellano"
                className="w-full h-full bg-cover bg-center duotone-chrome"
                style={{ backgroundImage: `url(${silviaPhoto})` }}
              />
              <div className="absolute inset-0 cover-scrim pointer-events-none"></div>
            </div>
          </div>

          <div className="flex-1">
            {/* §4: no all-caps anywhere, including eyebrows. */}
            <p className="t-caption text-deep mb-3">About</p>
            <h1 className="t-h1 mb-6">Silvia Arellano</h1>
            <div className="space-y-4 t-body text-deep measure">
              <p>
                I'm a senior data engineer. I build cloud data platforms and analytics
                systems on GCP.
              </p>
              <p>
                Over the last 6+ years I've worked in sports tech, real estate, SaaS, and
                adtech. Ingestion pipelines, warehouses, BI systems, production
                infrastructure. I've built most parts of the stack at one point or another.
              </p>
              <p>
                Most of my work sits between the engineering and whatever the business is
                actually trying to do. I'm not very interested in chasing trends. I'd rather
                build something reliable and cheap to run that a team can still work with a
                year after I've gone.
              </p>
              <p>
                My core stack is BigQuery, Dataflow, Pub/Sub, Airflow, and dbt. Recently I
                redesigned a streaming pipeline around CDC and the Storage Write API. It cut
                platform costs by 76% and resource waste by about 80%.
              </p>
              <p>
                I've built data products that got sold on to enterprise clients, and platforms
                that took manual operational work down to almost nothing. The one I'm happiest
                about is a set of reusable frameworks that teams kept using long after the
                original project wrapped.
              </p>
              <p>
                I care about what happens after delivery: reusable patterns rather than
                one-off solutions, decisions written down somewhere findable, and systems
                shaped around how a company already works rather than how I'd prefer it did.
                Most of it comes down to knowledge sharing, making sure the internal team
                understands the platform well enough that they don't need me, or any single
                vendor, to keep it running.
              </p>
              <p>
                Outside work I like coffee, sports, being outdoors, and building small apps for
                friends and family. I like making things that solve a real problem simply,
                which is probably why I do data engineering the same way.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="/silvia-arellano-cv.pdf"
                download="silvia-arellano-senior-data-engineer.pdf"
                className="brand-button"
              >
                Download resume
              </a>
              <a
                href="/#contact"
                className="brand-button brand-button-chrome"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Experience timeline */}
        <div>
          <h2 className="t-h2 mb-2">Experience</h2>
          <p className="t-body text-deep mb-10 measure">
            A full history of where I've worked and what I've built.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <TimelineColumn
              experiences={longTermExperience}
              title="Long-term Engagements"
              icon={Briefcase}
            />
            <TimelineColumn
              experiences={contractExperience}
              title="Contracts & Advisory"
              icon={Zap}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
