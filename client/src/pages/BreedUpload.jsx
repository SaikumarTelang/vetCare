import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BreedUpload.css";

/*API KEY*/
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
  const [previewUrl, setPreviewUrl] = useState("");

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
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) setPreviewUrl(URL.createObjectURL(file));
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
    /*save BREED */
    const breedData = new FormData();
    breedData.append("name", formData.breed);
    breedData.append("animalType", formData.type);
    breedData.append("image", formData.image);

    await axios.post(`${API_URL}/api/breeds`, breedData);

    /* Create PET */
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
      <p className="breed-upload-subtitle">Add your pet to the verified breeding network</p>

      {error && <p className="breed-upload-error">{error}</p>}

      <form className="breed-upload-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Pet Name</label>
            <input name="name" placeholder="e.g., Bruno" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Animal</label>
            <div className="type-toggle">
              {["dog", "cow", "cat"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`toggle-btn ${formData.type === t ? "active" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, type: t, breed: "" }))}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Breed</label>
            <select name="breed" onChange={handleChange} required disabled={!formData.type}>
              <option value="">Select Breed</option>
              {getBreeds().map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" placeholder="Age in years" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email (optional)" onChange={handleChange} />
          </div>
          <div className="form-group full">
            <label>Photo</label>
            <input type="file" accept="image/*" onChange={handleImage} required />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="submit-btn">Upload Pet</button>
      </form>
    </div>
  );
}
