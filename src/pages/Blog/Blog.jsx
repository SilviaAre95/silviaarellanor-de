import React from "react";
import { HiOutlineBookmark, HiDotsHorizontal } from "react-icons/hi";
import silviaPhoto from "@/assets/images/silvia.png";

// Your Medium articles with metadata
const mediumArticles = [
  {
    url: "https://medium.com/@silvia.datadev/parallelizing-bigquery-stored-procedures-with-google-cloud-functions-af7ddcb8f899",
    id: "bigquery-parallelization",
    emoji: "🚀",
    title: "Parallelizing BigQuery Stored Procedures with Google Cloud Functions",
    subtitle: "A case study in squeezing speed out of serverless stored procedures in BigQuery",
    author: "Silvia A",
    publishDate: "Jul 15",
    claps: "5",
    readTime: "3 min read"
  },
  {
    url: "https://medium.com/@silvia.datadev/how-to-efficiently-load-billions-of-mongodb-records-without-a-date-field-30594957108a",
    id: "mongodb-billions",
    emoji: "💾",
    title: "How to Load Billions of MongoDB Records Without a Date Field",
    subtitle: "A practical guide to loading billions of MongoDB documents without a date field",
    author: "Silvia A",
    publishDate: "Jul 31",
    claps: "12",
    readTime: "4 min read"
  }
];

// Medium-style card component matching the design
const MediumCard = ({ article }) => {
  return (
    <a 
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-main-white rounded-lg p-6 border border-main-mediumGrey/20 hover:border-main-mediumGrey/40 transition-all duration-300 hover:shadow-lg group cursor-pointer"
    >
      {/* Author Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-mutedTeal/20">
          <img 
            src={silviaPhoto} 
            alt={article.author}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="ml-3 text-main-darkGrey font-medium">{article.author}</span>
      </div>

      {/* Title Section with Emoji */}
      <div className="mb-3">
        <h3 className="text-xl font-bold text-main-darkGrey group-hover:text-accent-softBlue transition-colors duration-200 leading-tight">
          <span className="text-2xl mr-2">{article.emoji}</span>
          {article.title}
        </h3>
      </div>

      {/* Subtitle */}
      <p className="text-main-mediumGrey mb-4 line-clamp-2">
        {article.subtitle}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-main-mediumGrey">
        <div className="flex items-center gap-4">
          <span>{article.publishDate}</span>
          <span className="flex items-center gap-1">
            <span>👏</span>
            <span>{article.claps}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <HiOutlineBookmark className="text-lg hover:text-main-darkGrey transition-colors cursor-pointer" />
          <HiDotsHorizontal className="text-lg hover:text-main-darkGrey transition-colors cursor-pointer" />
        </div>
      </div>
    </a>
  );
};

export default function Blog() {
  return (
    <section id="blog" className="min-h-screen bg-main-lightGrey py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-main-darkGrey mb-4">My Blog</h2>
          <p className="text-lg text-main-mediumGrey max-w-2xl mx-auto">
            Deep dives into data engineering, scalable architectures, and modern technology solutions
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mediumArticles.map((article) => (
            <MediumCard key={article.id} article={article} />
          ))}
        </div>

        {/* Medium Profile CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-main-mediumGrey mb-4">
              Want to read more about data engineering and technology?
            </p>
            <a
              href="https://medium.com/@silvia.datadev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-main-darkGrey text-main-white px-8 py-4 rounded-lg hover:bg-main-mediumGrey transition-all duration-300 group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              <span className="font-semibold">Follow me on Medium</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}