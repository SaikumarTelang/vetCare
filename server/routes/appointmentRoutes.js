const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  deleteAppointment,
  confirmAppointment
} = require("../controllers/appointmentController");

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:id/confirm", confirmAppointment);
router.delete("/:id", deleteAppointment); 


module.exports = router;
