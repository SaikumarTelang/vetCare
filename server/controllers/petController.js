const Pet = require("../models/Pet");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/* helper function */
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

    // If image is uploaded
    if (req.file) {
      // Convert buffer → base64
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: "vetcare_pets",
      });

      imageUrl = uploadResult.secure_url;
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    // Save pet data
    const pet = await Pet.create({
      ...req.body,
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