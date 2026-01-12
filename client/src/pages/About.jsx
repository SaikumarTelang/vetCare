import "./About.css";

export default function About() {
  return (
    <div className="about-page">

    

      {/* About Doctor Section */}

      <div className="doctor-section">
        <div className="doctor-image">
          <img src="/images/doctor.jpg" alt="Doctor" />
        </div>

        <div className="doctor-info">
          <h3>Dr. Rohit</h3>
          <p>Image of Doctor and his qualifications</p>
          <p className="experience">Total Years Of Experience: <b>10+</b></p>
        </div>
      </div>

      {/* Why Us Section */}
      <h2 className="why-title">Why Us..?</h2>

      <div className="why-grid">
        <div className="why-card">
          <h4>✔ Quick Appointments</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="why-card">
          <h4>✔ Emergency Rescue</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="why-card">
          <h4>✔ Healthy Breeding Network</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      {/* Image Content Section */}
      <div className="image-content">
        <div className="image-card">
          <img src="/images/service1.jpg" alt="service" />
        </div>
        <div className="image-card">
          <img src="/images/service2.jpg" alt="service" />
        </div>
        <div className="image-card">
          <img src="/images/service3.jpg" alt="service" />
        </div>
      </div>

      <p className="about-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui,
        non pulvinar lorem felis nec erat.
      </p>

      
    </div>
  );
}
