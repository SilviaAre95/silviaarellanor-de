import { useEffect } from 'react';

const SEO = ({ 
  title = "Silvia Arellano - Senior Data Architect & ETL Pipeline Engineer",
  description = "Senior Data Architect specializing in scalable ETL pipelines, data warehousing, and big data analytics. Expert in BigQuery, Python, Cloud Architecture.",
  keywords = "data engineer, data architect, ETL pipelines, BigQuery, Python, SQL, data warehousing",
  image = "https://silviaare95.github.io/portfolio/og-image.jpg",
  url = "https://silviaare95.github.io/portfolio/"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`) || 
                   document.querySelector(`meta[name="${property}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };
    
    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:url', url);
    
  }, [title, description, keywords, image, url]);
  
  return null;
};

export default SEO;