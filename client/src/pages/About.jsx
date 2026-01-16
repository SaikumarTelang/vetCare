import { useEffect, useState } from "react";
import "./About.css";

import tiger from "../Assets/rohi-tiger.jpeg";
import cow from "../Assets/cow.png";
import dog from "../Assets/dog.png";
import cow2 from "../Assets/cow2.jpeg";
import graduat from "../Assets/graduation.jpeg";
import vacination1 from "../Assets/dog-vac.jpeg";
import vacination from "../Assets/dog-vaci.jpeg";
import elephant from "../Assets/elephant.jpeg";
import goat from "../Assets/goat.jpeg";

const images = [
  tiger,
  cow,
  cow2,
  dog,
  vacination1,
  vacination,
  elephant,
  goat,
];

export default function About() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section with Slider */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Compassionate Care for <span className="highlight">Every Animal</span>
            </h1>
            <p className="hero-subtitle">
              Professional veterinary services with a heart for animal welfare
            </p>
          </div>
          
          <div className="slider-container">
            <div className="slider-frame">
              <img
                key={index}
                src={images[index]}
                alt="VetCare Service"
                className="slider-image"
              />
              <div className="slider-overlay"></div>
            </div>
            <div className="slider-dots">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About VetCare</h2>
            <div className="title-underline"></div>
          </div>
          <p className="about-text">
            VetCare is committed to providing compassionate, reliable, and affordable
            veterinary services. From preventive care to emergency rescue, we ensure
            the health and well-being of animals across rural and urban communities.
            Our mission is to create a world where every animal receives the care they deserve.
          </p>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="doctor-section">
        <div className="container">
          <div className="doctor-card">
            <div className="doctor-image-wrapper">
              <img src={graduat} alt="Dr. Rohit" className="doctor-image" />
              <div className="doctor-badge">
                <span>Veterinary Expert</span>
              </div>
            </div>

            <div className="doctor-info">
              <div className="doctor-header">
                <h3 className="doctor-name">Dr. Rohit</h3>
                <div className="doctor-stars">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="qualification">
                <span className="degree-icon">🎓</span>
                B.V.Sc & A.H – Veterinary Surgeon
              </p>
              <div className="experience-badge">
                <span className="exp-number">2+</span>
                <span className="exp-text">Years Experience</span>
              </div>
              <p className="doctor-desc">
                Dr. Rohit specializes in animal health management, vaccination,
                breeding consultation, and emergency field services with a strong
                passion for animal welfare and community service.
              </p>
              <div className="doctor-specialties">
                <span className="specialty">Emergency Care</span>
                <span className="specialty">Vaccination</span>
                <span className="specialty">Breeding Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose VetCare?</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">
              Trusted by thousands of pet owners and farmers across the region
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="card-icon">⚡</div>
              <h4>Quick Appointments</h4>
              <p>
                Easy and fast appointment booking with minimal waiting time for both
                clinic and field visits. Available 24/7 for your convenience.
              </p>
              <div className="card-footer">
                <span className="feature-tag">Instant Booking</span>
              </div>
            </div>

            <div className="why-card featured">
              <div className="card-icon">🚨</div>
              <h4>Emergency Rescue</h4>
              <p>
                24/7 emergency rescue and first-aid services for injured and critical
                animals. Our rapid response team is always ready to help.
              </p>
              <div className="card-footer">
                <span className="feature-tag">24/7 Available</span>
              </div>
            </div>

            <div className="why-card">
              <div className="card-icon">🐄</div>
              <h4>Healthy Breeding Network</h4>
              <p>
                Scientific breeding guidance and access to a healthy, verified
                breeding network with genetic counseling and health certificates.
              </p>
              <div className="card-footer">
                <span className="feature-tag">Certified Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Animals Treated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Emergency Rescues</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}