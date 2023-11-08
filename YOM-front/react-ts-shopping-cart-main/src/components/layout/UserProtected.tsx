import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const UserProtected: React.FC = () => {
    const userRole = localStorage.getItem('userRole');
    let auth = { role: userRole };

    return auth.role === "user" ? <Outlet /> : <Navigate to="/login" />;
}

export default UserProtected;
