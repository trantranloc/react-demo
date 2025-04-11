import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById, User } from '../../services/userService';

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                if (id) {
                    const res = await fetchUserById(id);
                    setUser(res.result); // lấy đúng result
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();
    }, [id]);

    return (
        <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Detail</h1>

            <div className="space-y-4">
                <div className="flex items-center">
                    <span className="w-32 font-medium text-gray-700">Username:</span>
                    <span className="text-gray-800">{user?.lastName}</span>
                </div>
                <div className="flex items-center">
                    <span className="w-32 font-medium text-gray-700">Full Name:</span>
                    <span className="text-gray-800">{user?.firstName}</span>
                </div>
                <div className="flex items-center">
                    <span className="w-32 font-medium text-gray-700">Email:</span>
                    <span className="text-gray-800">{user?.email}</span>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Edit User
                </button>
                <button
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default UserDetail;
