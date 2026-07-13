import { Briefcase, Zap } from "lucide-react";
import silviaPhoto from "@/assets/images/silvia.png";

const TimelineItem = ({ experience }) => (
  <div className="relative flex items-start mb-6">
    <div className="flex-shrink-0 w-3 h-3 bg-accent-softBlue rounded-full border-3 border-main-white shadow mt-2 mr-5 z-10"></div>
    <div className="flex-1 bg-main-white rounded-lg border border-main-mediumGrey/20 p-4 hover:border-accent-softBlue/30 transition-colors duration-200">
      <div className="inline-block mb-1 px-3 py-0.5 rounded-full text-xs font-medium bg-accent-softBlue/10 text-accent-softBlue">
        {experience.title}
      </div>
      <h3 className="text-sm font-bold text-main-darkGrey">{experience.cardTitle}</h3>
      <p className="text-sm text-accent-softBlue">{experience.cardSubtitle}</p>
    </div>
  </div>
);

const TimelineColumn = ({ experiences, title, icon: Icon }) => (
  <div>
    <div className="flex items-center gap-2 mb-6">
      <Icon className="w-5 h-5 text-accent-softBlue" />
      <h3 className="text-base font-bold text-main-darkGrey">{title}</h3>
    </div>
    <div className="relative">
      <div className="absolute left-1.5 top-0 w-px h-full bg-accent-softBlue/20"></div>
      {experiences.map((exp, i) => (
        <TimelineItem key={i} experience={exp} />
      ))}
    </div>
  </div>
);

export default function About() {
  const fullTimeExperience = [
    { title: "April 2024 – Present",  cardTitle: "Global Senior Data Engineer",          cardSubtitle: "Playtomic" },
    { title: "Feb 2023 – April 2024", cardTitle: "Data Engineer / Data Product Developer", cardSubtitle: "Siftia Data Company" },
    { title: "Jun 2022 – Feb 2023",   cardTitle: "Data Engineer / Analyst",               cardSubtitle: "Worky" },
    { title: "Feb 2021 – Jul 2022",   cardTitle: "Business Data Engineer",                cardSubtitle: "MatchCraft" },
    { title: "Oct 2020 – Dec 2023",   cardTitle: "Database Engineer (Seasonal)",          cardSubtitle: "MMI Business Consulting" },
    { title: "Sept 2019 – Oct 2020",  cardTitle: "Biomechanical Data Engineer",           cardSubtitle: "B-Metrics" },
  ];

  const contracts = [
    { title: "June 2024 – Sept 2024", cardTitle: "Data Product Developer",      cardSubtitle: "Worky (Contract)" },
    { title: "Jan 2022 – Jan 2023",   cardTitle: "Data Solutions Architect",    cardSubtitle: "Grupo Homa (Contract)" },
  ];

  return (
    <div className="min-h-screen bg-main-lightGrey pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        {/* Bio section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <div className="flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border-2 border-main-mediumGrey/20 shadow-lg w-52 h-64">
              <img
                src={silviaPhoto}
                alt="Silvia Arellano"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-main-darkGrey/40 to-transparent"></div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent-softBlue mb-3">About</p>
            <h1 className="text-3xl font-bold text-main-darkGrey mb-6 leading-tight">
              Silvia Arellano
            </h1>
            <div className="space-y-4 text-main-darkGrey/80 leading-relaxed">
              <p>
                I'm a senior data engineer focused on building scalable cloud data platforms
                and analytics systems on GCP.
              </p>
              <p>
                Over the last 6+ years, I've worked across sports tech, real estate, SaaS, and
                adtech — designing and delivering everything from ingestion pipelines and
                warehouses to BI systems and production infrastructure.
              </p>
              <p>
                Most of my work sits at the intersection of engineering, operations, and business
                outcomes. I care less about chasing trends and more about building systems that
                are reliable, cost-efficient, and easy for teams to work with long after launch.
              </p>
              <p>
                My core stack is BigQuery, Dataflow, Pub/Sub, Airflow, and dbt. Recently, I
                redesigned a streaming pipeline using a CDC-based approach with the Storage Write
                API, reducing platform costs by 76% and cutting resource waste by roughly 80%.
              </p>
              <p>
                I've helped build data products that were sold to enterprise clients, platforms
                that automated operational workflows end-to-end, and reusable frameworks that
                teams continued using well beyond the original project.
              </p>
              <p>
                I also care a lot about how teams work with data after the platform is delivered.
                That means building reusable patterns instead of one-off solutions, documenting
                decisions clearly, and designing systems that fit the way a company already works.
                A big part of the job is knowledge sharing — helping internal teams understand the
                platform, move faster independently, and avoid becoming dependent on a single
                engineer or vendor.
              </p>
              <p>
                Outside of work, I enjoy coffee, sports, nature, and building small apps for
                friends and family. I like creating things that solve real problems in a simple
                and practical way, which is probably why I approach data engineering the same way.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="/silvia-arellano-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-softBlue hover:bg-accent-mutedTeal text-white text-sm font-medium transition-colors duration-200"
              >
                Download CV
                <i className="fas fa-download text-xs"></i>
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-main-white hover:bg-main-lightGrey text-main-darkGrey text-sm font-medium border border-main-mediumGrey/30 transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Experience timeline */}
        <div>
          <h2 className="text-2xl font-bold text-main-darkGrey mb-2">Experience</h2>
          <p className="text-main-mediumGrey mb-10 text-sm">
            A full history of where I've worked and what I've built.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <TimelineColumn
              experiences={fullTimeExperience}
              title="Long-term Engagements"
              icon={Briefcase}
            />
            <TimelineColumn
              experiences={contracts}
              title="Contracts & Advisory"
              icon={Zap}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
