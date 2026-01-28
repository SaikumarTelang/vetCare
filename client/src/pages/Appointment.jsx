import { useState } from "react";
import { createAppointment } from "../services/api";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";

/* ================= BREEDS ================= */
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
  const navigate = useNavigate();

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

  /* ================= HANDLERS ================= */
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    for (let key in formData) {
      if (!formData[key]) {
        alert("Please fill all fields");
        return;
      }
    }

    try {
      const response = await createAppointment({
        ...formData,
        dateTime: new Date(formData.dateTime).toISOString(), // ✅ SAFE FORMAT
      });

      setLinks(response.data);
      alert("Appointment booked successfully 🐾");

      // ✅ Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        animalType: "",
        breed: "",
        dateTime: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    }
  };

  /* ================= BREEDS ================= */
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
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>E-mail :</label>
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Phone no. :</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Service Type :</label>
            <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
              <option value="">Select Service</option>
              <option value="Check Up">Check Up</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Home Visit">Home Visit</option>
              <option value="Emergency Care">Emergency Care</option>
              <option value="Surgery">Surgery</option>
              <option value="Grooming">Grooming</option>
            </select>
          </div>

          <div className="form-row">
            <label>Animal Type :</label>
            <select
              name="animalType"
              value={formData.animalType}
              onChange={handleAnimalChange}
            >
              <option value="">Select Animal</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Cow">Cow</option>
            </select>
          </div>

          <div className="form-row">
            <label>Breed :</label>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              disabled={!formData.animalType}
            >
              <option value="">Select Breed</option>
              {getBreeds().map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Date And Time :</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
            />
          </div>

          <button className="submit-btn" type="submit">
            Book Appointment
          </button>
        </form>
      </div>

      {links && (
        <div className="whatsapp-buttons">
          <button onClick={() => window.open(links.doctorWhatsAppLink, "_blank")}>
            Notify Doctor
          </button>
          <button onClick={() => window.open(links.customerWhatsAppLink, "_blank")}>
            Send Confirmation
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointment;
