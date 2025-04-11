import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers, User } from "../../services/userService";

const ListUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("authToken");
            console.log("Token:", token);

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

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">User List</h2>
                <Link
                    to="/users/add"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                    Add User
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                #
                            </th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Username
                            </th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">{index + 1}</td>
                                <td className="py-4 px-6">{user.firstName}</td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/users/edit/${user.id}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition duration-300"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListUser;
