const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* ========= MIDDLEWARE ========= */
app.use(cors({
  origin: [
    // "http://localhost:5000",
    "https://vet-care-seven-git-main-sai-kumars-projects-175175a8.vercel.app/",
    "https://vet-care-seven-luc66br5p-sai-kumars-projects-175175a8.vercel.app/",
    "https://vet-care-seven.vercel.app/"
  ],
  credentials: true
}));

app.use(express.json());

/* ========= DATABASE ========= */
connectDB();

/* ========= ROUTES ========= */
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/breeds", require("./routes/breedRoutes"));

/* ========= TEST ========= */
app.get("/", (req, res) => {
  res.send("VetCare API running 🚀");
});

module.exports = app;   
