import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explorer } from './pages/Explorer';
import { TeacherPanel } from './pages/TeacherPanel';
import theme from './theme';
import { Path } from './other/Paths';
import { RequireAuthRoute } from './components/other/RequireAuthRoute';
import { UnauthorizedHandler } from './components/other/UnauthorizedHandler';

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
                    <Explorer />
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
            <Route
              path={Path.EXPLORER}
              element={
                <RequireAuthRoute>
                  <Explorer />
                </RequireAuthRoute>
              }
            />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.REGISTER} element={<Register />} />
            <Route path='*' element={<Navigate to={Path.EXPLORER} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
