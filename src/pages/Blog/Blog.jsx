import React from "react";
import { FaMedium, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

const articles = [
  {
    title: "Parallelizing BigQuery Stored Procedures with Google Cloud Functions",
    excerpt: "A case study in squeezing speed out of serverless stored procedures in BigQueryices for task orchestration and monitoring.",
    date: "Jul 15, 2025",
    readTime: "5 min read",
    link: "https://medium.com/@silvia.datadev/parallelizing-bigquery-stored-procedures-with-google-cloud-functions-af7ddcb8f899",
  },
  {
    title: "How to Load Billions of MongoDB Records Without a Date Field",
    excerpt: "A practical guide to loading billions of MongoDB documents without a date field by leveraging UUID-based range scanning and built-in indexing.",
    date: "July 31, 2025",
    readTime: "10 min read",
    link: "https://medium.com/@silvia.datadev/how-to-efficiently-load-billions-of-mongodb-records-without-a-date-field-30594957108a",
  },
  {
    title: "Data Quality Engineering: Beyond Basic Validation",
    excerpt: "Implementing comprehensive data quality frameworks that go beyond simple validation to ensure data reliability and trustworthiness.",
    date: "Nov 20, 2024",
    readTime: "10 min read",
    link: "https://medium.com/@yourusername/data-quality-engineering",
  },
  {
    title: "Real-time Data Processing with Kafka and Flink",
    excerpt: "A practical guide to building real-time data processing systems using Apache Kafka and Apache Flink for streaming analytics.",
    date: "Nov 5, 2024",
    readTime: "15 min read",
    link: "https://medium.com/@yourusername/realtime-data-processing",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="min-h-screen bg-main-lightGrey py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-main-darkGrey mb-4">Blog</h2>
          <p className="text-lg text-main-mediumGrey max-w-2xl mx-auto">
            Insights and tutorials on data engineering, software development, and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-main-white rounded-lg p-6 border border-main-mediumGrey/20 hover:border-accent-softBlue/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-main-mediumGrey">
                  <span className="flex items-center space-x-1">
                    <FaCalendarAlt size={14} />
                    <span>{article.date}</span>
                  </span>
                  <span className="text-accent-softBlue">{article.readTime}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-main-darkGrey mb-3 group-hover:text-accent-softBlue transition-colors">
                {article.title}
              </h3>
              
              <p className="text-main-mediumGrey mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-accent-softBlue hover:text-accent-mutedTeal transition-colors duration-200"
              >
                <span className="text-sm font-medium">Read More</span>
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
            className="inline-flex items-center space-x-3 bg-main-darkGrey text-main-white px-6 py-3 rounded-lg hover:bg-main-mediumGrey transition-colors duration-300"
          >
            <FaMedium size={20} />
            <span className="font-medium">View All Articles on Medium</span>
            <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}