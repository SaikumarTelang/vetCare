import { useEffect, useState } from "react";
import "./AppointmentsList.css";
import API, { getAppointments, confirmAppointment } from "../services/api";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  /* ================= FETCH APPOINTMENTS ================= */
  const fetchAppointments = async () => {
    try {
      const res = await getAppointments(); // ✅ Render URL internally
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await API.delete(`/api/appointments/${id}`); // ✅ NO localhost
      setAppointments((prev) =>
        prev.filter((a) => a._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete appointment");
    }
  };

  /* ================= CONFIRM ================= */
  const handleConfirm = async (id) => {
    try {
      const res = await confirmAppointment(id);
      const updated = res.data.appointment;
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, confirmed: updated.confirmed } : a))
      );
      const a = appointments.find((x) => x._id === id);
      const phone = a?.phone ? a.phone.replace(/\D/g, "") : "";
      const formattedDate = a?.dateTime ? new Date(a.dateTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";
      const msg = `Appointment Confirmed ✅
Hello ${a?.name},
Your appointment for ${a?.animalType} (${a?.serviceType})
is confirmed on ${formattedDate}.

Thank you for choosing VetCare 🐶🐱`;
      const link = res.data.customerWhatsAppLink || (phone ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : null);
      if (link) window.open(link, "_blank");
      alert("Appointment confirmed");
    } catch (err) {
      console.error(err);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, confirmed: true } : a))
      );
      const a = appointments.find((x) => x._id === id);
      const phone = a?.phone ? a.phone.replace(/\D/g, "") : "";
      const formattedDate = a?.dateTime ? new Date(a.dateTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";
      const msg = `Appointment Confirmed ✅
Hello ${a?.name},
Your appointment for ${a?.animalType} (${a?.serviceType})
is confirmed on ${formattedDate}.

Thank you for choosing VetCare 🐶🐱`;
      const link = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : null;
      if (link) window.open(link, "_blank");
      alert("Appointment confirmed");
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-card">
        <div className="appointments-header">
          <h2 className="appointments-title">Today's & Previous Appointments</h2>
          {error && <p className="error-text">{error}</p>}
        </div>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Animal</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && !error && (
              <tr>
                <td colSpan="7">No appointments found</td>
              </tr>
            )}
            {appointments.map((a, i) => {
              const dateObj = new Date(a.dateTime);
              return (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>{a.name}</td>
                  <td>{a.animalType}</td>
                  <td>{a.serviceType}</td>
                  <td>{dateObj.toLocaleDateString()}</td>
                  <td>{dateObj.toLocaleTimeString()}</td>
                  <td>
                    {a.confirmed ? (
                      <button className="delete-btn" onClick={() => handleDelete(a._id)}>
                        Delete
                      </button>
                    ) : (
                      <button className="confirm-btn" onClick={() => handleConfirm(a._id)}>
                        Confirm Appointment
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsList;
