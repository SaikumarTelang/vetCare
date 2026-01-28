const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
  petName: String,
  breed: String,
  age: Number,
  medicalCondition: String,
  phone: String,
  email: String,
  image: String, 
  verified: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Breed", breedSchema);
