import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
    const adminRole = sessionStorage.getItem('adminRole');
    

    return adminRole === "admin" ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default ProtectedRoutes;
