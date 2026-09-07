import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaLaptopCode,
  FaUser,
  FaCode,
  FaEnvelope,
  FaBars,
  FaBlog,
} from "react-icons/fa";

export default function Header() {
  const [activeLink, setActiveLink] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { id: "hero", icon: FaHome, text: "Home" },
    { id: "skills", icon: FaCode, text: "Skills" },
    { id: "projects", icon: FaLaptopCode, text: "Projects" },
    { id: "blog", icon: FaBlog, text: "Blog" },
    { id: "contact", icon: FaEnvelope, text: "Contact" },
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-foam/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        {/* Brand spec §7: no shadows, no gradient borders. The bar is an abyss
            pill and depth comes from the colour layering alone. */}
        <div className="md:rounded-pill bg-abyss">
          <nav className="md:rounded-pill px-4 md:px-6 py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden px-2">
              <a
                href="#hero"
                aria-label="Back to top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
                className="t-tag text-foam font-bold"
              >
                {navLinks.find(link => link.id === activeLink)?.text || "Portfolio"}
              </a>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foam p-2"
              >
                <FaBars />
              </button>
            </div>

            {/* Navigation Links */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
                {navLinks.map(({ id, icon: Icon, text }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate(`/#${id}`);
                      } else {
                        scrollToSection(id);
                      }
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 md:py-1.5 rounded-pill t-tag
                      transition-colors duration-300 flex items-center gap-2
                      cursor-pointer
                      ${
                        activeLink === id
                          ? "bg-chrome text-abyss"
                          : "text-foam/75 hover:text-chrome"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base ${
                        activeLink === id ? "scale-110" : ""
                      }`}
                    />
                    <span className="inline">{text}</span>
                  </a>
                ))}
                {/* About page link */}
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/about');
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 md:py-1.5 rounded-pill t-tag
                    transition-colors duration-300 flex items-center gap-2
                    cursor-pointer
                    ${
                      location.pathname === '/about'
                        ? "bg-chrome text-abyss"
                        : "text-foam/75 hover:text-chrome"
                    }
                  `}
                >
                  <FaUser className={`text-base ${location.pathname === '/about' ? "scale-110" : ""}`} />
                  <span className="inline">About</span>
                </a>

                {/* Products Link - Temporarily hidden until Gumroad page is ready */}
                {/* <a
                  href="/products"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/products');
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 md:py-1.5 rounded-pill t-tag
                    transition-colors duration-300 flex items-center gap-2
                    cursor-pointer
                    ${
                      location.pathname === '/products'
                        ? "bg-chrome text-abyss"
                        : "text-foam/75 hover:text-chrome"
                    }
                  `}
                >
                  <FaShoppingBag
                    className={`text-base ${
                      location.pathname === '/products' ? "scale-110" : ""
                    }`}
                  />
                  <span className="inline">Products</span>
                </a> */}
              </div>
            </div>
          </nav>
        </div>
      </div>

    </header>
  );
}
