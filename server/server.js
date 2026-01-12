const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const Appointment = require("./models/Appointment");


const connectDB = require("./config/db");

//auto delete apointment
setInterval(async () => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const result = await Appointment.deleteMany({
      createdAt: { $lt: fiveDaysAgo }
    });

    console.log(`Auto-deleted ${result.deletedCount} old appointments`);
  } catch (error) {
    console.error("Auto delete failed:", error);
  }
}, 24 * 60 * 60 * 1000);

const app = express();

//middleware
app.use(cors());
app.use(express.json());

connectDB();


//routes
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/breeds", require("./routes/breedRoutes"));
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("VetCare API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



