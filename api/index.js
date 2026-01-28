const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../server/config/db");

const app = express();

/* ============ MIDDLEWARE ============ */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

/* ============ DB ============ */
connectDB();

/* ============ ROUTES ============ */
app.use("/api/appointments", require("../server/routes/appointmentRoutes"));
app.use("/api/pets", require("../server/routes/petRoutes"));
app.use("/api/breeds", require("../server/routes/breedRoutes"));

/* ============ TEST ROUTE ============ */
app.get("/", (req, res) => {
  res.send("VetCare API running on Vercel 🚀");
});

module.exports = app;
