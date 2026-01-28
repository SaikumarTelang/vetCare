const Pet = require("../models/Pet");

/* ================= ADD PET ================= */
exports.addPet = async (req, res) => {
  try {
    const pet = await Pet.create({
      ...req.body,
      imageUrl: req.file ? req.file.path : "",
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
