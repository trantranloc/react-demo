import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userService';

interface UserFormData {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Kiểm tra dữ liệu trước khi gửi
    if (!user.username || !user.email || !user.password) {
      setError('Username, email, and password are required');
      setLoading(false);
      return;
    }

    try {
      const payload: UserFormData = {
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
      };

      console.log('Submitting user data:', payload);
      await createUser(payload);
      navigate('/user');
    } catch (error: any) {
      console.error('Error creating user:', error);
      const errorMessage = error.message || error.response?.data?.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="p-2 border rounded-lg"
            disabled={loading}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;