import { get } from "./apiService";

export const fetchAllUsers = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token found");
  }

  try {
    const response = await get("/users");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);

    if (error.response && error.response.status === 401) {
      alert("Token is invalid or expired. Please log in again.");
      // You might want to redirect to login page here
    }

    throw new Error("Failed to fetch users");
  }
};
