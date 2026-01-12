import "./Services.css";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-container">
      <h1>VetCare Services</h1>

      <div className="services-grid">
        <div className="service-card" onClick={() => navigate("/appointment")}>
          CheckUps
        </div>
        <div className="service-card" onClick={() => navigate("/appointment")}>
          Vaccination
        </div>
        <div className="service-card" onClick={() => navigate("/appointment")}>
          Surgery
        </div>
        <div className="service-card" onClick={() => navigate("/appointment")}>
          Grooming
        </div>
        <div className="service-card" onClick={() => navigate("/appointment")}>
          Emergency Care
        </div>
        <div className="service-card" onClick={() => navigate("/appointment")}>
          Home Visit
        </div>
      </div>

      <h2>Breeding Services</h2>

      <div className="services-grid">
        <div className="service-card" onClick={() => navigate("/breed-upload")}>
          Verified Breeding
        </div>
        <div className="service-card" onClick={() => navigate("/breed-upload")}>
          Animal Matching
        </div>
        <div className="service-card" onClick={() => navigate("/breed-upload")}>
          Health CheckUp
        </div>
        <div className="service-card" onClick={() => navigate("/breed-upload")}>
          Upload Your Pet
        </div>
        <div className="service-card" onClick={() => navigate("/breed-upload")}>
          Certification
        </div>
        <div className="service-card" onClick={() => navigate("/breed-upload")}>
          Consultation
        </div>
      </div>
    </div>
  );
}
