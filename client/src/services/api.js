import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export const createAppointment = (data) =>
  API.post("/api/appointments", data);

export const getAppointments = () =>
  API.get("/api/appointments");

export const getPets = () =>
  API.get("/api/pets");

export const getBreeds = () =>
  API.get("/api/breeds");
