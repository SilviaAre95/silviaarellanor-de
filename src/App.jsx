import React from "react";
import { useLocation } from "react-router-dom";
import "./assets/css/index.css";
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import Skills from "./pages/Skills/Skills";
import Blog from "./pages/Blog/Blog";
import Products from "./pages/Products/Products";
import Footer from "./components/Footer";

import { Route, Routes } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  // Home page component that contains all sections
  const HomePage = () => (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
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
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
      {!isProductsPage && <Footer />}
    </div>
  );
}
