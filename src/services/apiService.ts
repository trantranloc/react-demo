import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi trong request nếu có
    return Promise.reject(error);
  }
);

// Hàm gửi GET request
export const get = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// Hàm gửi POST request
export const post = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await api.post(url, data, config);
    return response;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

// Hàm gửi PUT request
export const put = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await api.put(url, data, config);
    return response;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
};

// Hàm gửi DELETE request
export const del = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(url, config);
    return response;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};

export default api;
