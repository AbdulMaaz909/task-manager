import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const response = error?.response;
      const message = response?.data?.message || "";

      if (response && response.status === 401) {
        const lower = message.toLowerCase();
        const invalidToken =
          lower.includes("invalid") ||
          lower.includes("expired") ||
          lower.includes("token");

        if (invalidToken) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
    } catch (e) {
      console.error("Axios interceptor error:", e);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
