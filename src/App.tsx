import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explorer } from './pages/Explorer';
import theme from './theme';
import { Path } from './other/Paths';
import { RequireAuthRoute } from './components/other/RequireAuthRoute';
import { UnauthorizedHandler } from './components/other/UnauthorizedHandler';
import { Calendar } from './pages/Calendar';
import { Settings } from './pages/Settings';
import { AnimatedTransition } from './components/other/AnimatedTransition';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router basename='/'>
          <UnauthorizedHandler />
          <Routes>
            <Route element={<AnimatedTransition />}>
              <Route element={<RequireAuthRoute />}>
                <Route path={Path.EXPLORER} element={<Explorer />} />
                <Route path={Path.CALENDAR + '/:yearCourseId'} element={<Calendar />} />
                <Route path={Path.SETTINGS + '/:yearCourseId'} element={<Settings />} />
                <Route path='*' element={<Navigate to={Path.EXPLORER} />} />
              </Route>

              <Route path={Path.LOGIN} element={<Login />} />
              <Route path={Path.REGISTER} element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
