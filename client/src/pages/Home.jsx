import { Link } from "react-router-dom";
import "./Home.css";
// import heroImg from "../assets/hero.jpg";
import doctor from "../Assets/doctor.jpg";

export default function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div className="hero-banner">
  <div className="hero-overlay">
    <h1 className="hero-title">Professional Veterinary Care</h1>
    <p className="hero-subtitle">
      Trusted care, emergency services and healthy breeding support
      for your beloved animals.
    </p>

    <div className="hero-buttons">
      <Link to="/appointment">
        <button className="primary-btn">Book Appointment</button>
      </Link>

      <Link to="/appointment">
        <button className="secondary-btn">Request Rescue</button>
      </Link>

      <Link to="/breeding">
        <button className="secondary-btn">Find Breeding Mate</button>
      </Link>
    </div>
  </div>
</div>

      {/* QUICK SERVICES */}
      <h2 className="section-title">Quick Services</h2>
      <div className="home-grid">
        <Link to="/services" className="home-card pet-care">
        </Link>

        <Link to="/services" className="home-card vaccination">
        </Link>

        <Link to="/breeding" className="home-card breeding">
        </Link>
      </div>

      {/* ABOUT DOCTOR */}
      <h2 className="section-title">About Doctor</h2>
      <div className="doctor-box">
        <img src={doctor} alt="Doctor" className="doctor-image" />

        <div className="doctor-info">
          <h3>Dr. Rohit</h3>
          <p><b>Qualification:</b> BVSc & AH</p>
          <p><b>Experience:</b> 2+ Years</p>
          <p>
            Specialized in pet health, emergency care and professional
            breeding consultation.
          </p>
        </div>
      </div>

      {/* BENEFITS */}
<h2 className="section-title">Why Choose VetCare?</h2>

<div className="benefits-grid">
  <div className="benefit-card">
    <div className="benefit-icon">⚡</div>
    <h3>Quick Appointments</h3>
    <p>Instant booking and fast consultation with minimum waiting time.</p>
  </div>

  <div className="benefit-card">
    <div className="benefit-icon">🚑</div>
    <h3>Emergency Rescue</h3>
    <p>24/7 emergency support for pets when every second matters.</p>
  </div>

  <div className="benefit-card">
    <div className="benefit-icon">🐾</div>
    <h3>Healthy Breeding</h3>
    <p>Verified, ethical and safe breeding network you can trust.</p>
  </div>
</div>


    </div>
  );
}
