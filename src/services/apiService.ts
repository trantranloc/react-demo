import axios from "axios";

// Tạo instance API
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
