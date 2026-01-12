import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BreedUpload.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const getBreeds = () => {
    if (formData.type === "dog") return dogBreeds;
    if (formData.type === "cow") return cowBreeds;
    if (formData.type === "cat") return catBreeds;
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/pets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/breeding");
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="breed-upload-container">
      <h2>Upload Pet</h2>

      {error && <p className="breed-upload-error">{error}</p>}

      <form className="breed-upload-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Pet Name" onChange={handleChange} required />

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

        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImage} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
