import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TeacherPanel } from './pages/AdminPanel';
import theme from './theme';
import { RequireAuthRoute } from './components/other/other/RequireAuthRoute';
import { UnauthorizedHandler } from './components/other/other/UnauthorizedHandler';
import { Path } from './other/Paths';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router basename='/'>
          <UnauthorizedHandler />
          <Routes>
            <Route path={Path.DASHBOARD}>
              <Route
                path=''
                element={
                  <RequireAuthRoute>
                    <TeacherPanel />
                  </RequireAuthRoute>
                }
              />
              <Route
                path=':yearCourseId'
                element={
                  <RequireAuthRoute>
                    <TeacherPanel />
                  </RequireAuthRoute>
                }
              />
            </Route>
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.REGISTER} element={<Register />} />
            <Route path='*' element={<Navigate to={Path.DASHBOARD} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
