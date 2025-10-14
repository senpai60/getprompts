import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI, // uses the VITE_ env variable
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
