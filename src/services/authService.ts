import api from "./apiService";

export const login = async (name: string, password: string) => {
  try {
    const response = await api.post("/login", { name, password });

    const token = response.data.token;
    localStorage.setItem("authToken", token);

    console.log("Token received:", token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
