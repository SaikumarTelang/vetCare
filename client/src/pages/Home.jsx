import { Link } from "react-router-dom";
import "./Home.css";
// import heroImg from "../assets/hero.jpg";
import doctor from "../Assets/doctor.jpg";

export default function Home({ onNavigateAppointment }) {
  const goAppointment = () => {
    const el = document.getElementById("appointment");
    if (onNavigateAppointment) onNavigateAppointment();
    else if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-panel">
            <h1 className="hero-title">Professional Veterinary Care Assistance</h1>
           
            <div className="hero-buttons">
              <button className="primary-btn" onClick={goAppointment}>Book Appointment</button>
              <Link to="/breeding">
                <button className="secondary-btn">Find Breeding Mate</button>
              </Link>
            </div>
          </div>
        </div>
</div>

      {/* QUICK SERVICES */}
      <h2 className="section-title">Quick Services</h2>
      <div className="home-grid">
        <Link to="/#services" className="home-card pet-care" aria-label="Go to Services">
          <div className="home-card-content">
            <h3 className="home-card-title">Pet Care</h3>
            <p className="home-card-desc">General checkups and preventive care</p>
          </div>
        </Link>

        <Link to="/#services" className="home-card vaccination" aria-label="Go to Services">
          <div className="home-card-content">
            <h3 className="home-card-title">Vaccination</h3>
            <p className="home-card-desc">Protect your pets from diseases</p>
          </div>
        </Link>

        <Link to="/breeding" className="home-card breeding" aria-label="Go to Breeding Center">
          <div className="home-card-content">
            <h3 className="home-card-title">Breeding</h3>
            <p className="home-card-desc">Find verified and healthy matches</p>
          </div>
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
