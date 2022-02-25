import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useStore from '../../../zustand/store';

export const RequireAuthRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
