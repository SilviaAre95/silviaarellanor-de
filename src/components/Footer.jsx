import { FaLinkedin, FaGithub, FaEnvelope, FaMedium } from "react-icons/fa";
import { SiGumroad } from "react-icons/si";

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/silvia-arellano-de",
    Icon: FaLinkedin,
  },
  { label: "GitHub", href: "https://github.com/SilviaAre95", Icon: FaGithub },
  {
    label: "Medium",
    href: "https://medium.com/@silvia.datadev",
    Icon: FaMedium,
  },
  {
    label: "Gumroad",
    href: "https://silviadatadev.gumroad.com",
    Icon: SiGumroad,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-foot">
      <div className="wrap site-foot__inner">
        <p className="site-foot__line">
          © {currentYear} Silvia Arellano · Consulting via OBEXDATA OÜ ·{" "}
          <a href="/legal">Legal &amp; privacy</a>
        </p>

        <div className="site-foot__social">
          {SOCIAL.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
          <a href="mailto:silvia.datadev@gmail.com" aria-label="Email">
            <FaEnvelope size={20} />
          </a>
        </div>

        <p className="site-foot__line">Data Platform Architect</p>
      </div>
    </footer>
  );
}
