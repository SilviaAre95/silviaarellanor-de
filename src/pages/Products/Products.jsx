import { FaShoppingCart, FaRocket, FaCode, FaDatabase, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Data Pipeline Toolkit",
    description: "A comprehensive collection of Python scripts and templates for building robust data pipelines with Apache Airflow, including monitoring and error handling patterns.",
    price: "$49",
    features: [
      "10+ Pipeline Templates",
      "Error Handling Patterns",
      "Monitoring Dashboard Setup",
      "Best Practices Guide"
    ],
    icon: FaDatabase,
    gumroadLink: "https://gumroad.com/l/data-pipeline-toolkit",
    header: "card-chrome"
  },
  {
    id: 2,
    title: "ETL Framework Pro",
    description: "Production-ready ETL framework with PySpark integration, data quality checks, and performance optimization techniques for large-scale data processing.",
    price: "$79",
    features: [
      "Modular ETL Architecture",
      "Data Quality Framework",
      "Performance Tuning Guide",
      "Real-world Examples"
    ],
    icon: FaChartLine,
    gumroadLink: "https://gumroad.com/l/etl-framework-pro",
    header: "card-sea"
  },
  {
    id: 3,
    title: "SQL Query Optimizer",
    description: "Advanced SQL optimization techniques and query patterns for data engineers, including index strategies and query performance analysis tools.",
    price: "$39",
    features: [
      "50+ Optimized Queries",
      "Index Strategy Guide",
      "Performance Analysis Tools",
      "Database-specific Tips"
    ],
    icon: FaCode,
    gumroadLink: "https://gumroad.com/l/sql-query-optimizer",
    header: "card-deep"
  },
  {
    id: 4,
    title: "Data Engineering Starter Kit",
    description: "Everything you need to start your data engineering journey - from environment setup to your first production pipeline, with hands-on projects.",
    price: "$29",
    features: [
      "Complete Setup Guide",
      "5 Hands-on Projects",
      "Tool Comparisons",
      "Career Roadmap"
    ],
    icon: FaRocket,
    gumroadLink: "https://gumroad.com/l/de-starter-kit",
    header: "card-abyss"
  }
];

export default function Products() {
  return (
    <div className="min-h-screen bg-foam">
      <div className="sticky top-0 z-50 bg-abyss text-foam border-b-2 border-chrome">
        <div className="brand-container py-4">
          <div className="flex items-center justify-between">
            <h1 className="t-h3">Digital Products</h1>
            <Link
              to="/"
              className="brand-link-dark"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="brand-container brand-section">
        <div className="text-center mb-16">
          <h2 className="t-h2 mb-4">
            Level Up Your Data Engineering Skills
          </h2>
          <p className="t-body text-deep measure mx-auto">
            Premium resources, templates, and frameworks designed to accelerate your data engineering projects and career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="card-foam rounded-card overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                {/* §4's caption pairing: the price numeral against a hairline label. */}
                <div className={`${product.header} p-6`}>
                  <div className="flex items-baseline justify-between mb-4">
                    <Icon size={40} />
                    <span className="t-numeral">{product.price}</span>
                  </div>
                  <h3 className="t-h3">{product.title}</h3>
                </div>

                <div className="p-6">
                  <p className="t-body text-deep mb-6 measure">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-deep mr-2 mt-1">✓</span>
                        <span className="t-body">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={product.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-button w-full px-6 py-3"
                  >
                    <FaShoppingCart size={18} />
                    <span>Buy on Gumroad</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center brand-card card-chrome p-8">
          <h3 className="t-h2 mb-4">
            100% Satisfaction Guarantee
          </h3>
          <p className="t-body measure mx-auto">
            All products come with a 30-day money-back guarantee. If you're not completely satisfied, 
            get a full refund - no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}