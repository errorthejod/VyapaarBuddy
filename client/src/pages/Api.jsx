import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: baseURL,
});

// Request Interceptor: Add JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor: Handle token expiry (401)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error("Session expired. Please log in again.");

      // Clear token and user data
      localStorage.removeItem("token");

      // Optional: also clear user context if used
      // dispatch({ type: "LOGOUT" });

      // Redirect to login
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }

    return Promise.reject(error);
  },
);

export default API;
