import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
  const { authInfo } = useSelector((state) => state.auth);

  return authInfo?.user?.role === 'Admin' ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace />
  );
};

export default AdminPrivateRoute;
