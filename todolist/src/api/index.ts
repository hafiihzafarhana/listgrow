// src/api.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${
    import.meta.env.VITE_APP_ENV !== "development"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:4002"
  }/api/v1`, // Basis URL untuk API
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage atau store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
