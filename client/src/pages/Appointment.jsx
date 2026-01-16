import { useState } from "react";
import { createAppointment } from "../services/api";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";

/* Breeds */
const dogBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Pug",
  "Beagle",
  "Rottweiler",
  "Pomeranian",
  "Shih Tzu",
  "Indian Spitz",
  "Dachshund",
];

const catBreeds = [
  "Persian",
  "Siamese",
  "Maine Coon",
  "Bengal",
  "British Shorthair",
  "Ragdoll",
];

const cowBreeds = [
  "Gir",
  "Sahiwal",
  "Red Sindhi",
  "Tharparkar",
  "Kankrej",
  "Hariana",
  "Ongole",
  "Deoni",
  "Rathi",
  "Hallikar",
];

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    animalType: "",
    breed: "",
    dateTime: "",
  });

  const [links, setLinks] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnimalChange = (e) => {
    setFormData({
      ...formData,
      animalType: e.target.value,
      breed: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createAppointment(formData);
      setLinks(res.data);
      alert("Appointment booked successfully 🐾");
    } catch (error) {
      alert("Failed to book appointment");
    }
  };

  const getBreeds = () => {
    if (formData.animalType === "Dog") return dogBreeds;
    if (formData.animalType === "Cat") return catBreeds;
    if (formData.animalType === "Cow") return cowBreeds;
    return [];
  };

  return (
    <div className="appointment-page">
      <h1 className="page-title">Appointment Page</h1>

      <div className="appointment-tabs">
        <button
          className="active"
          onClick={() => navigate("/appointments-list")}
        >
          View Today's Appointments
        </button>
      </div>

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

          {/* SERVICE TYPE DROPDOWN */}
          <div className="form-row">
            <label>Service Type :</label>
            <select name="serviceType" onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="Check Up">Check Up</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Home Visit">Home Visit</option>
              <option value="Emergency Care">Emergency Care</option>
              <option value="Surgery">Surgery</option>
              <option value="Grooming">Grooming</option>
            </select>
          </div>

          {/* ANIMAL TYPE DROPDOWN */}
          <div className="form-row">
            <label>Animal Type :</label>
            <select
              name="animalType"
              value={formData.animalType}
              onChange={handleAnimalChange}
              required
            >
              <option value="">Select Animal</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Cow">Cow</option>
            </select>
          </div>

          {/* BREED DROPDOWN */}
          <div className="form-row">
            <label>Breed :</label>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              disabled={!formData.animalType}
              required
            >
              <option value="">Select Breed</option>
              {getBreeds().map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Date And Time :</label>
            <input
              type="datetime-local"
              name="dateTime"
              onChange={handleChange}
              required
            />
          </div>

          <button className="submit-btn" type="submit">
            Book Appointment
          </button>
        </form>
      </div>

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
