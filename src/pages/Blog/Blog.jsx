import { FaMedium, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";
// Generated at build time from the Medium RSS feed by scripts/fetch-blog.mjs;
// the committed copy is the fallback when the feed is unreachable.
import articles from "@/data/articles.json";

export default function Blog() {
  // §9: section grounds alternate. Projects sits on foam and the roster band on
  // chrome, so writing takes the abyss ground.
  return (
    <section id="blog" className="min-h-screen bg-abyss text-foam brand-section">
      <div className="brand-container">
        <div className="text-center mb-16">
          <h2 className="t-h2 mb-4">Blog</h2>
          <p className="t-body text-foam/80 measure mx-auto">
            Notes from real projects, mostly data engineering and AI tooling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {articles.map((article, index) => (
            <article
              key={index}
              className="brand-card card-deep group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 t-caption text-foam/80">
                  <span className="flex items-center space-x-1">
                    <FaCalendarAlt size={14} />
                    <span>{article.date}</span>
                  </span>
                  <span className="text-chrome">{article.readTime}</span>
                </div>
              </div>

              <h3 className="t-h3 mb-3 group-hover:text-chrome transition-colors">
                {article.title}
              </h3>

              <p className="t-body text-foam/80 mb-4 line-clamp-3 measure">
                {article.excerpt}
              </p>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-link-dark inline-flex items-center space-x-2"
              >
                <span className="t-tag">Read More</span>
                <FaExternalLinkAlt size={12} />
              </a>
            </article>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://medium.com/@silvia.datadev"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-button brand-button-chrome"
          >
            <FaMedium size={20} />
            <span>View All Articles on Medium</span>
            <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}