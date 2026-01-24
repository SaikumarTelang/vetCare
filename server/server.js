const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Appointment = require("./models/Appointment");
const connectDB = require("./config/db");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://vet-care-seven.vercel.app/"
  ],
  credentials: true
}));

app.use(express.json());

/* ================= DB ================= */
connectDB();

/* ================= ROUTES ================= */
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/breeds", require("./routes/breedRoutes"));
app.use("/uploads", express.static("uploads"));

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("VetCare API is running 🚀");
});

/* ================= AUTO DELETE ================= */
setInterval(async () => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const result = await Appointment.deleteMany({
      createdAt: { $lt: fiveDaysAgo },
    });

    console.log(`Auto-deleted ${result.deletedCount} old appointments`);
  } catch (error) {
    console.error("Auto delete failed:", error);
  }
}, 24 * 60 * 60 * 1000);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
