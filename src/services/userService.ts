import api from "./apiService";
export interface Role {
  id: string;
  name: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  address: Address[];
  roles: Role[];
}

export const fetchAllUsers = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token found");
  }
  try {
    const response = await api.get("/users");
    return response.data.result;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
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
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};
