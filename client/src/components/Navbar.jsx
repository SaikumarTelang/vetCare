import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import whatsapp from "../Assets/whatsapp.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("home");

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleSectionNav = (id, e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const handleHomeNav = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    if (location.pathname === "/") {
      const h = location.hash?.replace("#", "");
      setActiveKey(h || "home");
    } else if (location.pathname.startsWith("/breeding")) {
      setActiveKey("breeding");
    } else if (location.pathname.startsWith("/appointment") || location.pathname.startsWith("/appointments-list")) {
      setActiveKey("appointment");
    } else if (location.pathname.startsWith("/services")) {
      setActiveKey("services");
    } else if (location.pathname.startsWith("/about")) {
      setActiveKey("about");
    } else {
      setActiveKey("");
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const ids = ["home", "services", "appointment", "about"];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveKey(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.5, 0.8] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="brand">
          <img src={logo} alt="VetCare Logo" className="logo-img" />
          <h2>VetCare</h2>
        </div>

        {/* Hamburger */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
        >
          ☰
        </div>

        {/* Center Nav */}
        <div className={`nav-items ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={handleHomeNav} className={`nav-btn ${activeKey === "home" ? "active" : ""}`}>Home</Link>
          <Link
            to={{ pathname: "/", hash: "#services" }}
            onClick={(e) => handleSectionNav("services", e)}
            className={`nav-btn ${activeKey === "services" ? "active" : ""}`}
          >
            Services
          </Link>
          <Link to="/breeding" onClick={() => setMenuOpen(false)} className={`nav-btn ${activeKey === "breeding" ? "active" : ""}`}>Breeding Center</Link>
          <Link
            to={{ pathname: "/", hash: "#appointment" }}
            onClick={(e) => handleSectionNav("appointment", e)}
            className={`nav-btn ${activeKey === "appointment" ? "active" : ""}`}
          >
            Appointment
          </Link>
          <Link
            to={{ pathname: "/", hash: "#about" }}
            onClick={(e) => handleSectionNav("about", e)}
            className={`nav-btn ${activeKey === "about" ? "active" : ""}`}
          >
            About Us
          </Link>
          <div className="mobile-cta">
            <a
              href="https://wa.me/917406756936"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-whatsapp"
              aria-label="Chat on WhatsApp"
            >
              <img src={whatsapp} alt="WhatsApp" width="22" height="22" />
            </a>
          </div>
         
        </div>

        <div className="nav-cta">
          <a
            href="https://wa.me/917406756936"
            target="_blank"
            rel="noopener noreferrer"
            className={`whatsapp-btn ${showHint ? "hint-active" : ""}`}
            aria-label="Chat on WhatsApp"
          >
            <img src={whatsapp} alt="WhatsApp" className="whatsapp-icon" width="22" height="22" />
          </a>
        </div>

      </div>
    </nav>
  );
}
