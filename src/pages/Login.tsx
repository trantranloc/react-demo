import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen  from-blue-400 ">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
                <h1 className="mb-6 text-3xl font-extrabold text-center text-gray-800">
                    Welcome Back
                </h1>
                <p className="mb-4 text-center text-gray-600">
                    Please login to your account
                </p>
                <form className="space-y-6">
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-700"
                            htmlFor="username"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            aria-label="Username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-700"
                            htmlFor="password"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            aria-label="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        aria-label="Sign up"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;