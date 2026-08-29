import axios from "axios";

/**
 * Single Axios instance used by every service.
 * Base URL is read from Vite env: VITE_API_BASE_URL=http://localhost:3001
 * The .env.development file (copied from .env.development.example) sets this.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
