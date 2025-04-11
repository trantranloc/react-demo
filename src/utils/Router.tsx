import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ListUser from '../pages/user/ListUser';
import UserDetail from '../pages/user/UserDetail';
import UpdateUser from '../pages/user/UpdateUser';
import AddUser from '../pages/user/AddUser';


const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Route cho đăng nhập và đăng ký */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Route cho danh sách người dùng và chi tiết người dùng */}
            <Route path="/users" element={<ListUser />} />
            <Route path="/user" element={<ListUser />} />
            <Route path="/user/:userId" element={<UserDetail />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<UpdateUser />} />
        </Routes>
    );
};

export default AppRouter;
