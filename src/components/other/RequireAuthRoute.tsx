import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Path } from '../../other/Paths';

export const RequireAuthRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.isLoggedIn ? <Outlet /> : <Navigate to={Path.LOGIN} state={{ from: location }} replace />;
};
