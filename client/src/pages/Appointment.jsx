import { useState } from "react";
import { createAppointment } from "../services/api";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    animalType: "",
    dateTime: "",
  });

  const [links, setLinks] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createAppointment(formData);
      setLinks(res.data);
      alert("Appointment booked successfully!");
    } catch (error) {
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="appointment-page">
      {/* PAGE TITLE */}
      <h1 className="page-title">Appointment Page</h1>

      {/* TOGGLE BUTTONS */}
      <div className="appointment-tabs">
        <button
          className="active"
          onClick={() => navigate("/appointments-list")}
        >
          View Today's Appointments
        </button>
      </div>

      {/* FORM */}
      <div className="form-box">
        <h2>Application Form</h2>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <label>Name :</label>
            <input name="name" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>E-mail :</label>
            <input name="email" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Phone no. :</label>
            <input name="phone" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Service Type :</label>
            <input name="serviceType" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Animal Type :</label>
            <input name="animalType" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Date And Time :</label>
            <input type="datetime-local" name="dateTime" onChange={handleChange} required />
          </div>

          <button className="submit-btn" type="submit">
            Book Appointment
          </button>
        </form>
      </div>

      {/* WHATSAPP BUTTONS */}
      {links && (
        <div className="whatsapp-buttons">
          <button
            onClick={() => window.open(links.doctorWhatsAppLink, "_blank")}
          >
            Notify Doctor
          </button>

          <button
            onClick={() => window.open(links.customerWhatsAppLink, "_blank")}
          >
            Send Confirmation
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointment;
