const Appointment = require("../models/Appointment");

/* CREATE APPOINTMENT */
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    const doctorPhone = process.env.DOCTOR_PHONE;
    const customerPhone = req.body.phone.replace("+", "");

    const doctorMessage = `
New Appointment 🐾
Name: ${req.body.name}
Pet: ${req.body.animalType}
Service: ${req.body.serviceType}
Date & Time: ${req.body.dateTime}
Customer Phone: ${req.body.phone}
`;

    const customerMessage = `
Appointment Confirmed ✅
Hello ${req.body.name},
Your appointment for ${req.body.animalType} (${req.body.serviceType})
is confirmed on ${req.body.dateTime}.

Thank you for choosing VetCare 🐶🐱
`;

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
      doctorWhatsAppLink: `https://wa.me/${doctorPhone}?text=${encodeURIComponent(doctorMessage)}`,
      customerWhatsAppLink: `https://wa.me/${customerPhone}?text=${encodeURIComponent(customerMessage)}`
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL APPOINTMENTS */
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*  DELETE APPOINTMENT */
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
