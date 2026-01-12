const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Dog, Cat
  breed: { type: String, required: true },
  age: { type: Number, required: true },

  healthStatus: {
    type: String,
    enum: ["Healthy", "Under Treatment"],
    default: "Healthy"
  },

  isVerified: {
    type: Boolean,
    default: true // doctor verified
  },

  imageUrl: {
    type: String
  },

  ownerName: String,
  phone: String,
  email: String
});

module.exports = mongoose.model("Pet", petSchema);
