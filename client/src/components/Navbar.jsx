import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="brand">
          <img src={logo} alt="VetCare Logo" className="logo-img" />
          <h2>VetCare</h2>
        </div>

        {/* Hamburger */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Center Nav */}
        <div className={`nav-items ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/breeding" onClick={() => setMenuOpen(false)}>Breeding Center</Link>
          <Link to="/appointment" onClick={() => setMenuOpen(false)}>Appointment</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        </div>

      </div>
    </nav>
  );
}
