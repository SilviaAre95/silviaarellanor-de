import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [activeLink, setActiveLink] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: "hero", text: "Home" },
    { id: "skills", text: "Skills" },
    { id: "projects", text: "Projects" },
    { id: "blog", text: "Blog" },
    { id: "contact", text: "Contact" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Adjust based on header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      scrollToSection(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="brand-bar">
      <div className="wrap brand-bar__inner">
        <a
          className="brand-lockup"
          href="#hero"
          aria-label="Silvia Arellano — back to top"
          onClick={(e) => goToSection(e, 'hero')}
        >
          <img src="/brand/logo-swallow.svg" alt="" />
          <b>Silvia Arellano</b>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-[1.6rem]">
          {navLinks.map(({ id, text }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => goToSection(e, id)}
              className={`navlink ${activeLink === id && location.pathname === '/' ? 'is-active' : ''}`}
            >
              {text}
            </a>
          ))}
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              navigate('/about');
              setIsMenuOpen(false);
            }}
            className={`navlink ${location.pathname === '/about' ? 'is-active' : ''}`}
          >
            About
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-abyss p-2"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden wrap flex flex-col gap-4 pb-6">
          {navLinks.map(({ id, text }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => goToSection(e, id)}
              className={`navlink self-start ${activeLink === id && location.pathname === '/' ? 'is-active' : ''}`}
            >
              {text}
            </a>
          ))}
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              navigate('/about');
              setIsMenuOpen(false);
            }}
            className={`navlink self-start ${location.pathname === '/about' ? 'is-active' : ''}`}
          >
            About
          </a>
        </nav>
      )}
    </header>
  );
}
