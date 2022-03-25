import { ScaleFade } from '@chakra-ui/react';
import { Outlet, useLocation, useRoutes } from 'react-router-dom';

export const AnimatedTransition = () => {
  const location = useLocation();

  return (
    <ScaleFade initialScale={0.97} in={true} key={location.key}>
      <Outlet />
    </ScaleFade>
  );
};
