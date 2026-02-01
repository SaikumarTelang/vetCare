import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://vetcare-qzor.onrender.com",
  timeout: 30000 
});

export const getPets = () =>
  API.get("/api/pets");

export const getBreeds = () =>
  API.get("/api/breeds");

export const getAppointments = () =>
  API.get("/api/appointments");

export const createAppointment = (data) =>
  API.post("/api/appointments", data);

export default API;