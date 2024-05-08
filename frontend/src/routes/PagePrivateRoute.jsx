import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PagePrivateRoute = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const creator = authInfo?.creator;
  return creator ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PagePrivateRoute;
