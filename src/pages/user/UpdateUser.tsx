import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../../services/userService";

interface UserFormData {
  id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
}

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    id: id || "",
    username: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) return;
        const userData = await fetchUserById(id);
        setFormData({
          id,
          username: userData.username,
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || ""
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data");
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!id) return;
      await updateUser(id, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });
      navigate("/user");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="p-8">Loading user data...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update User</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Username</label>
                  <input
                      
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/user")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
