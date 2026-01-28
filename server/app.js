const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* MIDDLEWARE */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

/* DB */
connectDB();

/* ROUTES */
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/breeds", require("./routes/breedRoutes"));

/* TEST */
app.get("/", (req, res) => {
  res.send("VetCare API running 🚀");
});

module.exports = app;
