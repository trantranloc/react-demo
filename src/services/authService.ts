import api from "./apiService";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });

  const token = response.data.result.token;
  localStorage.setItem("authToken", token);

  console.log("Token received:", token);
  return response.data.result;
};
