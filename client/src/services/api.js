import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const createAppointment = (data) =>
  API.post("/appointments", data);

export const getAppointments = () =>
  API.get("/appointments");

export const getPets = () =>
  API.get("/pets");

export const getBreeds = () =>
  API.get("/breeds");
