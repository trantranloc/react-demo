import axios from "axios";

// Tạo instance API
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor tự động gắn token vào request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
