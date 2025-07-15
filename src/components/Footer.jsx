import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaMedium } from "react-icons/fa";
import { SiGumroad } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-main-lightGrey border-t border-main-mediumGrey/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-main-mediumGrey text-sm">
            © {currentYear} Silvia Arellano. All rights reserved.
          </div>

          {/* Professional Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://linkedin.com/in/silvia-arellano-de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/SilviaAre95"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://medium.com/@silvia.datadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
              aria-label="Medium"
            >
              <FaMedium size={20} />
            </a>
            <a
              href="https://silviadatadev.gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
              aria-label="Medium"
            >
              <SiGumroad size={20} />
            </a>
            <a
              href="mailto:silvia.datadev@gmail.com"
              className="text-main-mediumGrey hover:text-accent-softBlue transition-colors duration-200"
              aria-label="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </div>

          {/* Tech Stack or Role */}
          <div className="text-main-mediumGrey text-sm">
            Senior Data Engineer
          </div>
        </div>
      </div>
    </footer>
  );
}