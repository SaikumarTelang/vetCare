const Pet = require("../models/Pet");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/* helper */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vetcare_pets" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* ================= ADD PET ================= */
exports.addPet = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const pet = await Pet.create({
      name: req.body.name,
      type: req.body.type,
      breed: req.body.breed,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      imageUrl,
    });

    res.status(201).json(pet);
  } catch (error) {
    console.error("PET UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET PETS ================= */
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE PET ================= */
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
