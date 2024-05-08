import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { authInfo } = useSelector((state) => state.auth);
  console.log(authInfo);
  return authInfo.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
