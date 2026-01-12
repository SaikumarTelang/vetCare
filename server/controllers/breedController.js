const Breed = require("../models/Breed");

// Upload pet for breeding
exports.createBreed = async (req, res) => {
  try {
    const breed = await Breed.create(req.body);
    res.status(201).json(breed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all verified pets
exports.getBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find({ verified: true });
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
