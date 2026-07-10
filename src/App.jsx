import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./assets/css/index.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import Skills from "./pages/Skills/Skills";
import Blog from "./pages/Blog/Blog";
import Products from "./pages/Products/Products";
import IndustryBanner from "./components/IndustryBanner";
import Footer from "./components/Footer";

import { Route, Routes } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && location.pathname === '/') {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Home page component that contains all sections
  const HomePage = () => (
    <>
      <Hero />
      <Skills />
      <Projects />
      <IndustryBanner />
      <Blog />
      <Contact />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-main-white">
      {!isProductsPage && <Header />}
      <main className="flex-grow pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
      {!isProductsPage && <Footer />}
    </div>
  );
}
