import { useEffect, useState } from "react";
import "./AppointmentsList.css";
import API, { getAppointments } from "../services/api";

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

  return (
    <div className="appointments-container">
      <h2>Today's & Previous Appointments</h2>

      {error && <p className="error-text">{error}</p>}

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
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
