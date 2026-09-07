import {
  FaHome,
  FaBuilding,
  FaChartLine,
  FaRunning,
  FaIndustry,
  FaHeartbeat,
  FaShoppingCart,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

const INDUSTRIES = [
  { name: "Real Estate", icon: FaHome },
  { name: "Enterprise", icon: FaBuilding },
  { name: "Marketing", icon: FaChartLine },
  { name: "Sports Analytics", icon: FaRunning },
  { name: "Tax", icon: FaIndustry },
  { name: "Healthcare", icon: FaHeartbeat },
  { name: "E-commerce", icon: FaShoppingCart },
  { name: "HR Tech", icon: FaUsers },
  { name: "SaaS", icon: FaGlobe },
];

// One pass of the list. The track holds two, and scrolls exactly half its own
// width, so the second lands where the first began and the loop is seamless.
// The copy is hidden from assistive tech — it is the same nine industries.
const Run = ({ hidden }) => (
  <ul className="bands__run" aria-hidden={hidden || undefined}>
    {INDUSTRIES.map(({ name, icon: Icon }) => (
      <li key={name} className="bands__chip">
        <Icon />
        {name}
      </li>
    ))}
  </ul>
);

export default function IndustryBanner() {
  return (
    <section className="bands">
      <p className="bands__label">Industries I&rsquo;ve Worked In</p>

      <div className="bands__viewport">
        <div className="bands__track">
          <Run />
          <Run hidden />
        </div>
      </div>
    </section>
  );
}
