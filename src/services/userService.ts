import api from "./apiService";
export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  active: boolean;
  password: string;
  phone: string;
  address: string;
  roles: Role[];
}

export const fetchAllUsers = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token found");
  }
  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data.result;
  } catch (error: any) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

export const createUser = async (userData: any) => {
  try {
    console.log("Creating user with data:", userData);
    const token = localStorage.getItem("authToken");
    const response = await api.post("/users", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};
export const deleteUser = async (id: string) => {
  try {
    console.log("Deleting user with ID:", id);
    const token = localStorage.getItem("authToken");
    await api.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
