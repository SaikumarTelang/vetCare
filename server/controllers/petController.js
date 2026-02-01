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

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

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
