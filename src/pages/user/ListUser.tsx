import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../../services/userService";

interface Role {
    id: string;
    role: string;
}

interface User {
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    roles: Role[];
}

const ListUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
              const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
            console.log(token)
            try {
                const data = await fetchAllUsers();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">User List</h1>

            {/* Thêm người dùng */}
            <div className="mb-6 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                    Add New User
                </button>
            </div>

            {/* Bảng danh sách người dùng */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-50 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-6 py-3 text-left text-sm font-medium">Username</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Roles</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.email || "N/A"}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.phone || "N/A"}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    {user.roles.map((r) => r.role).join(", ")}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/user/${user.id}`}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                        >
                                            View
                                        </Link>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200">
                                            Edit
                                        </button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListUser;
