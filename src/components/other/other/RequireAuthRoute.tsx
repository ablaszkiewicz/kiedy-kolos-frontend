import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Path } from '../../../other/Paths';

export const RequireAuthRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to={Path.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};
