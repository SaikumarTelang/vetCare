import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Breeding.css";

export default function Breeding() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  /* ================= FETCH PETS ================= */
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pets");
      setPets(res.data);
    } catch (err) {
      setError("Failed to load pets");
    }
  };

  /* ================= DELETE PET ================= */
  const deletePet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (error) {
      alert("Failed to delete pet");
    }
  };

  return (
    <div className="breeding-container">
      <h1 className="breeding-title">Breeding Center</h1>

      <Link to="/breed-upload">
        <button className="upload-btn" style={{ marginTop: "20px" }}>
          Upload Your Pet
        </button>
      </Link>

      {error && <p className="error-text">{error}</p>}

      <div className="breeding-grid">
        {pets.length === 0 && <p>No pets available</p>}

        {pets.map((pet) => (
          <div className="pet-card" key={pet._id}>
            
            {/* ✅ IMAGE (Cloudinary URL — NO localhost prefix) */}
            {pet.imageUrl && (
              <div className="pet-image-wrapper">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                />
              </div>
            )}

            <div className="pet-details">
              <p><b>Name:</b> {pet.name}</p>
              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Age:</b> {pet.age} years</p>
              <p><b>Type:</b> {pet.type}</p>
              <p><b>Contact:</b> {pet.phone}</p>
            </div>

            <button
              className="delete-btn"
              onClick={() => deletePet(pet._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
