import "./Services.css";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-container">

      <h1 className="page-title">VetCare Services</h1>

      <div className="services-grid">
        <div className="service-card" onClick={() => navigate("/appointment")}>
          <span className="service-icon">😺🩺</span>
          <h3>CheckUps</h3>
          <p>Regular health examinations to monitor your pet’s overall well-being, detect early signs of illness, and ensure long-term preventive care.</p>
        </div>

        <div className="service-card active" onClick={() => navigate("/appointment")}>
          <span className="service-icon">💊💉</span>
          <h3>Vaccination</h3>
          <p>Essential vaccinations to protect your pet from common and life-threatening diseases, following recommended veterinary schedules.</p>
        </div>

        <div className="service-card" onClick={() => navigate("/appointment")}>
          <span className="service-icon">😷🏥</span>
          <h3>Surgery</h3>
          <p>Safe and sterile surgical procedures performed by experienced veterinarians using modern equipment and post-operative care.</p>
        </div>

    

        <div className="service-card" onClick={() => navigate("/appointment")}>
          <span className="service-icon">🚑🚨</span>
          <h3>Emergency Care</h3>
          <p>Immediate medical attention for accidents, injuries, or sudden health conditions, available when your pet needs urgent care.</p>
        </div>

        <div className="service-card" onClick={() => navigate("/appointment")}>
          <span className="service-icon">🏠🏡</span>
          <h3>Home Visit</h3>
          <p>Convenient veterinary care at your home for pets that are anxious, elderly, or unable to travel to the clinic.</p>
        </div>
      </div>

      <h2 className="section-title">Breeding Services</h2>

      <div className="services-grid breeding-grid">
        <div className="service-card breeding" onClick={() => navigate("/breed-upload")}>
          <span className="service-icon">✅🐣</span>
          <h3>Verified Breeding</h3>
          <p>Ethical breeding practices with verified pets, ensuring proper documentation, health records, and responsible breeding standards.</p>
        </div>

        <div className="service-card breeding" onClick={() => navigate("/breed-upload")}>
          <span className="service-icon">🐶🐕</span>
          <h3>Animal Matching</h3>
          <p>Careful matching of compatible pets based on breed, age, and health to ensure safe and successful breeding outcomes.</p>
        </div>

        <div className="service-card breeding" onClick={() => navigate("/breed-upload")}>
          <span className="service-icon">🧬💕</span>
          <h3>Health CheckUp</h3>
          <p>Pre-breeding health screenings to identify genetic or medical conditions and ensure both pets are fit for breeding.</p>
        </div>

        <div className="service-card breeding" onClick={() => navigate("/breed-upload")}>
          <span className="service-icon">📤📷</span>
          <h3>Upload Your Pet</h3>
          <p>Upload pet details and medical information to make them available for responsible and verified breeding opportunities.</p>
        </div>

      

        <div className="service-card breeding" onClick={() => navigate("/breed-upload")}>
          <span className="service-icon">💬📃</span>
          <h3>Consultation</h3>
          <p>Expert veterinary guidance on breeding plans, pregnancy care, and post-breeding support for pet owners.</p>
        </div>
      </div>

    </div>
  );
}
