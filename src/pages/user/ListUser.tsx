import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, fetchAllUsers, User } from '../../services/userService';
import { logout } from '../../services/authService';

const ListUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Move fetchUsers outside
    const fetchUsers = async () => {
        try {
            const data = await fetchAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogout = () => {
        logout();
        setLoading(true);
    };

    const handleDelete = async (id: string) => {
        try {
            console.log(`Deleting user with ID: ${id}`);
            await deleteUser(id);
            console.log("User deleted successfully!");

            fetchUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex items-center space-x-3">
                    <svg
                        className="animate-spin h-8 w-8 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    <p className="text-gray-600 text-lg font-medium">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                        User Management
                    </h2>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <Link
                            to="/user/add"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                ></path>
                            </svg>
                            Add User
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                ></path>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                                        <td className="py-4 px-6 text-gray-900 font-medium">
                                            {user.username}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700 truncate max-w-xs">
                                            {user.email}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">{user.address}</td>
                                        <td className="py-4 px-6 text-gray-700">{user.phone}</td>
                                        <td className="py-4 px-6 text-gray-700">{user.roles.map((role) => (
                                            <span
                                                key={role.id}
                                                className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full transition-colors hover:bg-indigo-200"
                                            >
                                                {role.name}
                                            </span>
                                        ))}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-3">
                                                <Link
                                                    to={`/user/${user.id}`}
                                                    className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors duration-200"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/user/edit/${user.id}`}
                                                    className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 font-medium rounded-md hover:bg-yellow-200 transition-colors duration-200"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 font-medium rounded-md hover:bg-red-200 transition-colors duration-200"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-8 text-gray-500 text-lg"
                                        >
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUser;