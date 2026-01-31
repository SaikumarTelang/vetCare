import React, { useEffect, useState } from "react";
import "./AppointmentsList.css";
const API_URL = process.env.REACT_APP_API_URL;

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await fetch(`${API_URL}/api/appointments`);
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    await fetch(`${API_URL}/api/appointments/${id}`, {
      method: "DELETE",
    });

    fetchAppointments(); // refresh list
  };

  return (
    <div className="appointments-container">
      <h2>Today's & Previous Appointments</h2>

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
