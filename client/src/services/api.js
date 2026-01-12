import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const createAppointment = (data) => API.post("/appointments", data);
export const getAppointments = () => API.get("/appointments");
