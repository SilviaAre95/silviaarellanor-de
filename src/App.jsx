import React from "react";
import "./assets/css/index.css";
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import Skills from "./pages/Skills/Skills";
import Blog from "./pages/Blog/Blog";
import IndustryBanner from "./components/IndustryBanner";
import Footer from "./components/Footer";

import { Route, Routes } from "react-router-dom";

export default function App() {

  // Home page component that contains all sections
  const HomePage = () => (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <IndustryBanner />
      <Blog />
      <Contact />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-main-white">
      <Header />
      <main className="flex-grow pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
