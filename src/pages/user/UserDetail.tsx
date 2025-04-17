import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById, User } from '../../services/userService';

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
         const fetchUser = async () => {
            try {
                if (id) {
                    const data = await fetchUserById(id);
                    setUser(data);
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex items-center space-x-2">
                    <svg
                        className="animate-spin h-5 w-5 text-indigo-600"
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
                    <p className="text-gray-600 text-lg font-medium">Loading user information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                    User Profile
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-600 font-semibold w-24">UserName</span>
                            <p className="text-gray-900 font-medium">{user.username}</p>
                        </div>
                       
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-600 font-semibold w-24">Email</span>
                            <p className="text-gray-900 font-medium truncate">{user.email}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-600 font-semibold w-24">Phone</span>
                            <p className="text-gray-900 font-medium">{user.phone}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-600 font-semibold w-24">Address</span>
                            <p className="text-gray-900 font-medium">{user.address}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-600 font-semibold w-24">Status</span>
                            <p
                                className={`font-semibold ${user.active ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {user.active ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-indigo-600 mb-3">Roles</h2>
                    <div className="flex flex-wrap gap-2">
                        {user.roles.map((role) => (
                            <span
                                key={role.id}
                                className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full transition-colors hover:bg-indigo-200"
                            >
                                {role.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;