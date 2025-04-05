import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ListUser from '../pages/user/ListUser';
import UserDetail from '../pages/user/UserDetail';


const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Route cho đăng nhập và đăng ký */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Route cho danh sách người dùng và chi tiết người dùng */}
            <Route path="/users" element={<ListUser />} />
            <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
    );
};

export default AppRouter;
