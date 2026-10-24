import axios from "axios";

// Keep the documented local fallback so the app can still build and run when
// NEXT_PUBLIC_API_URL is not present in the environment.
const baseURL = (
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8080"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Access Token in memory
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

// Attach token to every request when a valid in-memory token is available
api.interceptors.request.use((config) => {
  if (typeof accessToken === "string" && accessToken.length > 0) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


export default api;
