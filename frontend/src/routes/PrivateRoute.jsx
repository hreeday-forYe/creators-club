import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { loading, authInfo } = useSelector((state) => state.auth);

  if (loading) {
    // If loading, return null or a loading indicator
    return null; // You can replace this with a loading indicator if needed
  }

  // If not loading, check authentication status
  if (!authInfo || authInfo.user.role !== 'user') {
    // If not authenticated as a user, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated as a user, render the child components
  return <Outlet />;
};

export default PrivateRoute;
