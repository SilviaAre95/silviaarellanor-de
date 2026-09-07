import { FaMedium, FaArrowRight } from "react-icons/fa";
// Generated at build time from the Medium RSS feed by scripts/fetch-blog.mjs;
// the committed copy is the fallback when the feed is unreachable.
import articles from "@/data/articles.json";

export default function Blog() {
  return (
    <section id="blog" className="notes">
      <div className="wrap">
        <h2 className="notes__title">Blog</h2>
        <p className="notes__lede">
          Notes from real projects, mostly data engineering and AI tooling
        </p>

        <ul className="notes__list">
          {articles.map((article) => (
            <li key={article.link}>
              {/* The whole row is the link: one destination, one target for
                  assistive tech, and a hit area the width of the page. */}
              <a
                className="post"
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="post__text">
                  <p className="post__meta">
                    {article.date} &middot; {article.readTime}
                  </p>
                  <h3>{article.title}</h3>
                  <p className="post__excerpt">{article.excerpt}</p>
                </div>

                <span className="post__go">
                  Read article
                  <FaArrowRight />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          className="notes__all"
          href="https://medium.com/@silvia.datadev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMedium />
          All articles on Medium
        </a>
      </div>
    </section>
  );
}
