const Breed = require("../models/Breed");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vetcare_breeds" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

exports.addBreed = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const breed = await Breed.create({
      name: req.body.name,
      animalType: req.body.animalType,
      imageUrl,
    });

    res.status(201).json(breed);
  } catch (error) {
    console.error("BREED UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getBreeds = async (req, res) => {
  const breeds = await Breed.find();
  res.json(breeds);
};

exports.deleteBreed = async (req, res) => {
  await Breed.findByIdAndDelete(req.params.id);
  res.json({ message: "Breed deleted" });
};
