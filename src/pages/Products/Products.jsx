import React from "react";
import { FaShoppingCart, FaDollarSign, FaRocket, FaCode, FaDatabase, FaChartLine } from "react-icons/fa";
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
    color: "bg-accent-softBlue"
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
    color: "bg-accent-mutedTeal"
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
    color: "bg-accent-softBlue"
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
    color: "bg-accent-mutedTeal"
  }
];

export default function Products() {
  return (
    <div className="min-h-screen bg-main-white">
      <div className="sticky top-0 z-50 bg-main-white/95 backdrop-blur-md border-b border-main-mediumGrey/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-main-darkGrey">Digital Products</h1>
            <Link
              to="/"
              className="text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-main-darkGrey mb-4">
            Level Up Your Data Engineering Skills
          </h2>
          <p className="text-lg text-main-mediumGrey max-w-3xl mx-auto">
            Premium resources, templates, and frameworks designed to accelerate your data engineering projects and career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="bg-main-lightGrey rounded-lg overflow-hidden border border-main-mediumGrey/20 hover:border-main-mediumGrey/40 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`${product.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon size={40} className="opacity-90" />
                    <span className="text-3xl font-bold">{product.price}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-main-mediumGrey mb-6">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-accent-softBlue mr-2 mt-1">✓</span>
                        <span className="text-main-darkGrey">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={product.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 bg-main-darkGrey text-main-white px-6 py-3 rounded-lg hover:bg-main-mediumGrey transition-colors duration-300"
                  >
                    <FaShoppingCart size={18} />
                    <span className="font-medium">Buy on Gumroad</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-main-lightGrey rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-main-darkGrey mb-4">
            100% Satisfaction Guarantee
          </h3>
          <p className="text-main-mediumGrey max-w-2xl mx-auto">
            All products come with a 30-day money-back guarantee. If you're not completely satisfied, 
            get a full refund - no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}