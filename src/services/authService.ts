import api from "./apiService";

export const login = async (email: string, password: string) => {
  console.log("Sending login request with:", { email, password });
  try {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data.result.token;
    localStorage.setItem("authToken", token);

    console.log("Token received:", token);
    return response.data.result;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error(
        error.response.data.message || "Invalid Email or Password"
      );
    } else {
      throw new Error("Something went wrong, please try again!");
    }
  }
};
export const register = async (username:string, email: string, password: string) => {
  console.log("Sending login request with:", { username,email, password });
  try {
    const response = await api.post("/auth/register", {username, email, password });
    return response.data.result;
  } catch (error: any) {
   
      throw new Error(
        error.response.data.message || "Invalid Email or Password"
      );
   
  }
};
export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};
