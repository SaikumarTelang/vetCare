import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Breeding.css";
import API, { getPets } from "../services/api";

export default function Breeding() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  /* ================= FETCH PETS ================= */
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await getPets(); 
      setPets(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load pets");
    }
  };

  /* ================= DELETE PET ================= */
  const deletePet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    try {
      await API.delete(`/api/pets/${id}`); 
      setPets((prev) => prev.filter((pet) => pet._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete pet");
    }
  };

  const contactOwner = (phone) => {
    const digits = String(phone || "").replace(/\D/g, "");
    if (digits.length >= 10) {
      const link = `https://wa.me/${digits}`;
      window.open(link, "_blank");
    } else {
      if (phone) window.open(`tel:${phone}`, "_self");
    }
  };

  return (
    <div className="breeding-container">
      <div className="breed-hero">
        <div className="breed-hero-content">
          <h1 className="breeding-title">Breeding Center</h1>
          <p className="breeding-subtitle">Verified, ethical and healthy matches for your pets</p>
          <div className="breed-cta-row">
            <Link to="/breed-upload">
              <button className="upload-btn">Upload Your Pet</button>
            </Link>
            <div className="breed-count">{pets.length} available</div>
          </div>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="breeding-grid">
        {pets.length === 0 && !error && <p>No pets available</p>}

        {pets.map((pet) => (
          <div className="pet-card" key={pet._id}>
            {pet.imageUrl && (
              <div className="pet-image-wrapper">
                <img src={pet.imageUrl} alt={pet.name} />
              </div>
            )}
            <div className="pet-body">
              <div className="pet-header">
                <h3 className="pet-name">{pet.name}</h3>
                <span className="pet-type-badge">{pet.type}</span>
              </div>
              <div className="pet-meta">
                <span className="pet-breed">{pet.breed}</span>
                <span className="dot">•</span>
                <span className="pet-age">{pet.age} years</span>
              </div>
              <div className="pet-contact">
                <span className="phone">{pet.phone}</span>
                <div className="card-actions">
                  <button className="contact-btn" onClick={() => contactOwner(pet.phone)}>Contact</button>
                  <button className="delete-btn" onClick={() => deletePet(pet._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
