import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BreedUpload.css";

/* ✅ HARD-CODE API BASE (SAFE FOR VERCEL) */
const API_URL = "https://vetcare-qzor.onrender.com";

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

const catBreeds = [
  "Persian",
  "Siamese",
  "Maine Coon",
  "Bengal",
  "British Shorthair",
  "Ragdoll",
];

export default function BreedUpload() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    phone: "",
    email: "",
    image: null,
  });

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const getBreeds = () => {
    if (formData.type === "dog") return dogBreeds;
    if (formData.type === "cow") return cowBreeds;
    if (formData.type === "cat") return catBreeds;
    return [];
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    /* 1️⃣ Create / save BREED */
    const breedData = new FormData();
    breedData.append("name", formData.breed);
    breedData.append("animalType", formData.animalType);
    breedData.append("image", formData.image);

    await axios.post(`${API_URL}/api/breeds`, breedData);

    /* 2️⃣ Create PET */
    const petData = new FormData();
    petData.append("name", formData.name);
    petData.append("type", formData.type);
    petData.append("breed", formData.breed);
    petData.append("age", formData.age);
    petData.append("phone", formData.phone);
    petData.append("email", formData.email);
    petData.append("image", formData.image);

    await axios.post(`${API_URL}/api/pets`, petData);

    navigate("/breeding");
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || "Upload failed");
  }
};


  /* ================= UI ================= */
  return (
    <div className="breed-upload-container">
      <h2>Upload Pet</h2>

      {error && <p className="breed-upload-error">{error}</p>}

      <form className="breed-upload-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Pet Name"
          onChange={handleChange}
          required
        />

        <select name="type" onChange={handleChange} required>
          <option value="">Select Animal</option>
          <option value="dog">Dog</option>
          <option value="cow">Cow</option>
          <option value="cat">Cat</option>
        </select>

        <select name="breed" onChange={handleChange} required>
          <option value="">Select Breed</option>
          {getBreeds().map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
